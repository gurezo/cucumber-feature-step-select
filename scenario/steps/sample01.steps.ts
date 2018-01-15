import { browser } from 'protractor';
import * as chai from 'chai';

export default function () {
  this.Then(/^sample(\d+)$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
};
