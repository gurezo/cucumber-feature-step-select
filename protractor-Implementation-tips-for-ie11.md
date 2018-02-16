## Protractor Implementation tips for Internet Explorer 11

### ● tips outline
- IE11 click trouble: resolve
- IE11 path get trouble: resolve
- IE11 mouse over trouble: `un`resolve
- IE11 drag & drop trouble: `un`resolve

### ● IE11 click trouble: resolve
- **cause**
  ```
  Troubles when events are not triggered when e2e test is done with IE11
  ```
- **resoleve tips**
  - protractor.conf.js setteing
    ```
      // Protractor configuration file, see link for more information
      // https://github.com/angular/protractor/blob/master/lib/config.ts

      exports.config = {
          SELENIUM_PROMISE_MANAGER: '0',
          allScriptsTimeout: 900000,
            :
            :
          // very important setting ---------------
          // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          directConnect: false,
          capabilities: {
            'browserName': 'internet explorer',
            'platform': 'ANY',
            'version': '11',
            'nativeEvents': false,    <== for click event setting.
            'unexpectedAlertBehaviour': 'accept', <== for click event setting.
            'ignoreProtectedModeSettings': true, <== for click event setting.
            'disable-popup-blocking': true, <== for click event setting.
            'enablePersistentHover': true <== for click event setting.
          },
          localSeleniumStandaloneOpts: {
              jvmArgs: [
                '-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.8.0.exe'
              ]
          },
          // ⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡
          // very important setting ---------------
          baseUrl: 'http://localhost:4200/',
            :
            :
          beforeLaunch: function () {
          require('ts-node').register({
              project: 'scenario/tsconfig.e2e.json'
          })
          }
      };  
    ```
  - click.helper.ts create
    - following this sample code
    ```
    import { browser } from 'protractor';

    // branch proccessing for each browser
    export class ClickHelper {
      private browserName: string = null;
      private BROWSER_NAME_IE = 'internet explorer';
      private OS_NAME_WINDOWS = 'Windows';
      private osInfo = require('os');

      constructor() {
        // when instance created, get browserName.
        browser.getCapabilities().then((cap) => {
          this.browserName = cap.get('browserName');
        });
      }

      // for click events
      async click(targetSelector) {
        await browser.waitForAngular();
        if (this.browserName === this.BROWSER_NAME_IE) {
          // for internet explorer 11 code
          await browser.executeScript('arguments[0].click();', targetSelector.getWebElement());
        } else {
          // for chrome code
          await targetSelector.click();
        }
      }
    }
    ```
- **For your reference**
  - [IE11 click trouble #3](https://github.com/gurezo/cucumber-feature-step-select/issues/3)

----

### ● IE11 path get trouble: resolve
- **cause**
```
Troubles when you can not get the path when doing the e2e test with IE11
Accurately, you can get a pass but behave like a mystery when trying to edit

example code 

  child_process.exec(`@cd`, (error, stdout, stderr) => {
      if (error) {
      console.error('stderr', stderr);
      throw error;
    }
    pwd = stdout.replace(/\n$/, '');
    console.log(pwd);
  });
  await browser.waitForAngular();
    :

  console.log(‘pwd check’);
  console.log(`${pwd}`);
  const csvPath = `\\downloads\\sample\\sample.csv`;
  console.log(‘csvPath’);
  console.log(`${pwd} and ${csvPath}`);

  // Actual Behavior
  pwd check
  C:\work\sampleReop
  csvPath
  and \downloads\sample\sample.csv

  // mystery that `$ {pwd}` disappears for some reason

  // Expected Behavior
  C:\work\sampleReop
  C:\work\sampleReop and \downloads\sample\sample.csv
```
- **resoleve tips**
  - Window OS did'nt use to `pwd` from `child_process.exec`
  - Keep path information in json, get it with js
  - FilePathHelper.js, FilePath.json, FilePath.js for Windows create.
    - FilePathHelper.js
    ```
    import { browser } from 'protractor';

    // branch proccessing for each browser
    export class FilePathHelper {
      private browserName: string = null;
      private BROWSER_NAME_IE = 'internet explorer';
      private OS_NAME_WINDOWS = 'Windows';
      private osInfo = require('os');

      constructor() {
        // when instance created, get browserName.
        browser.getCapabilities().then((cap) => {
          this.browserName = cap.get('browserName');
        });
      }

      isIE(): boolean {
        if (this.browserName === this.BROWSER_NAME_IE) {
          return true;
        } else {
          return false;
        }
      }

      isWindows(): boolean {
        if (this.osInfo.type().toString().match(this.OS_NAME_WINDOWS)) {
          console.log('Windows !!!');
          return true;
        } else {
          console.log('Other OS !!!');
          return false;
        }
      }
    }
    ```
    - FilePath.js
    ```
    'use strict';

    const FILE_TYPE_MODEL_CSV = 'ModelCSV';
    const FILE_TYPE_MODEL_JSON = 'ModelJson';
    const FILE_TYPE_PREDICTION_CSV = 'PredictionCSV';

    const getInformation = function(target) {
      const json = require('./FilePath.json');
      
      console.log('target: ' + target);
      if (target === undefined) {
        return json[0];
      }
      for (let rec in json) {
        if (json[rec].FileType === target) {
          console.log('json[rec].FileType: ' + json[rec].FileType);
          return json[rec];
        }
      }
    };

    exports.FILE_TYPE_MODEL_CSV = FILE_TYPE_MODEL_CSV;
    exports.FILE_TYPE_MODEL_JSON = FILE_TYPE_MODEL_JSON;
    exports.FILE_TYPE_PREDICTION_CSV = FILE_TYPE_PREDICTION_CSV;
    exports.getInformation = getInformation;    
    ```
    - FilePath.json
    ```
    [
      {
        "FileType": "test1CSV",
        "FilePath": "C:\\work\\test1\\test1.csv"
      },
      {
        "FileType": "test2JSON",
        "FilePath": "C:\\work\\test2\\test2.json"
      }
    ]  
    ```
  - some use case
    - some steps.ts fule
    ```
    import { browser, element, by } from 'protractor';
    import * as chai from 'chai';
    import * as cuid from 'cuid';
    import * as child_process from 'child_process';

    // FilePath.json 読み込み用 js
    const fileInfo = require('../../FilePath.js');    

    this.Then(/^Some Scenario Chekc$/, async function () {
      await browser.sleep(3000);
      const fs = require('fs');
      const csv = require('csv');
      const path = require('path');
      let cmd = null;
      let pwd = null;
      if (pageOpeHelper.isWindows()) {
        cmd = `@cd`
      } else {
        cmd = `pwd`
      }

      child_process.exec(cmd, (error, stdout, stderr) => {
          if (error) {
          console.error('stderr', stderr);
          throw error;
        }
        pwd = stdout.replace(/\n$/, '');
        console.log(pwd);
      });
      await browser.waitForAngular();

      let FILE = '';
      let json = '';
      if (pageOpeHelper.isWindows()) {
        // Windows
        const csvInfo = fileInfo.getInformation(fileInfo.FILE_TYPE_MODEL_CSV);
        const jsonInfo = fileInfo.getInformation(fileInfo.FILE_TYPE_MODEL_JSON);
        FILE = path.join(csvInfo.FilePath);
        json = require(jsonInfo.FilePath);
      } else {
        // Other OS
        FILE = path.join(`${pwd}/downloads/test1/test1.csv`);
        json = require(`${pwd}/downloads/test2/test2.json`);
      }
      :
      :
      :
    });

    ```
- **For your reference**
  - [Template literals No support for IE11](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
  - [IE11 path get trouble #6](https://github.com/gurezo/cucumber-feature-step-select/issues/6)

----

### ● IE11 mouse over trouble: `un`resolve
- **cause**
  ```
  Trouble with mouse move not working when e2e test is done with IE11
  To be exact, the effect time of mouse over is much shorter than Chrome, IE 11
  ```
- **resoleve tips**
  ```
  At the moment, no solution has been found
  ```
- **For your reference**
  - [IE11 mouse move trouble #4](https://github.com/gurezo/cucumber-feature-step-select/issues/4)

----

### ● IE11 drag & drop trouble: `un`resolve
- **cause**
  ```
  Trouble with drag and drop not working when e2e test is done with IE11
  ```
- **resoleve tips**
  ```
  At the moment, no solution has been found
  ```
- **For your reference**
  - [IE11 drag & drop trouble #7](https://github.com/gurezo/cucumber-feature-step-select/issues/7)
