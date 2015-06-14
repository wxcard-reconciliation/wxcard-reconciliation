/**=========================================================
 * Module: reconciliations-ctrl.js
 * Reconciliations Controller
 =========================================================*/

App.controller('ReconciliationsController', function ($scope, Reconciliation, ngTableParams) {
  
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
        opt.where.name = {like: $scope.filter.text}
      }
      Reconciliation.find({filter:opt}, function (result) {
        $scope.tableParams.total(result.count)
        $defer.resolve(result.data.users)
      })
    }
  })   
})

App.controller('ReconciliationController', function ($scope, Reconciliation, $state, toaster) {

  var accountId = $state.params.accountId || $scope.user.id
  // $scope.entity = Reconciliation.findById({id: accountId})
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      Reconciliation.prototype$updateAttributes($scope.entity.id, $scope.entity, function (entity) {
        toaster.pop('success', '更新成功', '已经更新帐号 '+entity.name)
        setTimeout(function () {
          $state.go('app.reconciliations')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '更新错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
  $scope.openeds = [false, false]
  $scope.open = function($event, index) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openeds[index] = true
    $scope.openeds[++index%2] = false
  };
  
  $scope.make = function () {
    
  }
  
  $scope.try = function () {
    
  }
})