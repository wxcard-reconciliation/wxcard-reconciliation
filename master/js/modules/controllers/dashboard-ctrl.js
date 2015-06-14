/**=========================================================
 * Module: dashboard-ctrl.js
 * Dashboard Controller
 =========================================================*/

App.controller('DashboardController', function ($scope, CouponRecord) {
  
  $scope.statistic = {
    applied: 0,
    cliped: 0,
    activeClient: 0
  }
  
  $scope.stat = function () {
    CouponRecord.count({}, function (result) {
      console.log(result)
      $scope.statistic.applied = result.count;
    });
    
    CouponRecord.count({where:{is_use: 1}}, function (result) {
      $scope.statistic.cliped = result.count;
    })
  }
  
  $scope.stat()
})
