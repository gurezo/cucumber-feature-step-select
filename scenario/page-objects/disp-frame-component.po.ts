import { $, by, ExpectedConditions, browser, element } from 'protractor';

export class DispFramePage {

  getOverClassText() {
    return element(by.css('.overClass'));
  }
  getClickClassText() {
    return element(by.css('.clickClass'));
  }
  getSuccessClassText() {
    return element(by.css('.successClass'));
  }
}
