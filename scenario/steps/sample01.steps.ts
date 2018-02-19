import { browser, element, by } from 'protractor';
import * as chai from 'chai';
import { PageOperationHelper } from '../page-objects/page-operation-helper.po';
import { DispFramePage } from '../page-objects/disp-frame-component.po';

export default function () {
  const dispFrame = new DispFramePage();
  const pageOpeHelper = new PageOperationHelper();

  this.Then(/^SampleScenario1$/, function (callback) {
    console.log('sample01');
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.Then(/^Business Case Icon Click$/, async function () {
    await browser.waitForAngular();
    if (pageOpeHelper.isIE()) {
      // for IE11
      console.log('ie come');
      await browser.actions().
            mouseMove(dispFrame.getOverClassText()).
            perform().
            then(() => {
              // dispFrame.getClickClassText().click();
              pageOpeHelper.click(dispFrame.getClickClassText());
            });
    } else {
      browser.actions().mouseMove(dispFrame.getOverClassText()).perform();
      await pageOpeHelper.click(dispFrame.getClickClassText());
    }
  });
}

