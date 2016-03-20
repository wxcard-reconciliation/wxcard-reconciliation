/**=========================================================
 * Module: campaigns-ctrl.js
 * Campaigns Controller
 =========================================================*/

App.controller('CampaignsController', function ($scope, Campaign, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        var qs = {regex: $scope.filter.text};
        opt.where = {'name': qs};
        opt.skip = 0;
      }
      Campaign.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Campaign.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})

App.controller('CampaignController', function ($scope, Campaign, $state, toaster, Poi, $q) {

  $scope.cities = ["南京", "无锡", "徐州", "常州", "苏州", "南通", "泰州", "扬州", "镇江", "淮安", "盐城", "连云港", "宿迁"];
  $scope.selectedPois = [];
  var campaignId = $state.params.campaignId;
  if(campaignId) {
    Campaign.findById({id: campaignId}, function (result) {
      $scope.entity = result;
      $scope.selectedPois = Poi.find({filter:{where: {id: {inq: result.location_id_list}}}});
    });
  } else {
    $scope.entity = {date_info:{}};
  }
  
  $scope.begin_timestamp = new Date();
  $scope.end_timestamp = new Date();
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      $scope.entity.location_id_list = $scope.selectedPois.map(function (poi) {
        return poi.id;
      });
      $scope.entity.date_info.begin_timestamp = Math.round($scope.begin_timestamp.getTime()/1000);
      $scope.entity.date_info.end_timestamp = Math.round($scope.end_timestamp.getTime()/1000);
      Campaign.upsert($scope.entity, function (entity) {
        toaster.pop('success', '更新成功', '已经更新活动 '+entity.title)
        setTimeout(function () {
          $state.go('app.campaigns')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '更新错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
  $scope.fetchPois = function (val) {
    var q = $q.defer();
    $scope.loadingPois = true;
    Poi.find({filter:{where:{"city":{regex: val}}}}, function (results) {
      $scope.loadingPois = false;
      $scope.fetchedPois = results;
      q.resolve(results);
    })
    return q.promise;
  };
  
  $scope.addPoi = function (poi, index) {
    $scope.selectedPois.push(poi);
    $scope.fetchedPois.splice(index, 1);
  }

})