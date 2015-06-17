/**=========================================================
 * Module: shares-ctrl.js
 * Shares Controller
 =========================================================*/

App.controller('SharesController', function ($scope, Share, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      Share.stat({filter:opt}, function (result) {
        $scope.tableParams.total(result.length);
        $defer.resolve(result);
      })
    }
  })   
})