/* eslint no-var:0 */
var webpack = require('webpack');
var config = require('./webpack.config.client');
var lodash = require('lodash');
var devProps = require('./devProps');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');
var dirs = require('../bin/dirs');

module.exports = lodash.assign(lodash.clone(config), {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?' + devProps.baseUrl,
    'webpack/hot/only-dev-server',
  ].concat(config.entry),
  output: lodash.assign(lodash.clone(config.output), {
    publicPath: devProps.baseUrl + '/assets/',
    pathinfo: true,
    // crossOriginLoading is important since we are running
    // webpack-dev-server from a different port than Meteor
    crossOriginLoading: 'anonymous',
  }),
  module: {
    loaders: (config.module.loaders || []).concat([{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules|lib/,
      query: {
        stage: 0,
        cacheDirectory: true,
        plugins: [
          'react-transform',
        ],
        extra: {
          'react-transform': {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              // this is important for Webpack HMR:
              locals: ['module'],
            },
            {
              transform: 'react-transform-catch-errors',
              // the second import is the React component to render error
              // (it can be a local path too, like './src/ErrorReporter')
              imports: ['react', 'redbox-react'],
            }],
          },
        },
      },
    }]),
  },
  plugins: (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new RunInMeteorPlugin({
      mode: 'development',
      target: 'client',
      meteor: dirs.meteor,
      key: 'client',
    }),
  ]),
  devServer: {
    publicPath: devProps.baseUrl + '/assets/',
    host: devProps.host,
    hot: true,
    historyApiFallback: true,
    contentBase: devProps.contentBase,
    port: devProps.webpackPort,
    noInfo: true,
  },
});
