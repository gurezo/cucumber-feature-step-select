## Protractor Implementation tips for Internet Explorer 11

### ■ resolve issue

#### ● click issue
- **cause**
```
click event may not fire.
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

### ■ `un`resolved issue
#### ● mouse over issue
