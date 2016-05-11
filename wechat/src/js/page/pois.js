var wxjssdk = require('../wxjssdk');

function fetchPois(branch) {
  var filter = {limit: 10};
  if(branch && branch != '') filter.where = {or:[{branch_name:{regex: branch}}, {business_name: {regex: branch}}]};
  $.showLoading();
  $.ajax({
    url: "http://zsydz.aceweet.com:3000/api/pois",
    data: {
      filter: filter
    },
    crossDomain: true,
    success: function( data ) {
      $('#poiList').empty();
      $.hideLoading();
      data.forEach(function (poi) {
        var dom = '<div class="weui_cell" id="'+poi.poi_id+'"> \
                    <div class="weui_cell_bd weui_cell_primary"> \
                      <p>'+poi.branch_name+'</p> \
                    </div> \
                    <div class="weui_cell_ft"> '+poi.city+'\
                    </div> \
                  </div>';
        $('#poiList').append(dom);
        $('#'+poi.poi_id).click(function (e) {
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
wxjssdk.config({jsApiList: ['hideOptionMenu']});
wx.ready(function () {
  wx.hideOptionMenu();
});
