# Protractor Setting for Internet Explorer 11

## Overview
this page explain to Protractor setting for Internet Explorer 11.

## Outline
- Windows PC Setting
  - Java setting
  - Windows Registory setting
  - Internet Explorer 11 Browser setting
  - Internet Explorer Web Driver setting
  - Protractor setting

----

### Windows PC Setting

#### ■ Java setting
1. JDK Download
    - [Java SE Development Kit 8 Downloads](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    - i had just installed a `jdk-8u161-windows-x64.exe`
1. JDK install
1. setting for Windows Environment Variable
    1. control panel open.
    1. System and Security click.
    1. System click.
    1. Advanced system setting click.
    1. Environment variable click.
    1. setting to System variables frame
        1. click New button.
          1. type to Variable name:  
            `JAVA_HOME`
          1. type to Variable value:  
            `C:\Program Files\Java\jdk1.8.0_161`
          1. click OK button.
    1. editing to System variables frame
        1. `path` click.
          1. click Edit button.
          1. click New button.
          1. input to cursor prompt.  
            `C:\Program Files\Java\jdk1.8.0_161\bin`
          1. click OK button.
    1. click OK button.  
        Environment variable Window close.
1. checking to the above settings
    1. start `command prompt`
    1. excute command. (It is OK if it is as follows.)
    ```
    C:\Users\loginUser>javac -version
    javac 1.8.0_161
    ```
1. For your reference
    - [JDK Installation for Microsoft Windows](https://docs.oracle.com/javase/7/docs/webnotes/install/windows/jdk-installation-windows.htmlA)

#### ■ Windows Registory setting
1. Start `regedit.exe` .
1. Registory key search to following this.
    - For 32-bit Windows
      - `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE`
    - For 64-bit Windows
      - `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE`
1. add Registory key.
    1. Value name: `iexplorer.exe`
    1. Value data: `0`
1. End `regedit.exe`.
1. For your reference
    - [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
    - [Protractor test in IE](https://stackoverflow.com/questions/37456099/protractor-test-in-ie)

#### ■ Internet Explorer 11 Browser setting
1. Start `Internet Explorer 11`.
1. `tools` click.
1. `Zoom` rate changed to `100%`
1. `tools` click.
1. `internet options` click.
1. In `General` tab
    - checkbox turn `on`
        - Delete browsing  history on exit
1. In `Security` tab 
    - Disable protected mode for all zones
        - Internet
        - Local internet
        - Trust sites
        - Restricted sites
1. In `Privacy` tab 
    - checkbox turn `off` PopUp Blocker
1. In `Advanced` tab
     - checkbox turn `off`
        - Check for publiser's certificate revoctation
        - Check for Server certificate revoctation*
        - Check for Signature on downloaded programs
        - Warn about certificate address mismatch*
        - Warn if POST submittal is redirected to a zone that does not permit posts 
     - checkbox turn `on`
        - Empty Temporary Internet files folder when browser is closed.
1. For your reference
    - [Protractor test in IE](https://stackoverflow.com/questions/37456099/protractor-test-in-ie)

#### ■ Internet Explorer Web Driver setting
1. Precondition
    - repository already cloned to `C:\work`
1. move dirctory
    ```
    $ cd C:\work\<repository name>\node_modules/protractor/bin/
    ```
1. command excute. (IEDriver update)
    ```
    $ ./webdriver-manager update --ie
    ```
1. For your reference
    - [with protractor how to setup internet explorer configuration?](https://stackoverflow.com/questions/26395216/with-protractor-how-to-setup-internet-explorer-configuration)

#### ■ Protractor setting
1. script add to package.json
    - example
    ```
    "scenario": "ng e2e -c protractor.conf.js",
    "scenario:ie": "ng e2e -c protractor.ie.conf.js"
    ```
1. create `protractor.ie.conf.js`.
    - IEDriver just used an  `IEDriverServer3.9.0.exe`.
    - example
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
          'version': '11'
        },
        localSeleniumStandaloneOpts: {
            jvmArgs: [
              '-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.9.0.exe'
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
1. For your reference
    - [Setting Up the Selenium Server](https://github.com/angular/protractor/blob/master/docs/server-setup.md)
    - [Karma IE Testing of Polymer Elements with WebDriver](https://japhr.blogspot.jp/2014/12/karma-ie-testing-of-polymer-elements.html)

#### ■ Internet Explorer 11 Click test trouble shooting
##### If you encounter a problem of Internet Explorer 11 click test trouble, Please try the following
1. edit `protractor.ie.conf.js`.
    - example
    ```
    // Protractor configuration file, see link for more information
    // https://github.com/angular/protractor/blob/master/lib/config.ts

    exports.config = {
        SELENIUM_PROMISE_MANAGER: '0',
        allScriptsTimeout: 900000,
          :
          :
        directConnect: false,
        capabilities: {
          'browserName': 'internet explorer',
          'platform': 'ANY',
          'version': '11',
          // very important setting add parameter---------------
          // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          'nativeEvents': false,    
          'unexpectedAlertBehaviour': 'accept',
          'ignoreProtectedModeSettings': true,
          'disable-popup-blocking': true,
          'enablePersistentHover': true
          // ⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡⇡
          // very important setting add parameter---------------
        },
        localSeleniumStandaloneOpts: {
            jvmArgs: [
              '-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.9.0.exe'
            ]
        },
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
1. create `sample.js`.
    - example
    ```
    import { browser } from 'protractor';

    // branch proccessing for each browser
    export class PageOperationHelper {
      private browserNmae: string = null;
      private BROWSER_NAME_IE = 'internet explorer';

      constructor() {
        // when instance created, get browserName.
        browser.getCapabilities().then((cap) => {
          this.browserNmae = cap.get('browserName');
        });
      }

      // for click events
      async click(targetSelector) {
        await browser.waitForAngular();
        if (this.browserNmae === this.BROWSER_NAME_IE) {
          // for internet explorer 11 code
          await browser.executeScript('arguments[0].click();', targetSelector.getWebElement());
        } else {
          // for chrome code
          await targetSelector.click();
        }
      }
    }
    ```
1. For your reference
    - [IE11 click trouble #3](https://github.com/gurezo/cucumber-feature-step-select/issues/3#issuecomment-361819962)

