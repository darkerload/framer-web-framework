var cacheObj={};

module.exports = {
  get:function (key) {
    return cacheObj[key];
  },
  set:function (key, val, expTime) {//expTime is in ms
    if(expTime){
      cacheObj[key] = val;
      setTimeout(function () {
        delete cacheObj[key];
      },expTime);
    }else{
      cacheObj[key] = val;
    }
  },
  remove:function (key) {
    delete cacheObj[key];
  },
  list: function () {
    return cacheObj;
  }
};