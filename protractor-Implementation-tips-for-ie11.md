## Protractor Implementation tips for Internet Explorer 11

### ■ resolve issue

#### ● click issue
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

#### ● click issue
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
  - Window OS not used `pwd` from `child_process.exec`
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
        "FileType": "test2CSV",
        "FilePath": "C:\\work\\test2\\test2.csv"
      }
    ]  
    ```

- **For your reference**
  - [Template literals No support for IE11](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
  - [IE11 path get trouble #6](https://github.com/gurezo/cucumber-feature-step-select/issues/6)


----


### ■ `un`resolved issue
#### ● mouse over issue
