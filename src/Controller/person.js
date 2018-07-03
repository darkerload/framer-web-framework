var personManager= require('./../Data/person');
var render = require('./../Middleware/render');
var cache= require('./../Middleware/cacheFrame');

var person= {
  list:function (req, res) {
    personManager.getlist(function (data) {
      var mata = {
        data: data,
        kata:123
      };
      render.renderFull(res,cache.get("person::list"), mata);
    });
  },
  index:function (req, res) {
    var data = {
      name:"john",
      email:"aa@a.com"
    };

    render.renderFull(res, cache.get("person::index"), data);
  }
};
module.exports = person;