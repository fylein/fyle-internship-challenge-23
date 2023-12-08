module.exports = function(config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'], // Frameworks used for testing
      browsers: ['Chrome'], // Use Chrome for testing, add more browsers if needed
      files: [
        'src/**/*.spec.ts' // Path to your test files
      ],
      preprocessors: {
        'src/**/*.spec.ts': ['@angular-devkit/build-angular'] // Preprocess your test files
      },
      reporters: ['progress', 'kjhtml'], // Reporters for test results
      singleRun: false // Set to true for a single run of tests
    });
  };
   
