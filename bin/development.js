/* global cd, exec */
/* eslint vars-on-top:0, no-var:0 */

require('shelljs/global');
var dirs = require('./dirs');

require('./core-js-custom-build');

require('./runWebpackConfigs')('development', function(err) {
  if (err) throw err;
  cd(dirs.meteor);
  exec('meteor --settings ../settings/development/settings.json', {
    async: true,
  });
});
