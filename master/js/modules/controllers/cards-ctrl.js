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
      $scope.selectedPois = Poi.find({
        filter:{
          where: {poi_id: {inq: result.location_id_list.map(function (poi) {return poi+'';})}},
          order: "city ASC"
        }});
      $scope.begin_timestamp = new Date(result.date_info.begin_timestamp*1000);
      $scope.end_timestamp = new Date(result.date_info.end_timestamp*1000);
    });
  } else {
    $scope.entity = {
      logo_url: "http://mmbiz.qpic.cn/mmbiz/O1DymY4NpO88CjYk0XWw9VAW99RMibqchv2OVDOibPpmMu65H47usx4fjyRwvRaZwCccibCiccMgwPk9unibewSQfjw/0?wx_fmt=jpeg",
      brand_name: "中国石油江苏好客E站",
      code_type: "CODE_TYPE_QRCODE",
      color: "Color010",
      get_limit: 1,
      // location_id_list: [],
      date_info:{
        type: "DATE_TYPE_FIX_TIME_RANGE"
      },
      description: "满足以下条件之一，即可在指定加油站，由加油站充值员将电子充值券兑换为充值额充入加油卡：\r\n1. 您未办过昆仑加油卡，新办理昆仑个人加油卡并首次充值2000元（含）以上。\r\n2. 您已办理昆仑个人加油卡，但连续3个月以上未充值的，持原卡单次充2000元（含）以上的。\r\n3. 您已办理昆仑个人加油卡，2月份有一笔充值高于1000元，本次充值超过2月最高值500元及以上。举例：您上月最高充值1000元，本次充值达到1500元（高于上月最高充值额500元）即可。\r\n\r\n特别说明：\r\n1. 每日电子充值券投放数量有限，抢完为止。电子充值券有效期截至4月1日，4月1日之前未完成充值额兑换的，视为弃权，充值券失效。\r\n2. 充值券可与其他促销优惠同时使用。",
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
        "abstract": "踏青红包",
        "icon_url_list": [
          "http://mmbiz.qpic.cn/mmbiz/O1DymY4NpO9RFpM2RwHZ4pyia8tqY9c37ibEVEgibn7PU1vFaC66cuE8iaQlZOPmSziaqxp6Q8Euic773PZWm0K8g6qA/0?wx_fmt=jpeg"
        ]
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
      $scope.entity.location_id_list = $scope.selectedPois.map(function (poi) {
        return parseInt(poi.poi_id);
      });
      $scope.entity.date_info.begin_timestamp = moment($scope.begin_timestamp).startOf('day').unix();
      $scope.entity.date_info.end_timestamp = moment($scope.end_timestamp).endOf('day').unix();
      $scope.entity.update_time = Math.round(Date.now()/1000);
      var card = {
        card_type: 'CASH',
        cash: {
          base_info: $scope.entity,
          advanced_info: $scope.advanced_info,
          least_cost: 0,
          reduce_cost: $scope.reduce_cost*100
        }
      }
      Card.createCard(card, function (entity) {
        toaster.pop('success', '创建成功', '已经创建卡卷 '+$scope.entity.title)
        setTimeout(function () {
          $state.go('app.cards')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '创建错误', res.data.error.message)
      })
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
