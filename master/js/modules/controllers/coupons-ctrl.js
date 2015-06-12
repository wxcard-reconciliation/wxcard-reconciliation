/**=========================================================
 * Module: coupons-ctrl.js
 * CouponRecords Controller
 =========================================================*/

App.controller('CouponRecordsController', function ($scope, CouponRecord, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'add_time DESC', include: 'coupon', includeWechatuser: true}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        opt.where.name = {like: $scope.filter.text}
      }
      CouponRecord.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        CouponRecord.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})

App.controller('CouponRecordController', function ($scope, CouponRecord, $state, toaster) {

  var accountId = $state.params.accountId || $scope.user.id
  $scope.entity = CouponRecord.findById({id: accountId})
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      CouponRecord.prototype$updateAttributes($scope.entity.id, $scope.entity, function (entity) {
        toaster.pop('success', '更新成功', '已经更新帐号 '+entity.name)
        setTimeout(function () {
          $state.go('app.wechatusers')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '更新错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
})