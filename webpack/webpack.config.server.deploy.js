/* eslint no-var:0 */
var webpack = require('webpack');
var config = require('./webpack.config.server');
var lodash = require('lodash');
var dirs = require('../bin/dirs');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');

module.exports = lodash.assign(lodash.clone(config), {
  watch: true,
  plugins: (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new RunInMeteorPlugin({
      meteor: dirs.meteor,
      target: 'server',
      mode: 'production',
      key: 'server',
    }),
  ]).concat(process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  })] : []),
});
