import { browser } from 'protractor';
import * as chai from 'chai';

export default function () {
  this.Then(/^SampleScenario2$/, function (callback) {
    console.log('sample02');
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
};
