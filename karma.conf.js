/* eslint no-var:0 */
var webpackConfig = require('./webpack/webpack.config.client.test.js');

module.exports = function karmaConf(config) {
  var cfg = {
    reporters: ['mocha', 'coverage'],
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    files: ['./test/karma.bundle.js'],
    frameworks: ['mocha', 'sinon-chai'],
    plugins: [
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon-chai',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      './test/karma.bundle.js': [ 'webpack', 'sourcemap' ],
    },
    // use our own webpack config to mirror test setup
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        // With console colors
        colors: true,
        // add the hash of the compilation
        hash: false,
        // add webpack version information
        version: false,
        // add timing information
        timings: true,
        // add assets information
        assets: false,
        // add chunk information
        chunks: false,
        // add built modules information to chunk information
        chunkModules: false,
        // add built modules information
        modules: false,
        // add also information about cached (not built) modules
        cached: false,
        // add information about the reasons why modules are included
        reasons: false,
        // add the source code of modules
        source: true,
        // add details to errors (like resolving log)
        errorDetails: true,
        // add the origins of chunks and chunk merging info
        chunkOrigins: true,
        // Add messages from child loaders
        children: false,
      },
    },

    webpackServer: {
      noInfo: true,
      stats: {
        // With console colors
        colors: true,
        // add the hash of the compilation
        hash: false,
        // add webpack version information
        version: false,
        // add timing information
        timings: true,
        // add assets information
        assets: false,
        // add chunk information
        chunks: false,
        // add built modules information to chunk information
        chunkModules: false,
        // add built modules information
        modules: false,
        // add also information about cached (not built) modules
        cached: false,
        // add information about the reasons why modules are included
        reasons: false,
        // add the source code of modules
        source: true,
        // add details to errors (like resolving log)
        errorDetails: true,
        // add the origins of chunks and chunk merging info
        chunkOrigins: true,
        // Add messages from child loaders
        children: false,
      },
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.',
      file: 'lcov.info',
    },
  };

  if (process.env.TRAVIS) {
    cfg.browsers = ['Chrome_travis_ci'];
    cfg.singleRun = true;
  }

  config.set(cfg);
};
