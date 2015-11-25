require('expose?jQuery!jquery');
require('expose?Tether!tether');
require('bootstrap');
require('./mocks');

// require all foo_spec.js, bar_spec.jsx files in the app directory
const testContext = require.context('.', true, /.+\.js$/);
testContext.keys().forEach(testContext);

const appContext = require.context('../app', true, /^(?!main_client|main_server|.*containers|.*components).*\.js$/);
appContext.keys().forEach(appContext);

module.exports = {testContext, appContext};
