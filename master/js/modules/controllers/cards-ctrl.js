/**=========================================================
 * Module: cards-ctrl.js
 * Cards Controller
 =========================================================*/

App.controller('CardsController', function ($scope, Card, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'create_time DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        opt.where.title = {like: '%'+$scope.filter.text+'%'}
        opt.skip = 0;
      }
      Card.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Card.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})
