/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ['$scope', 'Account', '$state', '$rootScope', function($scope, Account, $state, $rootScope) {

  // bind here all data from the form
  $scope.account = {remember: true};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.login = function() {
    $scope.authMsg = '';

    if($scope.loginForm.$valid) {

      Account.login($scope.account, function (accessToken) {
        $rootScope.user = accessToken.user
        $state.go('app.dashboard');
      }, function (error) {
        $scope.authMsg = error.data.error.message
      })
    }
    else {
      // set as dirty if the user click directly to login so we show the validation messages
      $scope.loginForm.account_email.$dirty = true;
      $scope.loginForm.account_password.$dirty = true;
    }
  };

}]);
