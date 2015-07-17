/**=========================================================
 * Module: coupon-filter.js
 * Filter for coupon of wechat 
 =========================================================*/

App.filter("coupon_type", function () {
  var types = ['团购券','折扣券','礼品券', '代金券', '通用优惠券', 
  '会员卡', '景点门票', '电影票', '飞机票', '会议门票', '汽车票'];
  return function (input) {
    return types[input];
  }
});

