// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  SELENIUM_PROMISE_MANAGER: '0',
  allScriptsTimeout: 900000,
  specs: [
    './scenario/**/*.feature'
  ],
  suites: {
    smoke: './scenario/**/*.feature',
    e2e: './scenario/**/*.feature'
  },
  // capabilities: {
  //   'browserName': 'chrome'
  // },
  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'version': 'ANY',
    'chromeOptions': {
      args: ['--no-sandbox', '--test-type=browser'],
      prefs: {
        'download': {
          'prompt_for_download': false,
          'default_directory': './downloads/',
        }
      }
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    tags: [
      '@active',
      '@sample01',
      '@sample02',
      '@sample03',
      '~@disabled'
    ],
    require: 'scenario/**/{*.steps.ts,*.helper.ts}',
    format: 'pretty',
    strict: true
  },
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'scenario/tsconfig.e2e.json'
    })
  }
};
