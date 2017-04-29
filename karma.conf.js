// Karma configuration
module.exports = function(config) {
  config.set({
    // ... normal karma configuration
    files: [
      // all files ending in "_test"
      {pattern: 'test/**/*.test.js', watched: false},
      // each file acts as entry point for the webpack configuration
    ],

    frameworks: [
        'mocha-debug','mocha'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.js': ['webpack']
    },

    browsers: ['Chrome'],

    reporters: ['mocha'],

    webpack: {
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /\/node_modules\//,
            loader: 'babel-loader',
            query: {
              presets: ['airbnb']
            }
          }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  });
};
