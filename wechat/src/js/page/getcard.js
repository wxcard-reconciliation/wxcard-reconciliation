var wxjssdk = require('../wxjssdk');

var cards = [
  // {title: "20元充值抵用券", id: "pAtUNsyggXkmG15LTyoEPDGZWPrA"},
  // {title: "30元充值抵用券", id: "pAtUNs941xXpR6s6FwV22ygbnZFk"},
  // {title: "40元充值抵用券", id: "pAtUNswA_P0V5tDJKeKv0P7EqF5I"},
  // {title: "50元充值抵用券", id: "pAtUNs1sa1uyTOpAgvflCDBT67wc"},
  // {title: "60元充值抵用券", id: "pAtUNs33uwFIOrbw6BVy23yYBLZo"},
  // {title: "70元充值抵用券", id: "pAtUNs9RpArHsBJNsMIOkKOcvxbo"},
  // {title: "100元充值抵用券", id: "pAtUNs7xMlcsH77tFiZYJEPz-gH4"},
  // {title: "200元充值抵用券", id: "pAtUNs7zY1vW_JDYW6jln-hWWYc0"},
  {title: "500元充值抵用券", id: "pAtUNs7WTXGCHHUHsEVlI_X7rjIk"}
];

var index = Math.floor(Math.random() * cards.length);
var card = cards[index];

// if(!wxjssdk.getCookie('gotcard')) {
// } else {
//   $.alert("您已领过卡卷了，感谢参与！");
//   $('#iconTop').toggleClass('weui_icon_waiting weui_icon_safe_warn');
//   $('#cardTitle').html("您已领过卡卷了，感谢参与！");
// }
if(Date.now() < 14614596) {
  $.alert('活动还没有开始，请耐心等待！');
  $('#iconTop').toggleClass('weui_icon_waiting weui_icon_safe_warn');
  $('#cardTitle').html("活动还没有开始....");
} else {
  $.showLoading("正在抢卡卷");
  setTimeout(function () {
    $.hideLoading();
    $('#iconTop').toggleClass('weui_icon_waiting weui_icon_success');
    $('#cardTitle').html("有机会领取："+card.title);
    $('#btnGetCard').removeClass('weui_btn_disabled');
  }, 2000);
}

wxjssdk.config({jsApiList: ['addCard']});

wx.ready(function () {
  wxjssdk.getOAuth(function (accesstoken) {
    $.ajax({
      url: "http://zsydz.aceweet.com:3000/api/campaignclients",
      method: "PUT",
      data: {
        campaignId: "56ee52c08f264bc6741baf02",
        wxclientId: accesstoken.openid
      },
      crossDomain: true,
      success: function( data ) {
      },
      error: function (res) {
        console.log(res);
      }
    });
  });
});

wx.error(function (res) {
  console.log(res);
});

$('#btnGetCard').on('click', function () {
  if($('#btnGetCard').hasClass('weui_btn_disabled')) return;
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
          wxjssdk.setCookie('gotcard', true);
        }
      });
    },
    error: function (res) {
      $.hideLoading();
      console.log(arguments);
    }
  });
});
