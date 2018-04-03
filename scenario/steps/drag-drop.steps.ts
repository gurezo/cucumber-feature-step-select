import { browser } from 'protractor';
import { Drive } from '../page-objects/drag-drop.po';

export default function() {
  const drive = new Drive();

  this.Given(/^Drop test start$/, async function() {
    browser.ignoreSynchronization = true;
    await browser.get('http://sortable-table-sandbox.herokuapp.com/');
    await browser
      .manage()
      .window()
      .setSize(1600, 1000);
  });

  this.Then(/^Drive button click$/, async function() {
    browser.sleep(2000);
    await drive.getnextbutton().click();
  });

  this.Then(/^Drive login$/, async function() {
    await browser.sleep(5000);
    await drive.getpasswordform().click();
    await drive.getpasswordform().clear();
    await drive.getpasswordform().sendKeys('testtest');
    await drive.getloginbutton().click();
    await browser.sleep(2000);
  });

  this.Then(/^Drag and Drop$/, async function() {
    const drag = drive.getdragsource().get(2);
    const drop = drive.getdragsource().get(0);

    await browser.sleep(3000);
    console.log('START');
    browser
      .actions()
      .dragAndDrop(drag, drop)
      .perform();
    console.log('END');
    await browser.sleep(20000);
  });
}
