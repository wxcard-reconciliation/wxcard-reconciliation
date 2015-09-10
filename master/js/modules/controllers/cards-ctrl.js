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
        // opt.where.title = {like: '%'+$scope.filter.text+'%'}
        var qs = {regex: $scope.filter.text};
        opt.where = {title: qs};
        opt.skip = 0;
      }
      Card.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Card.find({filter:opt}, $defer.resolve)
      })
    }
  })   
})

App.controller('CardeventsController', function ($scope, Cardevent, ngTableParams, ngDialog) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'CreateTime DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        // opt.where.id = {like: '%'+$scope.filter.text+'%'}
        var qs = {regex: $scope.filter.text};
        opt.where = {id: qs};
        opt.skip = 0;
      }
      Cardevent.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Cardevent.find({filter:opt}, function (results) {
          $defer.resolve(results);
          results.forEach(function (item) {
            if(item.receipt && item.receipt !== '') {
              item.receiptLoading = true;
              Cardevent.receiptUrl({receipt: item.receipt}, function (result) {
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
