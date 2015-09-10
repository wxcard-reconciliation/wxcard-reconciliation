/**=========================================================
 * Module: card-filter.js
 * Filter for card of wechat 
 =========================================================*/

App.filter("card_type", function () {
  var card_type = {
    GROUPON: '团购券',
    DISCOUNT: '折扣券',
    GIFT: '礼品券',
    CASH: '代金券', 
    GENERAL_COUPON: '通用券', 
    MEMBER_CARD: '会员卡', 
    SCENIC_TICKET: '景点门票', 
    MOVIE_TICKET: '电影票',
    BOARDING_PASS: '飞机票', 
    MEETING_TICKET: '会议门票',
    BUS_TICKET: '汽车票'
  };
  return function (input) {
    return card_type[input.toUpperCase()];
  };
});

App.filter("card_status", function () {
  var card_status = {
    CARD_STATUS_NOT_VERIFY: '待审核',
    CARD_STATUS_VERIFY_FALL: '未通过',
    CARD_STATUS_VERIFY_OK: '待投放',
    CARD_STATUS_DELETE: '已删除',
    CARD_STATUS_DISPATCH: '已投放'
  };
  return function (input) {
    return card_status[input];
  };
});

App.filter("card_date_info", function () {
  return function (date_info) {
    if(date_info.type === 'DATE_TYPE_FIX_TERM') {
      return '领取后'+date_info.fixed_begin_term+'天生效'+date_info.fixed_term+'天有效';
    } else if(date_info.type === 'DATE_TYPE_FIX_TIME_RANGE') {
      return moment.unix(date_info.begin_timestamp).format('YYYY-MM-DD')+
      '至'+moment.unix(date_info.end_timestamp).format('YYYY-MM-DD');
    } else if(date_info.type === 'DATE_TYPE_PERMANENT') {
      return '永久有效';
    } else {
      return '未知有效期';
    }
  };
});

