import { browser } from 'protractor';
import * as chai from 'chai';

export default function () {
  this.Then(/^sample01$/, async function () {
    console.log('test')
  });
};
