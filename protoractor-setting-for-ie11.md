# Protoractor Setting for Internet Explorer 11

## Overview
this page explain to Protoractor setting for Internet Explorer 11.

## Outline
- Windows PC Setting
  - Java setting
  - Windows Registory setting
  - Internet Explorer 11 Browser setting
  - Internet Explorer Web Driver setting
  - Protoractor setting

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
    1. setting to System variable
        1. New button click.
        1. type to Variable name:  
          `JAVA_HOME`
        1. type to Variable value:  
          `C:\Program Files\Java\jdk1.8.0_161`
        1. OK button click.
    1. editing to System variable
        1. `path` row click.
        1. Edit button click.
        1. New button click.
        1. input to cursor prompt.  
          `C:\Program Files\Java\jdk1.8.0_161\bin`
        1. OK button click.
    1. OK button click.  
        Environment variable Window closed.
1. checking to the above settings
    1. start `command pronpt`
    1. excute commnd. (It is OK if it is as follows.)
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
1. Registory key added.
    1. Value name: `iexplorer.exe`
    1. Value data: `0`
1. End `regedit.exe`.
1. For your reference
    - [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
    - [Protractor test in IE](https://stackoverflow.com/questions/37456099/protractor-test-in-ie)

#### ■ Internet Explorer 11 Browser setting
1. Start `Internet Explorer 11` .
1. `tools` row click.
1. `Zoom` rate changed to `100%`
1. `tools` row click.
1. `internet options` row click.
1. In `General` tab
    - checkbox TurnOn
        - Delete browsing  history on exit
1. In `Security` tab 
    - Disable protected mode for all zones
        - Internet
        - Local internet
        - Trust sites
        - Restricted sites
1. In `Privacy` tab 
    - Accept All Cookie slider Lower to the bottom
    - TurnOff PopUp Blocker
1. In `Advanced` tab
     - checkbox TurnOff
        - Check for publiser's certificate revoctation
        - Check for Server certificate revoctation*
        - Check for Signature on downloaded programs
        - Warn about certificate address mismatch*
        - Warn if changing between secure and not secure mode 
        - Warn if POST submittal is redirected to a zone that does not permit posts 
     - checkbox TurnOn
        - Empty Temporary Internet files folder when browser is closed.
1. For your reference
    - [Protractor test in IE](https://stackoverflow.com/questions/37456099/protractor-test-in-ie)

#### ■ Internet Explorer Web Driver setting
1. Precondition
    - repository cloned to `C:\work`
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

#### ■ Protoractor setting
1. script added to package.json
    - exmaple
    ```
    "scenario": "ng e2e -c protractor.conf.js",
    "scenario:ie": "ng e2e -c protractor.ie.conf.js"
    ```
1. `protractor.ie.conf.js` created.
    - IEDriver just used an  `IEDriverServer3.8.0.exe` .
    - exmaple
    ```
    // Protractor configuration file, see link for more information
    // https://github.com/angular/protractor/blob/master/lib/config.ts

    exports.config = {
        SELENIUM_PROMISE_MANAGER: '0',
        allScriptsTimeout: 900000,
          :
          :
        // very important setting ---------------
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        directConnect: false,
        capabilities: {
          'browserName': 'internet explorer',
          'platform': 'ANY',
          'version': '11',
          'nativeEvents': false,    
          'unexpectedAlertBehaviour': 'accept',
          'ignoreProtectedModeSettings': true,
          'disable-popup-blocking': true,
          'enablePersistentHover': true
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
1. For your reference
    - [Setting Up the Selenium Server](https://github.com/angular/protractor/blob/master/docs/server-setup.md)
    - [Karma IE Testing of Polymer Elements with WebDriver](https://japhr.blogspot.jp/2014/12/karma-ie-testing-of-polymer-elements.html)

