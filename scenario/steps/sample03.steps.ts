import { browser } from 'protractor';
import * as chai from 'chai';

export default function () {
  this.Then(/^SampleScenario3$/, function (callback) {
    console.log('sample03');
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
};
