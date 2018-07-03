var setting = require('./../Config/setting');
var core = require('./../Core');
var fs = require('fs');
var cache = require('./cacheFrame');

var dir = process.cwd();



var initWatchfiles = function () {
  var opt = {
    recursive: true
  };
  fs.watch(dir + setting.root, opt, function (err, content) {
    if (!global.fsTimeout) {
      global.fsTimeout = setTimeout(function () {
        render.init(function () {
          console.log('files reloaded');
          delete global.fsTimeout;
        });
      },2000);
    }
  });
};


var tengine = function(html, options) {
  var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
  var add = function(line, js) {
    js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
      (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return add;
  }
  while(match = re.exec(html)) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
};

var render = {
  initWatcher: initWatchfiles,
  init: function (cb) {
    var funcArr = [];
    funcArr.push(getHtmlfooter, getHtmlheader, getMaster);

    core.callMethods(funcArr,0, function (){
      core.getFileNames(dir+ setting.allViewFolder , function(listfiles){
        for(var i = 0 ;i< listfiles.length; i++){
          var content = fs.readFileSync(dir + setting.allViewFolder + listfiles[i].controller + '/' + listfiles[i].view+'.tht', "utf8");
          var cacheKey = listfiles[i].controller +'::'+listfiles[i].view;

          preCache(content, function(ManuplatedContent){
            cache.set(cacheKey,ManuplatedContent);
            if (typeof cb === "function") {
              cb();
            }
          });
        }
      });
    });
  },

  renderFull: function (res, html, data, cb) {
    dataRender(html, data, function (result) {
      res.write(result);
      res.end();
      if (typeof cb === "function") {
        cb();
      }
    });
  },
  renderData : function (res, data, type) {
    switch (type){
      case 'json':
        res.writeHead(200, setting.TheHeaderJson);
        break;
      case 'xml':
        res.writeHead(200, setting.TheHeaderXml);
        break;
      default:
        res.writeHead(200, setting.TheHeaderJson);//default json
        break;
    }
    res.write(JSON.stringify(data));
    res.end();
  }
};

var preCache = function (content, cb) {
  var master = cache.get("main::master");
  var headerData = cache.get("main::header");
  var footerData = cache.get("main::footer");
  master = master.replace(new RegExp('<%footer%>', 'g'), (footerData)? footerData:'');
  master = master.replace(new RegExp('<%header%>', 'g'), (headerData)? headerData:'');
  master = master.replace(new RegExp('<%page.body%>', 'g'), content);
  for(var prop in setting.proj){
    master = master.replace(new RegExp('<%proj.'+ prop +'%>', 'g'), setting.proj[prop]);
  }
  if (typeof cb === "function") {
    cb(master);
  }
};

var dataRender = function (html, data, cb) {
  html = html.replace(new RegExp('<%page.header%>', 'g'), ((data.header)? data.header:''));
  html = html.replace(new RegExp('<%page.footer%>', 'g'), ((data.footer)? data.footer:''));
  
  html = tengine(html,data);

  if (typeof cb === "function") {
    cb(html);
  }
};
var getMaster = function (cb) {
  core.readFile(dir + setting.viewFolder + 'master.tht',function (content) {
    cache.set("main::master",content);
    if (typeof cb === "function") {
      cb();
    }
  });
};
var getHtmlheader = function (cb) {
  core.readFile(dir + setting.viewFolder +'header.tht',function (content) {
    cache.set("main::header",content);
    if (typeof cb === "function") {
      cb();
    }
  });
};
var getHtmlfooter = function (cb) {
  fs.readFile(dir + setting.viewFolder +'footer.tht', 'utf-8', function (err, content) {
    if (err) {
      console.log(err);
    }
    cache.set("main::footer",content);
    if (typeof cb === "function") {
      cb();
    }
  });
};
var getHomeMain = function () {
  core.readFile(dir + setting.viewFolder + 'home/main.tht',function (content) {
    cache.set("home::main",content);
    if (typeof cb === "function") {
      cb();
    }
  });
}


module.exports = render;