/**=========================================================
 * Module: coupons-ctrl.js
 * CouponRecords Controller
 =========================================================*/

App.controller('CouponRecordsController', function ($scope, CouponRecord, ngTableParams, ngDialog) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'add_time DESC', include: ['coupon', 'wxuser', 'company']}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        opt.where.cancel_code = {like: '%'+$scope.filter.text+'%'}
      }
      CouponRecord.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        CouponRecord.find({filter:opt}, function (results) {
          $defer.resolve(results);
          results.forEach(function (item) {
            if(item.receipt && item.receipt !== '') {
              item.receiptLoading = true;
              CouponRecord.receiptUrl({receipt: item.receipt}, function (result) {
                item.receiptLoading = false;
                item.receipt_imageurl = result.url;
              })
            }
          })
        })
      })
    }
  })
  
  $scope.showReceipt = function (imageurl) {
    if(!imageurl) return;
    ngDialog.open({
      template: "<img src="+imageurl+" class='img-responsive'>",
      plain: true,
      className: 'ngdialog-theme-default'
    });    
  }   
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