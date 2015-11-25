/* eslint no-var:0 */
var webpack = require('webpack');
var config = require('./webpack.config.client');
var lodash = require('lodash');
var dirs = require('../bin/dirs');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');

module.exports = lodash.assign(lodash.clone(config), {
  module: {
    loaders: (config.module.loaders || []).concat([{
      test: /\.jsx?$/,
      loader: 'babel?stage=0',
      exclude: /node_modules|webpack\/lib/,
    }]),
  },
  plugins: (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new RunInMeteorPlugin({
      meteor: dirs.meteor,
      target: 'client',
      mode: 'production',
      key: 'client',
    }),
  ]).concat(process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  })] : []),
});
