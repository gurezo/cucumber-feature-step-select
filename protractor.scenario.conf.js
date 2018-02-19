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
  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'version': 'ANY' // ,
    // 'chromeOptions': {
    //   args: ['--no-sandbox', '--test-type=browser'],
    //   prefs: {
    //     'download': {
    //       'prompt_for_download': false,
    //       'directory_upgrade': true,
    //       'default_directory': process.cwd() + './downloads/'
    //     },
    //   },
    // },
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
  directConnect: true,
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
  // specs: [
  //   'scenario/specs/sample03.feature',
  //   'scenario/specs/sample01.feature',
  //   'scenario/specs/sample02.feature'
  // ],
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'scenario/tsconfig.e2e.json'
    })
  }
};
