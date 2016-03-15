/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var wxjssdk = __webpack_require__(1);

	function fetchPois(branch) {
	  var filter = { limit: 10 };
	  if (branch && branch != '') filter.where = { branch_name: { regex: branch } };
	  $('#poiList').empty();
	  $.showLoading();
	  $.ajax({
	    url: "http://zsydz.aceweet.com:3000/api/pois",
	    data: {
	      filter: filter
	    },
	    crossDomain: true,
	    success: function (data) {
	      $.hideLoading();
	      data.forEach(function (poi) {
	        var dom = '<div class="weui_cell" id="' + poi.poi_id + '"> \
	                    <div class="weui_cell_bd weui_cell_primary"> \
	                      <p>' + poi.branch_name + '</p> \
	                    </div> \
	                    <div class="weui_cell_ft"> ' + poi.city + '\
	                    </div> \
	                  </div>';
	        $('#poiList').append(dom);
	        $('#' + poi.poi_id).click(function (e) {
	          wxjssdk.setCookie('selectedPoi', JSON.stringify(poi));
	          history.back();
	        });
	      });
	    },
	    error: function (res) {
	      $.hideLoading();
	      console.log(res);
	    }
	  });
	}

	fetchPois();

	$('#search_input').on('input', function (e) {
	  fetchPois(e.target.value);
	});

	$('#search_cancel').on("touchend", function () {
	  fetchPois();
	  $('#search_input').val('');
	});

	$('#search_clear').on("touchend", function () {
	  fetchPois();
	  $('#search_input').val('');
	});

	var data = {};
	wxjssdk.config({ jsApiList: ['hideOptionMenu'] });
	wx.ready(function () {
	  wx.hideOptionMenu();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//! wechat.js
	//! version : 0.1.0
	//! authors : guanbo2002@gmail.com
	//! license : MIT

	__webpack_require__(2);
	__webpack_require__(6);

	function getUrlVars() {
	  var vars = [],
	      hash;
	  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	  for (var i = 0; i < hashes.length; i++) {
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
	      success: success || function (data) {
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
	      if (cachedUser) return success(JSON.parse(cachedUser));
	      console.log(arguments);
	    };
	    var code = getUrlVars().code;
	    if (!code) {
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
	    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	  },
	  getCookie: function (name) {
	    var arr,
	        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	  }
	};

	module.exports = wxjssdk;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./jquery-weui.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./jquery-weui.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".preloader {\n  width: 20px;\n  height: 20px;\n  -webkit-transform-origin: 50%;\n          transform-origin: 50%;\n  -webkit-animation: preloader-spin 1s steps(12, end) infinite;\n          animation: preloader-spin 1s steps(12, end) infinite;\n}\n.preloader:after {\n  display: block;\n  width: 100%;\n  height: 100%;\n  content: \"\";\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100%;\n}\n@-webkit-keyframes preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n/* === Grid === */\n.weui-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n  -webkit-box-lines: multiple;\n  -moz-box-lines: multiple;\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n}\n.weui-row > [class*=\"col-\"] {\n  box-sizing: border-box;\n}\n.weui-row .col-auto {\n  width: 100%;\n}\n.weui-row .weui-col-100 {\n  width: 100%;\n  width: calc((100% - 15px*0) / 1);\n}\n.weui-row.weui-no-gutter .weui-col-100 {\n  width: 100%;\n}\n.weui-row .weui-col-95 {\n  width: 95%;\n  width: calc((100% - 15px*0.05263157894736836) / 1.0526315789473684);\n}\n.weui-row.weui-no-gutter .weui-col-95 {\n  width: 95%;\n}\n.weui-row .weui-col-90 {\n  width: 90%;\n  width: calc((100% - 15px*0.11111111111111116) / 1.1111111111111112);\n}\n.weui-row.weui-no-gutter .weui-col-90 {\n  width: 90%;\n}\n.weui-row .weui-col-85 {\n  width: 85%;\n  width: calc((100% - 15px*0.17647058823529416) / 1.1764705882352942);\n}\n.weui-row.weui-no-gutter .weui-col-85 {\n  width: 85%;\n}\n.weui-row .weui-col-80 {\n  width: 80%;\n  width: calc((100% - 15px*0.25) / 1.25);\n}\n.weui-row.weui-no-gutter .weui-col-80 {\n  width: 80%;\n}\n.weui-row .weui-col-75 {\n  width: 75%;\n  width: calc((100% - 15px*0.33333333333333326) / 1.3333333333333333);\n}\n.weui-row.weui-no-gutter .weui-col-75 {\n  width: 75%;\n}\n.weui-row .weui-col-66 {\n  width: 66.66666666666666%;\n  width: calc((100% - 15px*0.5000000000000002) / 1.5000000000000002);\n}\n.weui-row.weui-no-gutter .weui-col-66 {\n  width: 66.66666666666666%;\n}\n.weui-row .weui-col-60 {\n  width: 60%;\n  width: calc((100% - 15px*0.6666666666666667) / 1.6666666666666667);\n}\n.weui-row.weui-no-gutter .weui-col-60 {\n  width: 60%;\n}\n.weui-row .weui-col-50 {\n  width: 50%;\n  width: calc((100% - 15px*1) / 2);\n}\n.weui-row.weui-no-gutter .weui-col-50 {\n  width: 50%;\n}\n.weui-row .weui-col-40 {\n  width: 40%;\n  width: calc((100% - 15px*1.5) / 2.5);\n}\n.weui-row.weui-no-gutter .weui-col-40 {\n  width: 40%;\n}\n.weui-row .weui-col-33 {\n  width: 33.333333333333336%;\n  width: calc((100% - 15px*2) / 3);\n}\n.weui-row.weui-no-gutter .weui-col-33 {\n  width: 33.333333333333336%;\n}\n.weui-row .weui-col-25 {\n  width: 25%;\n  width: calc((100% - 15px*3) / 4);\n}\n.weui-row.weui-no-gutter .weui-col-25 {\n  width: 25%;\n}\n.weui-row .weui-col-20 {\n  width: 20%;\n  width: calc((100% - 15px*4) / 5);\n}\n.weui-row.weui-no-gutter .weui-col-20 {\n  width: 20%;\n}\n.weui-row .weui-col-15 {\n  width: 15%;\n  width: calc((100% - 15px*5.666666666666667) / 6.666666666666667);\n}\n.weui-row.weui-no-gutter .weui-col-15 {\n  width: 15%;\n}\n.weui-row .weui-col-10 {\n  width: 10%;\n  width: calc((100% - 15px*9) / 10);\n}\n.weui-row.weui-no-gutter .weui-col-10 {\n  width: 10%;\n}\n.weui-row .weui-col-5 {\n  width: 5%;\n  width: calc((100% - 15px*19) / 20);\n}\n.weui-row.weui-no-gutter .weui-col-5 {\n  width: 5%;\n}\n.weui-row .weui-col-auto:nth-last-child(1),\n.weui-row .weui-col-auto:nth-last-child(1) ~ .weui-col-auto {\n  width: 100%;\n  width: calc((100% - 15px*0) / 1);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(1),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(1) ~ .weui-col-auto {\n  width: 100%;\n}\n.weui-row .weui-col-auto:nth-last-child(2),\n.weui-row .weui-col-auto:nth-last-child(2) ~ .weui-col-auto {\n  width: 50%;\n  width: calc((100% - 15px*1) / 2);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(2),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(2) ~ .weui-col-auto {\n  width: 50%;\n}\n.weui-row .weui-col-auto:nth-last-child(3),\n.weui-row .weui-col-auto:nth-last-child(3) ~ .weui-col-auto {\n  width: 33.33333333%;\n  width: calc((100% - 15px*2) / 3);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(3),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(3) ~ .weui-col-auto {\n  width: 33.33333333%;\n}\n.weui-row .weui-col-auto:nth-last-child(4),\n.weui-row .weui-col-auto:nth-last-child(4) ~ .weui-col-auto {\n  width: 25%;\n  width: calc((100% - 15px*3) / 4);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(4),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(4) ~ .weui-col-auto {\n  width: 25%;\n}\n.weui-row .weui-col-auto:nth-last-child(5),\n.weui-row .weui-col-auto:nth-last-child(5) ~ .weui-col-auto {\n  width: 20%;\n  width: calc((100% - 15px*4) / 5);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(5),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(5) ~ .weui-col-auto {\n  width: 20%;\n}\n.weui-row .weui-col-auto:nth-last-child(6),\n.weui-row .weui-col-auto:nth-last-child(6) ~ .weui-col-auto {\n  width: 16.66666667%;\n  width: calc((100% - 15px*5) / 6);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(6),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(6) ~ .weui-col-auto {\n  width: 16.66666667%;\n}\n.weui-row .weui-col-auto:nth-last-child(7),\n.weui-row .weui-col-auto:nth-last-child(7) ~ .weui-col-auto {\n  width: 14.28571429%;\n  width: calc((100% - 15px*6) / 7);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(7),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(7) ~ .weui-col-auto {\n  width: 14.28571429%;\n}\n.weui-row .weui-col-auto:nth-last-child(8),\n.weui-row .weui-col-auto:nth-last-child(8) ~ .weui-col-auto {\n  width: 12.5%;\n  width: calc((100% - 15px*7) / 8);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(8),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(8) ~ .weui-col-auto {\n  width: 12.5%;\n}\n.weui-row .weui-col-auto:nth-last-child(9),\n.weui-row .weui-col-auto:nth-last-child(9) ~ .weui-col-auto {\n  width: 11.11111111%;\n  width: calc((100% - 15px*8) / 9);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(9),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(9) ~ .weui-col-auto {\n  width: 11.11111111%;\n}\n.weui-row .weui-col-auto:nth-last-child(10),\n.weui-row .weui-col-auto:nth-last-child(10) ~ .weui-col-auto {\n  width: 10%;\n  width: calc((100% - 15px*9) / 10);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(10),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(10) ~ .weui-col-auto {\n  width: 10%;\n}\n.weui-row .weui-col-auto:nth-last-child(11),\n.weui-row .weui-col-auto:nth-last-child(11) ~ .weui-col-auto {\n  width: 9.09090909%;\n  width: calc((100% - 15px*10) / 11);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(11),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(11) ~ .weui-col-auto {\n  width: 9.09090909%;\n}\n.weui-row .weui-col-auto:nth-last-child(12),\n.weui-row .weui-col-auto:nth-last-child(12) ~ .weui-col-auto {\n  width: 8.33333333%;\n  width: calc((100% - 15px*11) / 12);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(12),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(12) ~ .weui-col-auto {\n  width: 8.33333333%;\n}\n.weui-row .weui-col-auto:nth-last-child(13),\n.weui-row .weui-col-auto:nth-last-child(13) ~ .weui-col-auto {\n  width: 7.69230769%;\n  width: calc((100% - 15px*12) / 13);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(13),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(13) ~ .weui-col-auto {\n  width: 7.69230769%;\n}\n.weui-row .weui-col-auto:nth-last-child(14),\n.weui-row .weui-col-auto:nth-last-child(14) ~ .weui-col-auto {\n  width: 7.14285714%;\n  width: calc((100% - 15px*13) / 14);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(14),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(14) ~ .weui-col-auto {\n  width: 7.14285714%;\n}\n.weui-row .weui-col-auto:nth-last-child(15),\n.weui-row .weui-col-auto:nth-last-child(15) ~ .weui-col-auto {\n  width: 6.66666667%;\n  width: calc((100% - 15px*14) / 15);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(15),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(15) ~ .weui-col-auto {\n  width: 6.66666667%;\n}\n@media all and (min-width: 768px) {\n  .row .tablet-100 {\n    width: 100%;\n    width: calc((100% - 15px*0) / 1);\n  }\n  .row.no-gutter .tablet-100 {\n    width: 100%;\n  }\n  .row .tablet-95 {\n    width: 95%;\n    width: calc((100% - 15px*0.05263157894736836) / 1.0526315789473684);\n  }\n  .row.no-gutter .tablet-95 {\n    width: 95%;\n  }\n  .row .tablet-90 {\n    width: 90%;\n    width: calc((100% - 15px*0.11111111111111116) / 1.1111111111111112);\n  }\n  .row.no-gutter .tablet-90 {\n    width: 90%;\n  }\n  .row .tablet-85 {\n    width: 85%;\n    width: calc((100% - 15px*0.17647058823529416) / 1.1764705882352942);\n  }\n  .row.no-gutter .tablet-85 {\n    width: 85%;\n  }\n  .row .tablet-80 {\n    width: 80%;\n    width: calc((100% - 15px*0.25) / 1.25);\n  }\n  .row.no-gutter .tablet-80 {\n    width: 80%;\n  }\n  .row .tablet-75 {\n    width: 75%;\n    width: calc((100% - 15px*0.33333333333333326) / 1.3333333333333333);\n  }\n  .row.no-gutter .tablet-75 {\n    width: 75%;\n  }\n  .row .tablet-66 {\n    width: 66.66666666666666%;\n    width: calc((100% - 15px*0.5000000000000002) / 1.5000000000000002);\n  }\n  .row.no-gutter .tablet-66 {\n    width: 66.66666666666666%;\n  }\n  .row .tablet-60 {\n    width: 60%;\n    width: calc((100% - 15px*0.6666666666666667) / 1.6666666666666667);\n  }\n  .row.no-gutter .tablet-60 {\n    width: 60%;\n  }\n  .row .tablet-50 {\n    width: 50%;\n    width: calc((100% - 15px*1) / 2);\n  }\n  .row.no-gutter .tablet-50 {\n    width: 50%;\n  }\n  .row .tablet-40 {\n    width: 40%;\n    width: calc((100% - 15px*1.5) / 2.5);\n  }\n  .row.no-gutter .tablet-40 {\n    width: 40%;\n  }\n  .row .tablet-33 {\n    width: 33.333333333333336%;\n    width: calc((100% - 15px*2) / 3);\n  }\n  .row.no-gutter .tablet-33 {\n    width: 33.333333333333336%;\n  }\n  .row .tablet-25 {\n    width: 25%;\n    width: calc((100% - 15px*3) / 4);\n  }\n  .row.no-gutter .tablet-25 {\n    width: 25%;\n  }\n  .row .tablet-20 {\n    width: 20%;\n    width: calc((100% - 15px*4) / 5);\n  }\n  .row.no-gutter .tablet-20 {\n    width: 20%;\n  }\n  .row .tablet-15 {\n    width: 15%;\n    width: calc((100% - 15px*5.666666666666667) / 6.666666666666667);\n  }\n  .row.no-gutter .tablet-15 {\n    width: 15%;\n  }\n  .row .tablet-10 {\n    width: 10%;\n    width: calc((100% - 15px*9) / 10);\n  }\n  .row.no-gutter .tablet-10 {\n    width: 10%;\n  }\n  .row .tablet-5 {\n    width: 5%;\n    width: calc((100% - 15px*19) / 20);\n  }\n  .row.no-gutter .tablet-5 {\n    width: 5%;\n  }\n  .row .tablet-auto:nth-last-child(1),\n  .row .tablet-auto:nth-last-child(1) ~ .col-auto {\n    width: 100%;\n    width: calc((100% - 15px*0) / 1);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(1),\n  .row.no-gutter .tablet-auto:nth-last-child(1) ~ .tablet-auto {\n    width: 100%;\n  }\n  .row .tablet-auto:nth-last-child(2),\n  .row .tablet-auto:nth-last-child(2) ~ .col-auto {\n    width: 50%;\n    width: calc((100% - 15px*1) / 2);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(2),\n  .row.no-gutter .tablet-auto:nth-last-child(2) ~ .tablet-auto {\n    width: 50%;\n  }\n  .row .tablet-auto:nth-last-child(3),\n  .row .tablet-auto:nth-last-child(3) ~ .col-auto {\n    width: 33.33333333%;\n    width: calc((100% - 15px*2) / 3);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(3),\n  .row.no-gutter .tablet-auto:nth-last-child(3) ~ .tablet-auto {\n    width: 33.33333333%;\n  }\n  .row .tablet-auto:nth-last-child(4),\n  .row .tablet-auto:nth-last-child(4) ~ .col-auto {\n    width: 25%;\n    width: calc((100% - 15px*3) / 4);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(4),\n  .row.no-gutter .tablet-auto:nth-last-child(4) ~ .tablet-auto {\n    width: 25%;\n  }\n  .row .tablet-auto:nth-last-child(5),\n  .row .tablet-auto:nth-last-child(5) ~ .col-auto {\n    width: 20%;\n    width: calc((100% - 15px*4) / 5);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(5),\n  .row.no-gutter .tablet-auto:nth-last-child(5) ~ .tablet-auto {\n    width: 20%;\n  }\n  .row .tablet-auto:nth-last-child(6),\n  .row .tablet-auto:nth-last-child(6) ~ .col-auto {\n    width: 16.66666667%;\n    width: calc((100% - 15px*5) / 6);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(6),\n  .row.no-gutter .tablet-auto:nth-last-child(6) ~ .tablet-auto {\n    width: 16.66666667%;\n  }\n  .row .tablet-auto:nth-last-child(7),\n  .row .tablet-auto:nth-last-child(7) ~ .col-auto {\n    width: 14.28571429%;\n    width: calc((100% - 15px*6) / 7);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(7),\n  .row.no-gutter .tablet-auto:nth-last-child(7) ~ .tablet-auto {\n    width: 14.28571429%;\n  }\n  .row .tablet-auto:nth-last-child(8),\n  .row .tablet-auto:nth-last-child(8) ~ .col-auto {\n    width: 12.5%;\n    width: calc((100% - 15px*7) / 8);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(8),\n  .row.no-gutter .tablet-auto:nth-last-child(8) ~ .tablet-auto {\n    width: 12.5%;\n  }\n  .row .tablet-auto:nth-last-child(9),\n  .row .tablet-auto:nth-last-child(9) ~ .col-auto {\n    width: 11.11111111%;\n    width: calc((100% - 15px*8) / 9);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(9),\n  .row.no-gutter .tablet-auto:nth-last-child(9) ~ .tablet-auto {\n    width: 11.11111111%;\n  }\n  .row .tablet-auto:nth-last-child(10),\n  .row .tablet-auto:nth-last-child(10) ~ .col-auto {\n    width: 10%;\n    width: calc((100% - 15px*9) / 10);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(10),\n  .row.no-gutter .tablet-auto:nth-last-child(10) ~ .tablet-auto {\n    width: 10%;\n  }\n  .row .tablet-auto:nth-last-child(11),\n  .row .tablet-auto:nth-last-child(11) ~ .col-auto {\n    width: 9.09090909%;\n    width: calc((100% - 15px*10) / 11);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(11),\n  .row.no-gutter .tablet-auto:nth-last-child(11) ~ .tablet-auto {\n    width: 9.09090909%;\n  }\n  .row .tablet-auto:nth-last-child(12),\n  .row .tablet-auto:nth-last-child(12) ~ .col-auto {\n    width: 8.33333333%;\n    width: calc((100% - 15px*11) / 12);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(12),\n  .row.no-gutter .tablet-auto:nth-last-child(12) ~ .tablet-auto {\n    width: 8.33333333%;\n  }\n  .row .tablet-auto:nth-last-child(13),\n  .row .tablet-auto:nth-last-child(13) ~ .col-auto {\n    width: 7.69230769%;\n    width: calc((100% - 15px*12) / 13);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(13),\n  .row.no-gutter .tablet-auto:nth-last-child(13) ~ .tablet-auto {\n    width: 7.69230769%;\n  }\n  .row .tablet-auto:nth-last-child(14),\n  .row .tablet-auto:nth-last-child(14) ~ .col-auto {\n    width: 7.14285714%;\n    width: calc((100% - 15px*13) / 14);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(14),\n  .row.no-gutter .tablet-auto:nth-last-child(14) ~ .tablet-auto {\n    width: 7.14285714%;\n  }\n  .row .tablet-auto:nth-last-child(15),\n  .row .tablet-auto:nth-last-child(15) ~ .col-auto {\n    width: 6.66666667%;\n    width: calc((100% - 15px*14) / 15);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(15),\n  .row.no-gutter .tablet-auto:nth-last-child(15) ~ .tablet-auto {\n    width: 6.66666667%;\n  }\n}\n.weui_dialog,\n.weui_toast {\n  -webkit-transition-duration: .3s;\n          transition-duration: .3s;\n  opacity: 0;\n  -webkit-transform: scale(0.9);\n          transform: scale(0.9);\n  visibility: hidden;\n  margin: 0;\n  left: 7.5%;\n  top: 30%;\n}\n.weui_dialog .weui_btn_dialog + .weui_btn_dialog,\n.weui_toast .weui_btn_dialog + .weui_btn_dialog {\n  position: relative;\n}\n.weui_dialog .weui_btn_dialog + .weui_btn_dialog:after,\n.weui_toast .weui_btn_dialog + .weui_btn_dialog:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  height: 100%;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n.weui_dialog.weui_dialog_visible,\n.weui_toast.weui_dialog_visible,\n.weui_dialog.weui_toast_visible,\n.weui_toast.weui_toast_visible {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.weui_toast {\n  left: 50%;\n  top: 35%;\n  margin-left: -3.8rem;\n}\n.weui_mask {\n  opacity: 0;\n  -webkit-transition-duration: .3s;\n          transition-duration: .3s;\n  visibility: hidden;\n}\n.weui_mask.weui_mask_visible {\n  opacity: 1;\n  visibility: visible;\n}\n.weui_toast {\n  left: 50%;\n  margin-left: -3.8rem;\n  top: 35%;\n}\n.weui-pull-to-refresh {\n  margin-top: -50px;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s;\n}\n.weui-pull-to-refresh.refreshing {\n  -webkit-transform: translate3d(0, 50px, 0);\n          transform: translate3d(0, 50px, 0);\n}\n.weui-pull-to-refresh.touching {\n  -webkit-transition-duration: 0s;\n          transition-duration: 0s;\n}\n.weui-pull-to-refresh-layer {\n  height: 30px;\n  line-height: 30px;\n  padding: 10px;\n  text-align: center;\n}\n.weui-pull-to-refresh-layer .down {\n  display: inline-block;\n}\n.weui-pull-to-refresh-layer .up,\n.weui-pull-to-refresh-layer .refresh {\n  display: none;\n}\n.weui-pull-to-refresh-layer .pull-to-refresh-arrow {\n  display: inline-block;\n  z-index: 10;\n  width: 20px;\n  height: 20px;\n  margin-right: 4px;\n  vertical-align: -4px;\n  background: no-repeat center;\n  background-size: 13px 20px;\n  -webkit-transition-duration: 300ms;\n          transition-duration: 300ms;\n  -webkit-transform: rotate(0deg) translate3d(0, 0, 0);\n          transform: rotate(0deg) translate3d(0, 0, 0);\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2026%2040'%3E%3Cpolygon%20points%3D'9%2C22%209%2C0%2017%2C0%2017%2C22%2026%2C22%2013.5%2C40%200%2C22'%20fill%3D'%238c8c8c'%2F%3E%3C%2Fsvg%3E\");\n}\n.weui-pull-to-refresh-layer .pull-to-refresh-preloader {\n  display: none;\n  vertical-align: -4px;\n  margin-right: 4px;\n  width: 20px;\n  height: 20px;\n  -webkit-transform-origin: 50%;\n          transform-origin: 50%;\n  -webkit-animation: preloader-spin 1s steps(12, end) infinite;\n          animation: preloader-spin 1s steps(12, end) infinite;\n}\n.weui-pull-to-refresh-layer .pull-to-refresh-preloader:after {\n  display: block;\n  width: 100%;\n  height: 100%;\n  content: \"\";\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100%;\n}\n.pull-up .weui-pull-to-refresh-layer .down,\n.refreshing .weui-pull-to-refresh-layer .down {\n  display: none;\n}\n.pull-up .weui-pull-to-refresh-layer .pull-to-refresh-arrow {\n  display: inline-block;\n  -webkit-transform: rotate(180deg) translate3d(0, 0, 0);\n          transform: rotate(180deg) translate3d(0, 0, 0);\n}\n.pull-up .weui-pull-to-refresh-layer .up {\n  display: inline-block;\n}\n.pull-down .weui-pull-to-refresh-layer .pull-to-refresh-arrow {\n  display: inline-block;\n}\n.pull-down .weui-pull-to-refresh-layer .down {\n  display: inline-block;\n}\n.refreshing .weui-pull-to-refresh-layer .pull-to-refresh-arrow {\n  display: none;\n}\n.refreshing .weui-pull-to-refresh-layer .pull-to-refresh-preloader {\n  display: inline-block;\n}\n.refreshing .weui-pull-to-refresh-layer .refresh {\n  display: inline-block;\n}\n@keyframes preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.weui_tab_bd_item.weui-pull-to-refresh {\n  position: absolute;\n  top: 50px;\n}\n.weui-infinite-scroll {\n  height: 24px;\n  line-height: 24px;\n  padding: 10px;\n  text-align: center;\n}\n.weui-infinite-scroll .infinite-preloader {\n  display: inline-block;\n  margin-right: 4px;\n  vertical-align: -4px;\n  width: 20px;\n  height: 20px;\n  -webkit-transform-origin: 50%;\n          transform-origin: 50%;\n  -webkit-animation: preloader-spin 1s steps(12, end) infinite;\n          animation: preloader-spin 1s steps(12, end) infinite;\n}\n.weui-infinite-scroll .infinite-preloader:after {\n  display: block;\n  width: 100%;\n  height: 100%;\n  content: \"\";\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100%;\n}\n.weui_tab {\n  overflow: hidden;\n}\n.weui_navbar_item {\n  color: #888;\n}\n.weui_navbar_item.weui_bar_item_on {\n  color: #666;\n}\n.weui_tab_bd .weui_tab_bd_item {\n  display: none;\n  height: 100%;\n  overflow: auto;\n}\n.weui_tab_bd .weui_tab_bd_item.weui_tab_bd_item_active {\n  display: block;\n}\n.weui_navbar {\n  z-index: 100;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* global $:true */
	/* global WebKitCSSMatrix:true */

	(function($) {
	  "use strict";

	  $.fn.transitionEnd = function(callback) {
	    var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	      i, dom = this;

	    function fireCallBack(e) {
	      /*jshint validthis:true */
	      if (e.target !== this) return;
	      callback.call(this, e);
	      for (i = 0; i < events.length; i++) {
	        dom.off(events[i], fireCallBack);
	      }
	    }
	    if (callback) {
	      for (i = 0; i < events.length; i++) {
	        dom.on(events[i], fireCallBack);
	      }
	    }
	    return this;
	  };

	  $.support = (function() {
	    var support = {
	      touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
	    };
	    return support;
	  })();

	  $.touchEvents = {
	    start: $.support.touch ? 'touchstart' : 'mousedown',
	    move: $.support.touch ? 'touchmove' : 'mousemove',
	    end: $.support.touch ? 'touchend' : 'mouseup'
	  };
	  
	  $.getTouchPosition = function(e) {
	    e = e.originalEvent || e; //jquery wrap the originevent
	    if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
	      return {
	        x: e.targetTouches[0].pageX,
	        y: e.targetTouches[0].pageY
	      };
	    } else {
	      return {
	        x: e.pageX,
	        y: e.pageY
	      };
	    }
	  };

	  $.fn.scrollHeight = function() {
	    return this[0].scrollHeight;
	  };
	})($);

	+ function($) {
	  "use strict";

	  var defaults;
	  
	  $.modal = function(params) {
	    params = $.extend({}, defaults, params);

	    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);

	    var buttons = params.buttons;

	    var buttonsHtml = buttons.map(function(d, i) {
	      return '<a href="javascript:;" class="weui_btn_dialog ' + (d.className || "") + '">' + d.text + '</a>';
	    }).join("");

	    var tpl = '<div class="weui_dialog">' +
	                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + params.title + '</strong></div>' +
	                ( params.text ? '<div class="weui_dialog_bd">'+params.text+'</div>' : '')+
	                '<div class="weui_dialog_ft">' + buttonsHtml + '</div>' +
	              '</div>';
	    var dialog = $(tpl).appendTo(document.body);

	    dialog.find(".weui_btn_dialog").each(function(i, e) {
	      var el = $(e);
	      el.click(function() {
	        //先关闭对话框，再调用回调函数
	        $.closeModal();
	        if(buttons[i].onClick) {
	          buttons[i].onClick();
	        }
	      });
	    });

	    mask.show();
	    dialog.show();
	    mask.addClass("weui_mask_visible");
	    dialog.addClass("weui_dialog_visible");
	  };

	  $.closeModal = function() {
	    $(".weui_mask_visible").removeClass("weui_mask_visible").transitionEnd(function() {
	      $(this).remove();
	    });
	    $(".weui_dialog_visible").removeClass("weui_dialog_visible").transitionEnd(function() {
	      $(this).remove();
	    });
	  };

	  $.alert = function(text, title, callback) {
	    if (typeof title === 'function') {
	      callback = arguments[1];
	      title = undefined;
	    }
	    return $.modal({
	      text: text,
	      title: title,
	      buttons: [{
	        text: defaults.buttonOK,
	        className: "primary",
	        onClick: callback
	      }]
	    });
	  }

	  $.confirm = function(text, title, callbackOK, callbackCancel) {
	    if (typeof title === 'function') {
	      callbackCancel = arguments[2];
	      callbackOK = arguments[1];
	      title = undefined;
	    }
	    return $.modal({
	      text: text,
	      title: title,
	      buttons: [
	      {
	        text: defaults.buttonCancel,
	        className: "default",
	        onClick: callbackCancel
	      },
	      {
	        text: defaults.buttonOK,
	        className: "primary",
	        onClick: callbackOK
	      }]
	    });
	  };

	  defaults = $.modal.prototype.defaults = {
	    title: "提示",
	    text: undefined,
	    buttonOK: "确定",
	    buttonCancel: "取消",
	    buttons: [{
	      text: "确定",
	      className: "primary"
	    }]
	  };

	}($);

	+ function($) {
	  "use strict";

	  var defaults;
	  
	  var show = function(html, className) {

	    className = className || "";
	    var mask = $("<div class='weui_mask_transparent'></div>").appendTo(document.body);

	    var tpl = '<div class="weui_toast ' + className + '">' + html + '</div>';
	    var dialog = $(tpl).appendTo(document.body);

	    dialog.show();
	    dialog.addClass("weui_toast_visible");
	  };

	  var hide = function() {
	    $(".weui_mask_transparent").hide();
	    $(".weui_toast_visible").removeClass("weui_toast_visible").transitionEnd(function() {
	      $(this).remove();
	    });
	  }

	  $.toast = function(text) {
	    show('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (text || "已经完成") + '</p>');

	    setTimeout(function() {
	      hide();
	    }, toastDefaults.duration);
	  }

	  $.showLoading = function(text) {
	    var html = '<div class="weui_loading">';
	    for(var i=0;i<12;i++) {
	      html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
	    }
	    html += '</div>';
	    html += '<p class="weui_toast_content">' + (text || "数据加载中") + '</p>';
	    show(html, 'weui_loading_toast');
	  }

	  $.hideLoading = function() {
	    hide();
	  }

	  var toastDefaults = $.toast.prototype.defaults = {
	    duration: 2000
	  }

	}($);

	+ function($) {
	  "use strict";

	  var defaults;
	  
	  var show = function(params) {

	    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);

	    var actions = params.actions || [];

	    var actionsHtml = actions.map(function(d, i) {
	      return '<div class="weui_actionsheet_cell ' + (d.className || "") + '">' + d.text + '</div>';
	    }).join("");

	    var tpl = '<div class="weui_actionsheet " id="weui_actionsheet">'+
	                '<div class="weui_actionsheet_menu">'+
	                actionsHtml +
	                '</div>'+
	                '<div class="weui_actionsheet_action">'+
	                  '<div class="weui_actionsheet_cell weui_actionsheet_cancel">取消</div>'+
	                  '</div>'+
	                '</div>';
	    var dialog = $(tpl).appendTo(document.body);

	    dialog.find(".weui_actionsheet_menu .weui_actionsheet_cell, .weui_actionsheet_action .weui_actionsheet_cell").each(function(i, e) {
	      $(e).click(function() {
	        $.closeActions();
	        if(actions[i] && actions[i].onClick) {
	          actions[i].onClick();
	        }
	      })
	    });

	    mask.show();
	    dialog.show();
	    mask.addClass("weui_mask_visible");
	    dialog.addClass("weui_actionsheet_toggle");
	  };

	  var hide = function() {
	    $(".weui_mask").removeClass("weui_mask_visible").transitionEnd(function() {
	      $(this).remove();
	    });
	    $(".weui_actionsheet").removeClass("weui_actionsheet_toggle").transitionEnd(function() {
	      $(this).remove();
	    });
	  }

	  $.actions = function(params) {
	    params = $.extend({}, defaults, params);
	    show(params);
	  }

	  $.closeActions = function() {
	    hide();
	  }

	  var defaults = $.actions.prototype.defaults = {
	    /*actions: [{
	      text: "菜单",
	      className: "danger",
	      onClick: function() {
	        console.log(1);
	      }
	    },{
	      text: "菜单2",
	      className: "danger",
	      onClick: function() {
	        console.log(2);
	      }
	    }]*/
	  }

	}($);

	/* ===============================================================================
	************   Notification ************
	=============================================================================== */
	/* global $:true */

	+function ($) {
	  "use strict";

	  var PTR = function(el) {
	    this.container = $(el);
	    this.distance = 50;
	    this.attachEvents();
	  }

	  PTR.prototype.touchStart = function(e) {
	    if(this.container.hasClass("refreshing")) return;
	    var p = $.getTouchPosition(e);
	    this.start = p;
	    this.diffX = this.diffY = 0;
	  };

	  PTR.prototype.touchMove= function(e) {
	    if(this.container.hasClass("refreshing")) return;
	    if(!this.start) return false;
	    if(this.container.scrollTop() > 0) return;
	    var p = $.getTouchPosition(e);
	    this.diffX = p.x - this.start.x;
	    this.diffY = p.y - this.start.y;
	    if(this.diffY < 0) return;
	    this.container.addClass("touching");
	    e.preventDefault();
	    e.stopPropagation();
	    this.diffY = Math.pow(this.diffY, 0.8);
	    this.container.css("transform", "translate3d(0, "+this.diffY+"px, 0)");

	    if(this.diffY < this.distance) {
	      this.container.removeClass("pull-up").addClass("pull-down");
	    } else {
	      this.container.removeClass("pull-down").addClass("pull-up");
	    }
	  };
	  PTR.prototype.touchEnd = function() {
	    this.start = false;
	    if(this.diffY <= 0 || this.container.hasClass("refreshing")) return;
	    this.container.removeClass("touching");
	    this.container.removeClass("pull-down pull-up");
	    this.container.css("transform", "");
	    if(Math.abs(this.diffY) <= this.distance) {
	    } else {
	      this.container.addClass("refreshing");
	      this.container.trigger("pull-to-refresh");
	    }
	  };

	  PTR.prototype.attachEvents = function() {
	    var el = this.container;
	    el.addClass("weui-pull-to-refresh");
	    el.on($.touchEvents.start, $.proxy(this.touchStart, this));
	    el.on($.touchEvents.move, $.proxy(this.touchMove, this));
	    el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
	  };

	  var pullToRefresh = function(el) {
	    new PTR(el);
	  };

	  var pullToRefreshDone = function(el) {
	    $(el).removeClass("refreshing");
	  }

	  $.fn.pullToRefresh = function() {
	    return this.each(function() {
	      pullToRefresh(this);
	    });
	  }

	  $.fn.pullToRefreshDone = function() {
	    return this.each(function() {
	      pullToRefreshDone(this);
	    });
	  }

	}($);

	/* ===============================================================================
	************   Notification ************
	=============================================================================== */
	/* global $:true */
	+function ($) {
	  "use strict";


	  var Infinite = function(el, distance) {
	    this.container = $(el);
	    this.container.data("infinite", this);
	    this.distance = distance || 50;
	    this.attachEvents();
	  }

	  Infinite.prototype.scroll = function() {
	    var container = this.container;
	    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
	    if(offset <= this.distance) {
	      container.trigger("infinite");
	    }
	  }

	  Infinite.prototype.attachEvents = function(off) {
	    var el = this.container;
	    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
	    scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
	  };
	  Infinite.prototype.detachEvents = function(off) {
	    this.attachEvents(true);
	  }

	  var infinite = function(el) {
	    attachEvents(el);
	  }

	  $.fn.infinite = function(distance) {
	    return this.each(function() {
	      new Infinite(this, distance);
	    });
	  }
	  $.fn.destroyInfinite = function() {
	    return this.each(function() {
	      var infinite = $(this).data("infinite");
	      if(infinite && infinite.detachEvents) infinite.detachEvents();
	    });
	  }

	}($);

	/* global $:true */
	+function ($) {
	  "use strict";

	  var ITEM_ON = "weui_bar_item_on";

	  var showTab = function(a) {
	    var $a = $(a);
	    if($a.hasClass(ITEM_ON)) return;
	    var href = $a.attr("href");

	    if(!/^#/.test(href)) return ;

	    $a.parent().find("."+ITEM_ON).removeClass(ITEM_ON);
	    $a.addClass(ITEM_ON);

	    var bd = $a.parents(".weui_tab").find(".weui_tab_bd");

	    bd.find(".weui_tab_bd_item_active").removeClass("weui_tab_bd_item_active");

	    $(href).addClass("weui_tab_bd_item_active");
	  }

	  $.showTab = showTab;

	  $(document).on("click", ".weui_tabbar_item, .weui_navbar_item", function(e) {
	    var $a = $(e.currentTarget);
	    var href = $a.attr("href");
	    if($a.hasClass(ITEM_ON)) return;
	    if(!/^#/.test(href)) return;

	    e.preventDefault();

	    showTab($a);
	  });

	}($);


	/* global $:true */
	+ function($) {
	  "use strict";

	  $(document).on("click", ".weui_search_bar label", function(e) {
	    $(e.target).parents(".weui_search_bar").addClass("weui_search_focusing");
	  }) 
	  .on("blur", ".weui_search_input", function(e) {
	    $(e.target).parents(".weui_search_bar").removeClass("weui_search_focusing");
	  })

	}($);


/***/ }
/******/ ]);