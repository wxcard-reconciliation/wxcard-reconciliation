/**=========================================================
 * Module: wechat-filter.js
 * Filter for wchat 
 =========================================================*/

App.filter("wechat_sex", function () {
  var sexs = ['保密','男','女'];
  return function (input) {
    return sexs[input];
  }
});

