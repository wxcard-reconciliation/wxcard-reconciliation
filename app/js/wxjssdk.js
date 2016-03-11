//! wechat.js
//! version : 0.1.0
//! authors : guanbo2002@gmail.com
//! license : MIT

$(function (undefined) {
  
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
  $.ajax({
    url: "http://zsydz.aceweet.com:3000/api/wxaccesstokens/getjsconfig",
    data: {
      param: {
        // debug: true,
        jsApiList: ['addCard'],
        url: window.location.href
      }
    },
    crossDomain: true,
    success: function( data ) {
      wx.config(data);
    },
    error: function (res) {
      console.log(res);
    }
  });
  
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
});