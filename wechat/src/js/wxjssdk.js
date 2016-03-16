//! wechat.js
//! version : 0.1.0
//! authors : guanbo2002@gmail.com
//! license : MIT

require('jquery-weui/dist/css/jquery-weui.css');
require('jquery-weui/dist/js/jquery-weui.js');

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

var wxjssdk = {
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
  },
  getUser: function (success, error) {
    success = success || function (user) {
      wxjssdk.setCookie('wxuser', JSON.stringify(user));
    };
    error = error || function (res) {
      var cachedUser = wxjssdk.getCookie('wxuser');
      if(cachedUser) return success(JSON.parse(cachedUser));
      console.log(res);
    };
    var code = getUrlVars().code;
    if(!code) {
      return error('no code');
    }

    $.ajax({
      url: "http://zsydz.aceweet.com:3000/api/wxaccesstokens/getuserbycode",
      data: {
        code: code
      },
      crossDomain: true,
      success: success,
      error: error
    });
  },
  setCookie: function (name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },
  getCookie: function (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
};

module.exports = wxjssdk;