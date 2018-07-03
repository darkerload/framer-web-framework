var core = require('./../Core');
var render = require('./../Middleware/render');
var errorController ={
  error404:function (req, res) {
    render.renderFull(res, "error - 404", "error404");
  },
  error500:function (req, res) {
    render.renderFull(res, "error - 500", "error500");
  }

};

module.exports = errorController;