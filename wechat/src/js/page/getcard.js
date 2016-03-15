var wxjssdk = require('../wxjssdk');

var cards = [
  {title: "测试20元充值抵用", id: "pAtUNsxlJAIAubRJw_7becDfvwuI"},
  {title: "测试100元充值抵用", id: "pAtUNs6i23Taog8Cfwylkk7V4x90"},
  {title: "测试500元充值抵用", id: "pAtUNs7WTXGCHHUHsEVlI_X7rjIk"}
];

var index = Math.floor(Math.random() * cards.length);
var card = cards[index];

if(Date.now() < 146142720000) {
  $.alert('活动还没有开始，请耐心等待！');
  $('#iconTop').toggleClass('weui_icon_waiting weui_icon_safe_warn');
  $('#cardTitle').html("活动还没有开始....");
} else {
  $.showLoading("正在抢卡卷");
  setTimeout(function () {
    $.hideLoading();
    $('#iconTop').toggleClass('weui_icon_waiting weui_icon_success');
    $('#cardTitle').html("恭喜抢到："+card.title);
    $('#btnGetCard').removeClass('weui_btn_disabled');
  }, 2000);
}

wxjssdk.config({jsApiList: ['addCard']});

wx.ready(function () {
});

wx.error(function (res) {
  console.log(res);
});
  
$('#btnGetCard').on('click', function () {
  $.showLoading("正在领取奖券");
  $.ajax({
    url: "http://zsydz.aceweet.com:3000/api/wxaccesstokens/getcardext",
    data: {
      param: {
        card_id: card.id
      }
    },
    crossDomain: true,
    success: function (data) {
      $.hideLoading();
      wx.addCard({
        cardList:[{
          cardId: card.id,
          cardExt: JSON.stringify(data)
        }],
        success: function (res) {
          $('#btnGetCard').addClass('weui_btn_disabled');
        }
      });
    },
    error: function (res) {
      $.hideLoading();
      console.log(arguments);
    }
  });
});