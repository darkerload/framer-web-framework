var render = require('./../Middleware/render');
var cache = require('./../Middleware/cacheFrame');
var header = require('./../Middleware/header');
var home = {
  main: function (req, res) {
    header.addHeader(res, {key:'X-power-up',value: 'theking'}, function (res) { // adding custom header
      render.renderData(res,{data:'hello'}, 'json');//render data done..
    });
  }
};
module.exports = home;