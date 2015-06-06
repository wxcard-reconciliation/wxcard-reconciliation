App.controller('UserBlockController', ['$scope', function($scope) {

  $scope.userBlockVisible = true;
  
  $scope.$on('toggleUserBlock', function(event, args) {

    $scope.userBlockVisible = ! $scope.userBlockVisible;

    $scope.user.picture = $scope.user.picture || 'app/img/user/02.jpg'
    $scope.user.name = $scope.user.name || "匿名用户"
    $scope.user.job = $scope.user.job || '未知身份用户'
  
  });

}]);