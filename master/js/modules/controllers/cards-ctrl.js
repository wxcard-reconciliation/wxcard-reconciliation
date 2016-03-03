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

App.controller('CardStatisticController', function ($scope, Cardevent, ngTableParams) {
  
  $scope.filter = {
    where: {
      CardId: {
        $in:[
          'pAtUNs2kaIzJjl6ZXUO-fMP_KabQ',
          'pAtUNs5y63pZFOCoOD6V8pg4bMQk',
          'pAtUNsyFRkWSW8D92mnqKyvNJFVA'
        ]
      }
    }
  }
  
  $scope.tableParams = new ngTableParams({
    count: 25,
    filter: $scope.filter
  }, {
    getData: function($defer, params) {
      var opt = {}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.where) {
        opt.where = $scope.filter.where;
        opt.skip = 0;
      }
      Cardevent.statcity({filter: opt}, function (results) {
        $defer.resolve(results);
        $scope.summary = {
          consumed_card0: 0, donated_card0: 0, count_card0: 0,
          consumed_card1: 0, donated_card1: 0, count_card1: 0,
          consumed_card2: 0, donated_card2: 0, count_card2: 0,
          count: 0
        };
        results.forEach(function (city) {
          $scope.summary.consumed_card0 += city.consumed_card0;
          $scope.summary.donated_card0 += city.donated_card0;
          $scope.summary.count_card0 += city.count_card0;
          $scope.summary.consumed_card1 += city.consumed_card1;
          $scope.summary.donated_card1 += city.donated_card1;
          $scope.summary.count_card1 += city.count_card1;
          $scope.summary.consumed_card2 += city.consumed_card2;
          $scope.summary.donated_card2 += city.donated_card2;
          $scope.summary.count_card2 += city.count_card2;
          $scope.summary.count += city.count;
        });
      });
    }
  });
  
  $scope.tablePoi = new ngTableParams({
    count: 50,
    filter: $scope.filter
  }, {
    getData: function ($defer, params) {
      var opt = {}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.where) {
        opt.where = $scope.filter.where;
        opt.skip = 0;
      }
      Cardevent.statpoi({filter: opt}, function (results) {
        $defer.resolve(results);
        $scope.summaryPoi = {
          count_card0: 0,
          count_card1: 0,
          count_card2: 0,
          count: 0
        };
        results.forEach(function (poi) {
          $scope.summaryPoi.count_card0 += poi.count_card0;
          $scope.summaryPoi.count_card1 += poi.count_card1;
          $scope.summaryPoi.count_card2 += poi.count_card2;
          $scope.summaryPoi.count += poi.count;
        });
      });
    }
  });
  
})
