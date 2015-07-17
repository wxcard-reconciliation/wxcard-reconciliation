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

App.controller('ReconciliationController', function ($scope, CouponRecord, $state, toaster, ChinaRegion, Company) {

  $scope.entities = []
  $scope.giftAmount = 0
  $scope.discountAmount = 0
  $scope.manualAmount = 0
  $scope.gasstation = null
  $scope.region = {city: null, district: null}
  ChinaRegion.provinces.some(function (province) {
    if(province.name === '江苏') {
      $scope.region.province = province;
      return true;
    } else {
      return false;
    }
  })
  
  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  $scope.openeds = [false, false]
  $scope.open = function($event, index) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openeds[index] = true
    $scope.openeds[++index%2] = false
  };
  $scope.reconciliateDate = moment().format('YYYY-MM-DD');
  
  $scope.try = function () {
    var filter = {
      where:{use_time:{between: [
        moment($scope.beginDate).unix(), 
        moment($scope.endDate+' 23:59:59').unix()
      ]}},
      include: ['coupon', 'company', 'wxuser']
    };
    if($scope.gasstation) {
      filter.where.company_id = $scope.gasstation.id;
    } else if($scope.region.district || $scope.region.city) {
      var ids = []
      $scope.gasstations.forEach(function (gs) {
        ids.push(gs.id)
      })
      filter.where.company_id = {inq: ids};
    }
    CouponRecord.find({filter: filter}, function (result) {
      $scope.entities = result
      $scope.giftAmount = 0
      $scope.discountAmount = 0
      $scope.entities.forEach(function (entity) {
        $scope.discountAmount += entity.coupon && entity.coupon.reduce_cost || 0;
        if(entity.coupon && entity.coupon.type === 2) $scope.giftAmount++;
      })
    })
  }
  
  $scope.$watch('region.district', function () {
    // console.log('regiion.district', $scope.region.district)
    if($scope.region.district) {
      Company.find({filter:{where:{
        city: {like: $scope.region.city.name+"%"}, 
        district: $scope.region.district.name
      }}}, function (result) {
        $scope.gasstations = result;
      });
    } else {
      $scope.gassstations = null;
      $scope.gassstation = null;
    }
  })
  
  $scope.$watch('region.city', function () {
    // console.log('regiion.city', $scope.region.city)
    if($scope.region.city) {
      Company.find({filter:{where:{city: {like: $scope.region.city.name+"%"}}}}, function (result) {
        $scope.gasstations = result;
      });
    } else {
      $scope.gassstations = null;
      $scope.gassstation = null;
      $scope.region.district = null;
    }
  })
})