var setting = require('./Config/setting');

function RouteGuider(req, res) {
  var routePath = req.url.split('?')[0];
  var verbName = req.method.toLowerCase();

  if(routePath[0] ==="/" ){
    routePath = routePath.substring(1);
  }
  if (routePath == "") {
    routePath = "home";
  }

  if (global.routes.hasOwnProperty(routePath)) {
    var item = global.routes[routePath][verbName];
    var controller = require(setting.controllerFolder + item.controller);
    controller[item.function](req, res);
  } else {
    var controller = require(setting.errorController);
    controller.error404(req, res);
  }
}

module.exports = {
  guideRequest:RouteGuider
};