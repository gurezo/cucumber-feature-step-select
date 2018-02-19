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
  params: {
    timeouts: {
      default: 30 * 1000,
      overylayInvisibility: 10 * 1000,
      cleanupLong: 60 * 60 * 100
    },
    sleep: {
      component: 1000,
      modelDesignTask: 15 * 1000,
      predictionTask: 10 * 1000,
      tableImport: 3 * 1000
    }
  },
  directConnect: false,
  capabilities: {
    'browserName': 'internet explorer',
    'platform': 'ANY',
    'version': '11',
    'nativeEvents': false,
    'unexpectedAlertBehaviour': 'accept',
    'ignoreProtectedModeSettings': true,
    'disable-popup-blocking': true,
    'enablePersistentHover': true
  },
  localSeleniumStandaloneOpts: {
    jvmArgs: [
      '-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.9.0.exe'
    ]
  },
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    tags: [
      '@active',
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
