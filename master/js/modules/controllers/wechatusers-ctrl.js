/**=========================================================
 * Module: wechatusers-ctrl.js
 * Wechatusers Controller
 =========================================================*/

App.controller('WechatusersController', function ($scope, Wxuser, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'id DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        var qs = {like: '%'+$scope.filter.text+'%'}
        opt.where.or = [{nickname:qs}, {remark:qs}];
      }
      Wxuser.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Wxuser.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})