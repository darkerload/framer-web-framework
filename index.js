var http  = require('http');
var setting = require('./src/Config/setting');
var core = require('./src/Core');
var mimeCore = require('./src/Middleware/mimefilter');
var render = require('./src/Middleware/render');

render.init();
render.initWatcher();
core.initRouter(function () {
  http.createServer(function (req, res) {
    mimeCore.catchMime(req,res);
  }).listen(setting.ServerPort);
});
