import { browser } from 'protractor';

export default function () {
  this.Given(/^Application is started$/, async function () {
    await browser.get('http://localhost:49152/');
    await browser.manage().window().setSize(1600, 1000);
  });
}
