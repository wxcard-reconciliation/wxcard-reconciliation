/**=========================================================
 * Module: dashboard-ctrl.js
 * Dashboard Controller
 =========================================================*/

App.controller('DashboardController', function ($scope, Cardevent) {
  
  $scope.statistic = {
    applied: 0,
    cliped: 0,
    activeClient: 0
  }
  
  $scope.stat = function () {
    var duration = {between: [moment().startOf('day').unix(), moment().endOf('day').unix()]}
    Cardevent.count({where:{"status": "got", CreateTime: duration}}, function (result) {
      $scope.statistic.applied = result.count;
    });
    
    Cardevent.count({where:{"status": "consumed", cancelTime: duration}}, function (result) {
      $scope.statistic.cliped = result.count;
    });
    
    Cardevent.count({where:{or:[{CreateTime: duration}, {cancelTime: duration}]}}, function (result) {
      $scope.statistic.activeClient = result.count;
    })
  }
  
  $scope.stat()
})
