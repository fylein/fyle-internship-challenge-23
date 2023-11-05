// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// Importing the 'SpecReporter' and 'StacktraceOption' from the 'jasmine-spec-reporter' library.
const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * Configuration object for Protractor tests.
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000, // Maximum time to wait for scripts to complete.
  specs: [
    './src/**/*.e2e-spec.ts' // Test scripts to run using Protractor.
  ],
  capabilities: {
    browserName: 'chrome' // Browser to be used for testing, in this case, Google Chrome.
  },
  directConnect: true, // Use direct connection to the browser (without using Selenium Server).
  baseUrl: 'http://localhost:4200/', // Base URL for the application under test.
  framework: 'jasmine', // Testing framework to use (Jasmine in this case).
  jasmineNodeOpts: {
    showColors: true, // Display test results in color.
    defaultTimeoutInterval: 30000, // Default timeout for test cases.
    print: function() {} // Function for printing test results.
  },
  onPrepare() {
    // Register 'ts-node' to enable TypeScript support in Protractor.
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });

    // Add the 'SpecReporter' to Jasmine to display test results with stack traces.
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  }
};
