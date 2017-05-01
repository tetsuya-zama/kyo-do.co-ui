// Karma configuration
module.exports = function(config) {
  config.set({
    files: [
      {pattern: 'test/**/*.test.js', watched: true},
      {pattern: 'src/**/*.js', watched: true},
      {pattern: 'dist/img/*.png', served:true},
    ],

    proxies:{
      "/img/":"/base/dist/img/"
    },

    frameworks: [
        'mocha-debug','mocha'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.js': ['webpack'],
      'src/**/*.js' : ['webpack']
    },

    customContextFile: 'dist/index.karma.html',

    client:{
      clearContext:false
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
      stats: 'errors-only'
    }
  });
};
