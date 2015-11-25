/* eslint vars-on-top:0, no-var:0 */

var path = require('path');

module.exports = {
  webpack: path.join(__dirname, '..', 'webpack'),
  meteor: path.join(__dirname, '..', 'meteor_core'),
  node_modules: path.join(__dirname, '..', 'node_modules'),
};

module.exports.assets = path.join(module.exports.webpack, 'assets');
