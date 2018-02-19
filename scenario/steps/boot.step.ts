import { browser } from 'protractor';

export default function () {
  async function startApplication() {
    browser.driver.manage().window().setSize(1980, 1080);
    await browser.get(browser.baseUrl);
  }

  this.Given(/^Application is started $/, async function () {
    await startApplication();
  });
}
