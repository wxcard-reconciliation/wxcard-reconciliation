/**=========================================================
 * Module: wechatusers-ctrl.js
 * Wechatusers Controller
 =========================================================*/

App.controller('WechatusersController', function ($scope, Wxclient, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'subscribe_time DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        console.log($scope.filter.text);
        // var qs = {like: '%'+$scope.filter.text+'%'};
        var qs = {regex: $scope.filter.text};
        opt.where.or = [{nickname:qs}, {remark:qs}];
        opt.skip = 0;
      }
      Wxclient.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Wxclient.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})