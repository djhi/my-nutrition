/* eslint no-var:0 */
var config = require('./webpack.config.server');
var lodash = require('lodash');
var dirs = require('../bin/dirs');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');

module.exports = lodash.assign(lodash.clone(config), {
  devtool: 'source-map',
  output: lodash.assign(lodash.clone(config.output), {
    pathinfo: true,
  }),
  watch: true,
  plugins: (config.plugins || []).concat([
    new RunInMeteorPlugin({
      meteor: dirs.meteor,
      key: 'server',
      target: 'server',
      mode: 'development',
    }),
  ]),
});
