/**=========================================================
 * Module: accounts-ctrl.js
 * Accounts Controller
 =========================================================*/

App.controller('AccountsController', function ($scope, Account, ngTableParams) {
  
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
      Account.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Account.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})

App.controller('AccountsAddController', function ($scope, Account, $state, toaster, Company, $q, Wxuser) {

  $scope.entity = {job: '加油站长'}
  $scope.company = null
  $scope.wechatUser = null
  
  $scope.$watch('wechatUser', function (newVal, oldVal) {
    if(newVal instanceof Wxuser) {
      $scope.entity.picture = newVal.headimgurl;
      $scope.entity.name = newVal.remark || newVal.nickname;
      $scope.entity.openId =  $scope.wechatUser.id
    }
  });
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      $scope.entity.email = $scope.entity.phone+"@petrojs.cn"
      $scope.entity.username = $scope.entity.phone
      $scope.entity.companyId = $scope.company && $scope.company.id || null
      Account.create($scope.entity, function (entity) {
        toaster.pop('success', '新增成功', '已经添加帐号 '+entity.name)
        setTimeout(function () {
          $state.go('app.accounts')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '新增错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
  $scope.fetchCompanies = function (val) {
    var q = $q.defer();
    $scope.loadingCompanies = true;
    Company.find({filter:{where:{"name":{like: '%'+val+'%'}}}}, function (results) {
      $scope.loadingCompanies = false;
      q.resolve(results);
    })
    return q.promise;
  };

  $scope.fetchWechatUsers = function (val) {
    var q = $q.defer();
    $scope.loadingWechatUsers = true;
    Wxuser.find({filter:{where:{"nickname":{like: '%'+val+'%'}}}}, function (results) {
      $scope.loadingWechatUsers = false;
      q.resolve(results);
    })
    return q.promise;
  };
})

App.controller('AccountController', function ($scope, Account, $state, toaster) {

  var accountId = $state.params.accountId || $scope.user.id
  Account.findById({id: accountId, filter:{include:['company']}}, function (result) {
    $scope.entity = result
  })
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      Account.prototype$updateAttributes($scope.entity.id, $scope.entity, function (entity) {
        toaster.pop('success', '更新成功', '已经更新帐号 '+entity.name)
        setTimeout(function () {
          $state.go('app.accounts')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '更新错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
})