var fs = require('fs');
var setting = require('./Config/setting');
var dir = process.cwd();

var getFileNames = function(directory, done) {
  var results = [];
  var dirs = fs.readdirSync(directory);
  for(var i=0; i<dirs.length; i++) {
    var files =fs.readdirSync(directory + dirs[i]);
    for(var j=0; j<files.length; j++) {
      var obj= {controller:dirs[i], view:files[j].replace(/\.[^/.]+$/, "")};
      results.push(obj);
    }
  }
  done(results);
};

var readFile = function (file, cb) {
  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {console.log(err);}
    if (typeof cb === "function") {
      cb(data);
    }
  });
};

var getfileContentImg = function (res,filePath) {
  fs.readFile(dir + filePath, function (err, data) {
    if (err) {console.log(err);}
    res.end(data);
  });
};

var getfileContent = function (res,filePath) {
  fs.readFile(dir + filePath, function (err, content) {
    if (err) {console.log(err);}
    res.write(content);
    res.end();
  });
};

var initRouteConfigWatcher = function () {
  fs.watch(dir + setting.jsonPath, function (err, content) {
    if (!global.fsTimeout) {
      global.fsTimeout = setTimeout(function () {
        loadRouteFile();
        console.log('route config reloaded');
        delete global.fsTimeout;
      },2000);
    }
  });
};

var loadRouteFile= function(){
  fs.readFile(dir + setting.jsonPath,'utf-8', function (err, content) {
    var routes = JSON.parse(content);
    global.routes = routes;
  });
};

var callMethods = function (methods,i, cb) {
  if (i === methods.length-1) {
    methods[i](function () {
      if (typeof cb === "function") {
        cb();
      }
    });
  } else{
    methods[i](function(){
      callMethods(methods,i+1, cb);
    });
  }
};

var core = {
  getfileContentImg:getfileContentImg,
  getfileContent:getfileContent,
  callMethods: callMethods,
  readFile: readFile,
  getFileNames:getFileNames,
  initRouter: function (cb) {
    loadRouteFile();
    initRouteConfigWatcher();
    cb();
  },
  checkVirtual:function (url, cb) {
    cb(url.indexOf(setting.virtualRootPath)!=-1);
  },
  getExtention:function (url) {
    return url.substring(url.lastIndexOf('.'));
  }
};
module.exports = core;