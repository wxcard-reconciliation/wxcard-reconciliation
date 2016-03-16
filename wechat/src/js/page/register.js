var wxjssdk = require('../wxjssdk');

var data = {job: '充值员'};
wxjssdk.config({jsApiList: ['hideOptionMenu', 'closeWindow']});
wx.ready(function () {
  wx.hideOptionMenu();
  wxjssdk.getUser(function (user) {
    wxjssdk.setCookie('wxuser', JSON.stringify(user));
    data.wxclient = user;
    data.picture = user.headimgurl;
    $('#nickname').html(user.nickname);
    $('#avatar').attr("src", user.headimgurl);
    $('#wxuserProfile').html(user.province+" "+user.city);
  });
});

var strPoi = wxjssdk.getCookie("selectedPoi");
if(strPoi) {
  data.poi = JSON.parse(strPoi);
  $('#poi').html(data.poi.city+" "+data.poi.branch_name);
}

$('select').change(function (e) {
  data.job = this.value;      
});

function validate() {
  var valid = true;
  $('input').each(function (index, dom) {
    if(valid) valid = dom.validity.valid;
    var inputSelector = $('input[name='+dom.name+']');
    if(!dom.validity.valid) {
      inputSelector.parent().parent().addClass('weui_cell_warn');
    } else {
      inputSelector.parent().parent().removeClass('weui_cell_warn');
      data[dom.name] = dom.value;
    }
  });
  if(valid) valid = !!data.wxclient;
  return valid;
}

$('#btnRegister').click(function () {
  if(validate()) {
    data.wxclient.username = data.username;
    data.username = data.phone;
    data.email = data.phone+"@petrojs.com";
    $.ajax({
      url: "http://zsydz.aceweet.com:3000/api/accounts",
      method: "POST",
      data: data,
      crossDomain: true,
      success: function (data) {
        $.alert("您已经成功注册", "成功", function () {
          wx.closeWindow();
        });
      },
      error: function (res) {
        var text = res.responseText;
        var msg = "注册失败";
        if(/User already exists/.test(text)) {
          msg = "手机号已经注册过账号！";
        }
        $.alert(msg, "失败");
        console.log(res);
      }
    });
  }
});