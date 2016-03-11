//! wechat.js
//! version : 0.1.0
//! authors : guanbo2002@gmail.com
//! license : MIT

(function (undefined) {
  
  var   wxjssdk,
        // the global-scope this is NOT the global object in Node.js
        globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this,
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module && module.exports)
  function getUrlVars()
  {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }
  
  wxjssdk = {
    config: function (param, success, error) {
      param = param || {/*debug: true*/};
      param.url = window.location.href;
      $.ajax({
        url: "http://zsydz.aceweet.com:3000/api/wxaccesstokens/getjsconfig",
        data: {
          param: param
        },
        crossDomain: true,
        success: success || function( data ) {
          wx.config(data);
        },
        error: error || function (res) {
          console.log(res);
        }
      });
    }
  }
  
  // wx.ready(function () {
  //   $.ajax({
  //     url: "http://zsydz.aceweet.com:3000/api/wxaccesstokens/getoauthaccesstoken",
  //     data: {
  //       code: getUrlVars().code
  //     },
  //     crossDomain: true,
  //     success: function (data) {
  //       console.log(data);
  //       var openid = data.openid || 'oAtUNs_WhBwy3QiftzLuk6aihKlU';
  //     },
  //     error: function (res) {
  //       console.log(arguments);
  //     }
  //   });
  // });
  
  // wx.error(function (res) {
  //   console.log(res);
  // });
  
  if (hasModule) {
    module.exports = wxjssdk;
  } else if (typeof define === 'function' && define.amd) {
    define(function (require, exports) {
      return wxjssdk;
    });
  } else {
    globalScope.wxjssdk = wxjssdk;
  }
}).call(this);