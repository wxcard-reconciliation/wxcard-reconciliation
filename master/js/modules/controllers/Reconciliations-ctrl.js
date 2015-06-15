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

App.controller('ReconciliationController', function ($scope, CouponRecord, $state, toaster) {

  // var accountId = $state.params.accountId || $scope.user.id
  // $scope.entity = Reconciliation.findById({id: accountId})
  $scope.entities = []
  $scope.discountAmount = 0
  
  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
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
    $scope.reconciliateDate = moment().format('YYYY-MM-DD')
    var filter = {
      where:{use_time:{between: [
        moment($scope.beginDate).unix(), 
        moment($scope.endDate+' 23:59:59').unix()
      ]}},
      includeWechatuser: true,
      include: ['coupon', 'company']
    };
    CouponRecord.find({filter: filter}, function (result) {
      $scope.entities = result
      $scope.discountAmount = 0
      $scope.entities.forEach(function (entity) {
        $scope.discountAmount += entity.coupon && entity.coupon.reduce_cost || 0;
      })
    })
  }
})