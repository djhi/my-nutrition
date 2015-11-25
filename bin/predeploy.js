/* global cd, env, exec */
/* eslint vars-on-top:0, no-var:0 */

require('shelljs/global');
var runWebpackConfigs = require('./runWebpackConfigs');

require('./core-js-custom-build');

module.exports = runWebpackConfigs.bind(undefined, 'deploy');
