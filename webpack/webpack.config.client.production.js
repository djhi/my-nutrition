/* eslint no-var:0 */
var lodash = require('lodash');

module.exports = lodash.assign(require('./webpack.config.client.deploy'), {
  watch: true,
});
