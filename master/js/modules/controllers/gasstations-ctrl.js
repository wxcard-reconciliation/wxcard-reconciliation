/**=========================================================
 * Module: gasstations-ctrl.js
 * Gasstations Controller
 =========================================================*/

App.controller('GasstationsController', function ($scope, Company, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'add_time DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        var qs = {like: '%'+$scope.filter.text+'%'};
        opt.where.or = [{name:qs}, {shortname: qs}] 
      }
      Company.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Company.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})