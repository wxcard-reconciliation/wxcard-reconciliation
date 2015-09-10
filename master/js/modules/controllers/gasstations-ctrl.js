/**=========================================================
 * Module: gasstations-ctrl.js
 * Gasstations Controller
 =========================================================*/

App.controller('GasstationsController', function ($scope, Poi, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        // var qs = {like: '%'+$scope.filter.text+'%'};
        var qs = {regex: $scope.filter.text};
        opt.where = {branch_name:qs};
        opt.skip = 0;
      }
      Poi.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Poi.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})