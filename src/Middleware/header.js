var header = {
  addHeader : function (res, header, cb) {
    if(Array.isArray(header)){
      for(var i = 0 ;i < header.length; i++){
        res.setHeader(header[i].key, header[i].value);
      }
    }else{
      res.setHeader(header.key, header.value);
    }
    if (typeof cb === "function") {
      cb(res);
    }
  },
  removeHeader:function (res, key, cb) {
    //todo: remove single header...
  }
};



module.exports = header;