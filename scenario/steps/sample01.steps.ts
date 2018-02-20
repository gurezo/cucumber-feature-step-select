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

  this.Then(/^Mouse Over Test$/, async function () {
    await browser.waitForAngular();
    if (pageOpeHelper.isIE()) {
      // for IE11
      console.log('ie come');
      // browser.executeScript('arguments[0].fireEvent("mouseenter");', dispFrame.getOverClassText());
      // browser.executeScript('arguments[0].mouseenter();', dispFrame.getOverClassText());
      // await pageOpeHelper.click(dispFrame.getClickClassText());
      // await browser.actions().
      //       mouseMove(dispFrame.getOverClassText()).
      //       perform().
      //       then(() => {
      //         // dispFrame.getClickClassText().click();
      //         pageOpeHelper.click(dispFrame.getClickClassText());
      //       });
      await browser.actions().
            mouseMove(dispFrame.getOverClassText()).
            perform();
      await pageOpeHelper.click(dispFrame.getClickClassText());
    } else {
      // for chrome
      console.log('chrome come');
      browser.actions().mouseMove(dispFrame.getOverClassText()).perform();
      await pageOpeHelper.click(dispFrame.getClickClassText());
      // await dispFrame.getClickClassText().click();
    }
    browser.sleep(3000);
  });
  this.Then(/^Display Click Test$/, async function () {
    await browser.waitForAngular();
    browser.sleep(3000);
    await pageOpeHelper.click(dispFrame.getSuccessClassText());
    browser.sleep(3000);
  });

}

