/* global cd, echo, exec, ln, mkdir, mv, rm */
/* eslint vars-on-top:0, no-var:0 */
'deploy'
require('shelljs/global');
var path = require('path');

if (!process.argv[2]) {
  echo('See ' + path.basename(__filename) + ' to customize your deploy command');
  return;
}

var projectName = require('./projectName');
if (!projectName) {
  echo('Please enter your project name in projectName.js');
}

var dirs = require('./dirs');

echo();
echo('Building Webpack bundles for deployment in ' + process.env.NODE_ENV + ' environment...');
echo();
require('./predeploy')(function(err) {
  if (err) exit(1);
  deploy();
});

function deploy() {
  var target = process.argv[2];
  var env = process.argv[3] || process.env.NODE_ENV;

  switch (target) {

  case 'meteor.com':
    cd(dirs.meteor);
    exec('meteor deploy ' + projectName + '.meteor.com --settings ../settings/' + env + '/settings.json', {async: true});
    break;

  case 'modulus':
    env.METEOR_SETTINGS = cat('settings/' + env + '/settings.json');
    cd(dirs.meteor);
    exec('modulus deploy --project-name ' + projectName, {async: true});
    break;

  case 'mup':
    echo("Make sure to mup init and mup setup before first deploy");
    /*
     * you will also need to move settings/prod.json to settings/prod/settings.json
     * then mup init inside settings/prod/ so that mup uses the new settings.json
     * this will require a settings path change in ./dev script
     */
    cd('settings/' + env);
    exec('mup deploy', {async: true});
    break;

  case 'demeteorizer':
    rm('-rf', 'dist/bundle');
    mkdir('-p', 'dist/bundle');
    cd(dirs.meteor);
    exec("demeteorizer -o ../dist/bundle --json '" + cat('../settings/' + env + '/settings.json') + "'", {async: true});
    // run your own command to deploy to your server
    break;

  default:
    echo('See ' + path.basename(__filename) + ' to customize your deploy command');
  }
}
