// Karma configuration
module.exports = function(config) {
  config.set({
    // ... normal karma configuration
    files: [
      // all files ending in "_test"
      {pattern: 'test/**/*.js', watched: false},
      // each file acts as entry point for the webpack configuration
    ],

    frameworks: [
        'mocha-debug','mocha'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.js': ['webpack']
    },

    reporters: ['mocha'],

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  });
};
