/* eslint no-var:0 */
var config = require('./webpack.config.client');
var lodash = require('lodash');
var devProps = require('./devProps');
var path = require('path');

module.exports = lodash.assign(lodash.clone(config), {
  devtool: 'inline-source-map',
  module: {
    loaders: (config.module.loaders || []).concat([{
      test: /\.jsx?$/,
      loader: 'babel?stage=0',
      exclude: /node_modules|webpack\/lib/,
    }]),
    // instrument only testing sources with Istanbul
    preLoaders: [{
      test: /\.js/,
      exclude: /^.*(main_client|main_server|containers|components).*\.jsx?/,
      include: path.resolve('app/'),
      loader: 'isparta-instrumenter-loader',
    }],
  },
  plugins: config.plugins,
  devServer: {
    publicPath: devProps.baseUrl + '/assets/',
    host: devProps.host,
    hot: true,
    historyApiFallback: true,
    contentBase: devProps.contentBase,
    port: devProps.webpackPort,
  },
});
