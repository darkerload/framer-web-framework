var noCacheHeader = 'private, max-age=0, no-cache, no-store';

exports.proj = {
  Title: 'Basic web site Frame'
};

exports.root = '/Presentation/';
exports.rootPath = '/Presentation/assets/';
exports.viewFolder = '/Presentation/Pages/';
exports.allViewFolder = '/Presentation/Pages/views/';
exports.virtualRootPath = '/virt/';

exports.controllerFolder = './controller/';
exports.jsonPath = "/src/Config/Routes.json";
exports.ServerPort = 8090;

exports.errorController = './controller/error';

exports.TheHeaderJson = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderXml  = {
  'Content-Type': 'application/xml',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderHtml = {
  'Content-Type': 'text/html',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderCss  = {
  'Content-Type': 'text/css',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderJavascript = {
  'Content-Type': 'text/javascript',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderPNG  = {
  'Content-Type': 'image/png',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderJPG  = {
  'Content-Type': 'image/jpg',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};
exports.TheHeaderJPEG = {
  'Content-Type': 'image/jpeg',
  'Accept-Ranges': 'bytes',
  'Cache-Control': noCacheHeader
};