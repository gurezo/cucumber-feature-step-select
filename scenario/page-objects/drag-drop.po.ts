import { by, element } from 'protractor';

export class Drive {
  getpasswordform() {
    return element(by.css('.whsOnd'));
  }

  getloginbutton() {
    return element(by.css('.RveJvd'));
  }

  getnextbutton() {
    return element.all(by.css('.maia-button')).first();
  }

  getlockup() {
    return element(by.css('.button-download'));
  }

  getdragsource() {
    return element.all(by.css('.item'));
  }
}
