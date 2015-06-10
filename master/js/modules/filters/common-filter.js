/**=========================================================
 * Module: common-filter.js
 * Filter for common use 
 =========================================================*/

App.filter("moment", function () {
  return function (input, format) {
    return moment(input).format(format || 'YYYY-MM-DD HH:mm:ss');
  }
});

App.filter("moment_unix", function () {
  return function (input, format) {
    return moment.unix(input).format(format || 'YYYY-MM-DD HH:mm:ss');
  }
});

App.filter("language", function () {
  var languages = {
    'zh_CN': '简体中文',
    'zh_TW': '繁体中文',
    'en': '英文'
  };
  return function (input) {
    return languages[input];
  }
});
