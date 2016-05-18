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

App.controller('CardController', function ($scope, Card, $state, toaster, Poi, $q) {

  $scope.cities = ["南京", "无锡", "徐州", "常州", "苏州", "南通", "泰州", "扬州", "镇江", "淮安", "盐城", "连云港", "宿迁"];
  $scope.selectedPois = [];
  var cardId = $state.params.cardId;
  if(cardId) {
    Card.findById({id: cardId}, function (result) {
      $scope.entity = result;
      $scope.advanced_info = result.advanced_info;
      $scope.reduce_cost = result.reduce_cost;
      $scope.selectedPois = Poi.find({
        filter:{
          where: {poi_id: {inq: result.location_id_list.map(function (poi) {return poi+'';})}},
          order: "city ASC"
        }});
      $scope.begin_timestamp = new Date(result.date_info.begin_timestamp*1000);
      $scope.end_timestamp = new Date(result.date_info.end_timestamp*1000);
    });
  } else {
    var imgurl = "https://mmbiz.qlogo.cn/mmbiz/O1DymY4NpO8g6cYMtNXdeYPUT7eOUwnBUvdDNToOV2y4SiamGMreu85hn3oXiaWiaBeTJrY8BiadLGT3nvFmxiaficQg/0?wx_fmt=png";
    $scope.entity = {
      logo_url: imgurl,
      brand_name: "中国石油江苏好客E站",
      code_type: "CODE_TYPE_QRCODE",
      color: "Color010",
      get_limit: 1,
      // location_id_list: [],
      date_info:{
        type: "DATE_TYPE_FIX_TIME_RANGE"
      },
      description: "本卷为周末优惠活动兑奖凭证，请凭卷到指定加油站兑换奖品。",
      notice: "请向充值员出示卡卷",
      sku: {
        quantity: 20,
        total_quantity: 20
      },
      can_share: false,
      can_give_friend: true,
      create_time: Math.round(Date.now()/1000)
    };
    $scope.advanced_info = {
      "time_limit": [
        {
          "type": "MONDAY"
        },
        {
          "type": "TUESDAY"
        },
        {
          "type": "WEDNESDAY"
        },
        {
          "type": "THURSDAY"
        },
        {
          "type": "FRIDAY"
        },
        {
          "type": "SATURDAY"
        },
        {
          "type": "SUNDAY"
        }
      ],
      "text_image_list": [],
      "abstract": {
        "abstract": "周末油惠",
        "icon_url_list": [imgurl]
      }
    }
  }

  $scope.reduce_cost = 0;
  $scope.begin_timestamp = new Date();
  $scope.end_timestamp = new Date();
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      // $scope.entity.location_id_list = $scope.selectedPois.map(function (poi) {
      //   return parseInt(poi.poi_id);
      // });
      $scope.entity.location_id_list = [288654237,216148006,228214609,288646436,219550682,278556572,216022806,226790172,
        293303866,288779835,276379023,230056882,288582503,218744842,288700798,281048614,277130186,228275599,275720615,
        280969299,278607328,277249943,293304490,215442816,224599730,221882259,214037871,288679150,227857327,288721501,
        233600668,215472047,225993753,233590747,213938485,220195018,281135782,218657764,288791433,277221869,276729992,
        278409170,219700700,222892913,285605004,403610969,220853259,231460493,288763385,233451751,222652912,229020836,
        288612802,229588276,293312097,216464420,281048614,288700798,218744842,293312163,225088340,213755969,281791637,
        460688468];
      $scope.entity.date_info.begin_timestamp = moment($scope.begin_timestamp).startOf('day').unix();
      $scope.entity.date_info.end_timestamp = moment($scope.end_timestamp).endOf('day').unix();
      $scope.entity.update_time = Math.round(Date.now()/1000);
      var card = {
        card_type: 'GENERAL_COUPON'
      }
      if($scope.entity.id) {
        card.card_id = $scope.entity.id;
        card.general_coupon = {
          base_info: {
            location_id_list: $scope.entity.location_id_list
          }
        };
        Card.updateCard(card, function (entity) {
          toaster.pop('success', '更新成功', '已经更新卡卷 '+$scope.entity.title)
          setTimeout(function () {
            $state.go('app.cards')
          }, 2000)
        }, function (res) {
          toaster.pop('error', '更新错误', res.data.error.message)
        });
        Card.prototype$updateAttributes({id: $scope.entity.id}, {location_id_list: $scope.entity.location_id_list});
      } else {
        card.general_coupon = {
          base_info: $scope.entity,
          advanced_info: $scope.advanced_info,
          default_detail: '凭卷到指定加油站兑换奖品'
        }
        Card.createCard(card, function (entity) {
          toaster.pop('success', '创建成功', '已经创建卡卷 '+$scope.entity.title)
          setTimeout(function () {
            $state.go('app.cards')
          }, 2000)
        }, function (res) {
          toaster.pop('error', '创建错误', res.data.error.message)
        });
      }
    } else {
      return false;
    }
  };

  $scope.fetchPois = function (city, branch_name) {
    var q = $q.defer();
    $scope.loadingPois = true;
    var filter = {where:{poi_id: {nin: $scope.selectedPois.map(function (poi) {
      return poi.poi_id;
    })}}};
    if(city) filter.where.city = {regex: city};
    if(branch_name) filter.where.branch_name = {regex: branch_name};
    Poi.find({filter: filter}, function (results) {
      $scope.loadingPois = false;
      $scope.fetchedPois = results;
      q.resolve(results);
    })
    return q.promise;
  };

  $scope.addPoi = function (poi, index) {
    $scope.selectedPois.push(poi);
    $scope.fetchedPois.splice(index, 1);
  }

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

App.controller('CardStatisticController', function ($scope, Cardevent, ngTableParams, Campaignclient) {

  $scope.filter = {
    where: {
      CardId: {
        $in:[
          'pAtUNsyggXkmG15LTyoEPDGZWPrA',
          'pAtUNs941xXpR6s6FwV22ygbnZFk',
          'pAtUNswA_P0V5tDJKeKv0P7EqF5I',
          'pAtUNs1sa1uyTOpAgvflCDBT67wc',
          'pAtUNs33uwFIOrbw6BVy23yYBLZo',
          'pAtUNs9RpArHsBJNsMIOkKOcvxbo',
          'pAtUNs7xMlcsH77tFiZYJEPz-gH4',
          'pAtUNs7zY1vW_JDYW6jln-hWWYc0',
          'pAtUNsxoq4aEMV2shSjBMKeRHgsA'
        ]
      }
    }
  }

  $scope.tableParams = new ngTableParams({
    count: 100,
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
          consumed_card3: 0, donated_card3: 0, count_card3: 0,
          consumed_card4: 0, donated_card4: 0, count_card4: 0,
          consumed_card5: 0, donated_card5: 0, count_card5: 0,
          consumed_card6: 0, donated_card6: 0, count_card6: 0,
          consumed_card7: 0, donated_card7: 0, count_card7: 0,
          consumed_card8: 0, donated_card8: 0, count_card8: 0,
          count: 0
        };
        $scope.cityKeys = Object.keys($scope.summary);
        results.forEach(function (city) {
          $scope.cityKeys.forEach(function (key) {
            $scope.summary[key] += city[key];
          });
        });
      });
    }
  });

  $scope.tablePoi = new ngTableParams({
    count: 200,
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
          count_card3: 0,
          count_card4: 0,
          count_card5: 0,
          count_card6: 0,
          count_card7: 0,
          count_card8: 0,
          count: 0
        };
        results.forEach(function (poi) {
          Object.keys($scope.summaryPoi).forEach(function (key) {
            $scope.summaryPoi[key] += poi[key];
          });
        });
      });
    }
  });

  $scope.tableClient = new ngTableParams({
    count: 14,
    filter: $scope.filter
  }, {
    getData: function ($defer, params) {
      var opt = {}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.skip = 0;
      Campaignclient.statcity({filter: opt}, function (results) {
        $defer.resolve(results);
        $scope.summaryClient = {
          clientCount: 0,
          count: 0
        };
        results.forEach(function (poi) {
          $scope.summaryClient.clientCount += poi.clientCount;
          $scope.summaryClient.count += poi.count;
        });
      });
    }
  });
})
