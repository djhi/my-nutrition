/* global cd, dirs, env, exec */
/* eslint vars-on-top:0, no-var:0 */

require('shelljs/global');
var dirs = require('./dirs');

require('./core-js-custom-build');

process.env.NODE_ENV = env.NODE_ENV = 'production';
require('./runWebpackConfigs')('production', function(err) {
  if (err) throw err;
  cd(dirs.meteor);
  exec('meteor run --production --settings ../settings/production/settings.json', {
    async: true,
  });
});
