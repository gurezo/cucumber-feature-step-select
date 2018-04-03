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

  mouseMove(targetSelector) {
    if (this.browserName === this.BROWSER_NAME_IE) {
      // for internet explorer 11 code
      // browser.executeScript('arguments[0].fireEvent("onmousemove");', targetSelector.getWebElement().perform());
    } else {
      // for chrome code
      targetSelector.perform();
    }
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
