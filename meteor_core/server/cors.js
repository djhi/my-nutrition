/* global WebApp */

WebApp.connectHandlers.use(function addCors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});
