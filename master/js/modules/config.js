/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // defaults to dashboard
  $urlRouterProvider.otherwise('/page/login');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
    })
    .state('app.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        templateUrl: helper.basepath('dashboard.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'moment'),
        controller: 'DashboardController'
    })
    .state('app.dashboard_v2', {
        url: '/dashboard_v2',
        title: 'Dashboard v2',
        templateUrl: helper.basepath('dashboard_v2.html'),
        controller: ["$rootScope", function($rootScope) { $rootScope.app.layout.isCollapsed = true; }],
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('app.dashboard_v3', {
        url: '/dashboard_v3',
        title: 'Dashboard v3',
        templateUrl: helper.basepath('dashboard_v3.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'vector-map', 'vector-map-maps')
    })
    .state('app.widgets', {
        url: '/widgets',
        title: 'Widgets',
        templateUrl: helper.basepath('widgets.html'),
        resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
    })
    .state('app.buttons', {
        url: '/buttons',
        title: 'Buttons',
        templateUrl: helper.basepath('buttons.html')
    })
    .state('app.colors', {
        url: '/colors',
        title: 'Colors',
        templateUrl: helper.basepath('colors.html')
    })
    .state('app.localization', {
        url: '/localization',
        title: 'Localization',
        templateUrl: helper.basepath('localization.html')
    })
    .state('app.infinite-scroll', {
        url: '/infinite-scroll',
        title: 'Infinite Scroll',
        templateUrl: helper.basepath('infinite-scroll.html'),
        resolve: helper.resolveFor('infinite-scroll')
    })
    .state('app.navtree', {
        url: '/navtree',
        title: 'Nav Tree',
        templateUrl: helper.basepath('nav-tree.html'),
        resolve: helper.resolveFor('angularBootstrapNavTree')
    })
    .state('app.nestable', {
        url: '/nestable',
        title: 'Nestable',
        templateUrl: helper.basepath('nestable.html'),
        resolve: helper.resolveFor('nestable')
    })
    .state('app.sortable', {
        url: '/sortable',
        title: 'Sortable',
        templateUrl: helper.basepath('sortable.html'),
        resolve: helper.resolveFor('htmlSortable')
    })
    .state('app.notifications', {
        url: '/notifications',
        title: 'Notifications',
        templateUrl: helper.basepath('notifications.html'),
        controller: 'NotificationController'
    })
    .state('app.carousel', {
        url: '/carousel',
        title: 'Carousel',
        templateUrl: helper.basepath('carousel.html'),
        resolve: helper.resolveFor('angular-carousel')
    })
    .state('app.ngdialog', {
        url: '/ngdialog',
        title: 'ngDialog',
        templateUrl: helper.basepath('ngdialog.html'),
        resolve: angular.extend(helper.resolveFor('ngDialog'),{
          tpl: function() { return { path: helper.basepath('ngdialog-template.html') }; }
        }),
        controller: 'DialogIntroCtrl'
    })
    .state('app.interaction', {
        url: '/interaction',
        title: 'Interaction',
        templateUrl: helper.basepath('interaction.html')
    })
    .state('app.spinners', {
        url: '/spinners',
        title: 'Spinners',
        templateUrl: helper.basepath('spinners.html'),
        resolve: helper.resolveFor('loaders.css', 'spinkit')
    })
    .state('app.animations', {
        url: '/animations',
        title: 'Animations',
        templateUrl: helper.basepath('animations.html')
    })
    .state('app.dropdown-animations', {
        url: '/dropdown-animations',
        title: 'Dropdown Animations',
        templateUrl: helper.basepath('dropdown-animations.html')
    })
    .state('app.panels', {
        url: '/panels',
        title: 'Panels',
        templateUrl: helper.basepath('panels.html')
    })
    .state('app.portlets', {
        url: '/portlets',
        title: 'Portlets',
        templateUrl: helper.basepath('portlets.html'),
        resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets')
    })
    .state('app.grid', {
        url: '/grid',
        title: 'Grid',
        templateUrl: helper.basepath('grid.html')
    })
    .state('app.grid-masonry', {
        url: '/grid-masonry',
        title: 'Grid Masonry',
        templateUrl: helper.basepath('grid-masonry.html')
    })
    .state('app.typo', {
        url: '/typo',
        title: 'Typo',
        templateUrl: helper.basepath('typo.html')
    })
    .state('app.icons-font', {
        url: '/icons-font',
        title: 'Icons Font',
        templateUrl: helper.basepath('icons-font.html')
    })
    .state('app.icons-weather', {
        url: '/icons-weather',
        title: 'Icons Weather',
        templateUrl: helper.basepath('icons-weather.html')
    })
    .state('app.form-standard', {
        url: '/form-standard',
        title: 'Form Standard',
        templateUrl: helper.basepath('form-standard.html')
    })
    .state('app.form-extended', {
        url: '/form-extended',
        title: 'Form Extended',
        templateUrl: helper.basepath('form-extended.html'),
        resolve: helper.resolveFor('codemirror', 'moment', 'taginput','inputmask','localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular', 'textAngularSetup')
    })
    .state('app.form-validation', {
        url: '/form-validation',
        title: 'Form Validation',
        templateUrl: helper.basepath('form-validation.html'),
        resolve: helper.resolveFor('ui.select', 'taginput','inputmask','localytics.directives')
    })
    .state('app.form-parsley', {
        url: '/form-parsley',
        title: 'Form Validation - Parsley',
        templateUrl: helper.basepath('form-parsley.html'),
        resolve: helper.resolveFor('parsley')
    })
    .state('app.form-wizard', {
        url: '/form-wizard',
        title: 'Form Wizard',
        templateUrl: helper.basepath('form-wizard.html'),
        resolve: helper.resolveFor('parsley')
    })
    .state('app.form-upload', {
        url: '/form-upload',
        title: 'Form upload',
        templateUrl: helper.basepath('form-upload.html'),
        resolve: helper.resolveFor('angularFileUpload', 'filestyle')
    })
    .state('app.form-xeditable', {
        url: '/form-xeditable',
        templateUrl: helper.basepath('form-xeditable.html'),
        resolve: helper.resolveFor('xeditable')
    })
    .state('app.form-imagecrop', {
        url: '/form-imagecrop',
        templateUrl: helper.basepath('form-imagecrop.html'),
        resolve: helper.resolveFor('ngImgCrop', 'filestyle')
    })
    .state('app.form-uiselect', {
        url: '/form-uiselect',
        templateUrl: helper.basepath('form-uiselect.html'),
        controller: 'uiSelectController',
        resolve: helper.resolveFor('ui.select')
    })
    .state('app.chart-flot', {
        url: '/chart-flot',
        title: 'Chart Flot',
        templateUrl: helper.basepath('chart-flot.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('app.chart-radial', {
        url: '/chart-radial',
        title: 'Chart Radial',
        templateUrl: helper.basepath('chart-radial.html'),
        resolve: helper.resolveFor('classyloader')
    })
    .state('app.chart-js', {
        url: '/chart-js',
        title: 'Chart JS',
        templateUrl: helper.basepath('chart-js.html'),
        resolve: helper.resolveFor('chartjs')
    })
    .state('app.chart-rickshaw', {
        url: '/chart-rickshaw',
        title: 'Chart Rickshaw',
        templateUrl: helper.basepath('chart-rickshaw.html'),
        resolve: helper.resolveFor('angular-rickshaw')
    })
    .state('app.chart-morris', {
        url: '/chart-morris',
        title: 'Chart Morris',
        templateUrl: helper.basepath('chart-morris.html'),
        resolve: helper.resolveFor('morris')
    })
    .state('app.chart-chartist', {
        url: '/chart-chartist',
        title: 'Chart Chartist',
        templateUrl: helper.basepath('chart-chartist.html'),
        resolve: helper.resolveFor('angular-chartist')
    })    
    .state('app.table-standard', {
        url: '/table-standard',
        title: 'Table Standard',
        templateUrl: helper.basepath('table-standard.html')
    })
    .state('app.table-extended', {
        url: '/table-extended',
        title: 'Table Extended',
        templateUrl: helper.basepath('table-extended.html')
    })
    .state('app.table-datatable', {
        url: '/table-datatable',
        title: 'Table Datatable',
        templateUrl: helper.basepath('table-datatable.html'),
        resolve: helper.resolveFor('datatables', 'datatables-pugins')
    })
    .state('app.table-xeditable', {
        url: '/table-xeditable',
        templateUrl: helper.basepath('table-xeditable.html'),
        resolve: helper.resolveFor('xeditable')
    })
    .state('app.table-ngtable', {
        url: '/table-ngtable',
        templateUrl: helper.basepath('table-ngtable.html'),
        resolve: helper.resolveFor('ngTable', 'ngTableExport')
    })
    .state('app.table-nggrid', {
        url: '/table-nggrid',
        templateUrl: helper.basepath('table-ng-grid.html'),
        resolve: helper.resolveFor('ngGrid')
    })
    .state('app.table-uigrid', {
        url: '/table-uigrid',
        templateUrl: helper.basepath('table-uigrid.html'),
        resolve: helper.resolveFor('ui.grid')
    })
    .state('app.timeline', {
        url: '/timeline',
        title: 'Timeline',
        templateUrl: helper.basepath('timeline.html')
    })
    .state('app.calendar', {
        url: '/calendar',
        title: 'Calendar',
        templateUrl: helper.basepath('calendar.html'),
        resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets', 'moment', 'fullcalendar')
    })
    .state('app.invoice', {
        url: '/invoice',
        title: 'Invoice',
        templateUrl: helper.basepath('invoice.html')
    })
    .state('app.search', {
        url: '/search',
        title: 'Search',
        templateUrl: helper.basepath('search.html'),
        resolve: helper.resolveFor('moment', 'localytics.directives', 'ui.bootstrap-slider')
    })
    .state('app.todo', {
        url: '/todo',
        title: 'Todo List',
        templateUrl: helper.basepath('todo.html'),
        controller: 'TodoController'
    })
    .state('app.profile', {
        url: '/profile',
        title: 'Profile',
        templateUrl: helper.basepath('profile.html'),
        resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
    })
    .state('app.template', {
        url: '/template',
        title: 'Blank Template',
        templateUrl: helper.basepath('template.html')
    })
    .state('app.documentation', {
        url: '/documentation',
        title: 'Documentation',
        templateUrl: helper.basepath('documentation.html'),
        resolve: helper.resolveFor('flatdoc')
    })
    .state('app.reconciliations', {
        url: '/reconciliations',
        title: 'Reconciliations',
        templateUrl: helper.basepath('reconciliations.html'),
        resolve: helper.resolveFor('angularjs-region', 'moment', 'ngDialog'),
        controller: 'ReconciliationsController'
    })
    .state('app.reconciliation', {
        url: '/reconciliations/:reconciliationId',
        title: 'Reconciliation Statement',
        templateUrl: helper.basepath('reconciliation.html'),
        resolve: helper.resolveFor('angularjs-region', 'moment', 'ngDialog'),
        controller: 'ReconciliationController'
    })
    .state('app.card-events', {
        url: '/card-events',
        title: 'Card Events',
        templateUrl: helper.basepath('card-events.html'),
        resolve: helper.resolveFor('ngTable', 'moment', 'ngDialog'),
        controller: 'CardeventsController'
    })
    .state('app.coupon-records', {
        url: '/coupon-records',
        title: 'Coupon Records',
        templateUrl: helper.basepath('coupon-records.html'),
        resolve: helper.resolveFor('ngTable', 'moment', 'ngDialog'),
        controller: 'CouponRecordsController'
    })
    .state('app.coupon-record', {
        url: '/coupon-records/:recordId',
        title: 'Coupon Record Detail',
        templateUrl: helper.basepath('coupon-record.html'),
        resolve: helper.resolveFor('ngTable', 'moment'),
        controller: 'CouponRecordController'
    })
    .state('app.cards', {
        url: '/cards',
        title: 'Cards',
        templateUrl: helper.basepath('cards.html'),
        resolve: helper.resolveFor('ngTable', 'moment', 'ngDialog'),
        controller: 'CardsController'
    })
    .state('app.shares', {
        url: '/shares',
        title: 'Share statistic',
        templateUrl: helper.basepath('shares.html'),
        resolve: helper.resolveFor('ngTable', 'moment'),
        controller: 'SharesController'
    })
    .state('app.wechatusers', {
        url: '/wechatusers',
        title: 'Wechatusers List',
        templateUrl: helper.basepath('wechatusers.html'),
        resolve: helper.resolveFor('ngTable', 'moment'),
        controller: 'WechatusersController'
    })
    .state('app.gasstations', {
        url: '/gasstations',
        title: 'Gasstations List',
        templateUrl: helper.basepath('gasstations.html'),
        resolve: helper.resolveFor('ngTable', 'moment'),
        controller: 'GasstationsController'
    })
    .state('app.myaccount', {
        url: '/accounts/:accountId',
        title: 'My Account',
        templateUrl: helper.basepath('account.html')
    })
    .state('app.accounts', {
        url: '/accounts',
        title: 'Accounts List',
        templateUrl: helper.basepath('accounts.html'),
        resolve: helper.resolveFor('ngTable', 'moment'),
        controller: 'AccountsController'
    })
    .state('app.accounts-add', {
        url: '/accounts-add',
        title: 'Accounts Add',
        templateUrl: helper.basepath('accounts-add.html')
    })
    .state('app.account', {
        url: '/accounts/:accountId',
        title: 'Account Detail',
        templateUrl: helper.basepath('account.html')
    })
    // Mailbox
    // ----------------------------------- 
    .state('app.mailbox', {
        url: '/mailbox',
        title: 'Mailbox',
        abstract: true,
        templateUrl: helper.basepath('mailbox.html'),
        controller: 'MailboxController'
    })
    .state('app.mailbox.folder', {
        url: '/folder/:folder',
        title: 'Mailbox',
        templateUrl: helper.basepath('mailbox-inbox.html')
    })
    .state('app.mailbox.view', {
        url : "/{mid:[0-9]{1,4}}",
        title: 'View mail',
        templateUrl: helper.basepath('mailbox-view.html'),
        resolve: helper.resolveFor('ngWig')
    })
    .state('app.mailbox.compose', {
        url: '/compose',
        title: 'Mailbox',
        templateUrl: helper.basepath('mailbox-compose.html'),
        resolve: helper.resolveFor('ngWig')
    })
    // 
    // Single Page Routes
    // ----------------------------------- 
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html'
    })
    .state('page.register', {
        url: '/register',
        title: "Register",
        templateUrl: 'app/pages/register.html'
    })
    .state('page.recover', {
        url: '/recover',
        title: "Recover",
        templateUrl: 'app/pages/recover.html'
    })
    .state('page.lock', {
        url: '/lock',
        title: "Lock",
        templateUrl: 'app/pages/lock.html'
    })
    .state('page.404', {
        url: '/404',
        title: "Not Found",
        templateUrl: 'app/pages/404.html'
    })
    // 
    // Horizontal layout
    // ----------------------------------- 
    .state('app-h', {
        url: '/app-h',
        abstract: true,
        templateUrl: helper.basepath( 'app-h.html' ),
        controller: 'AppController',
        resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
    })
    .state('app-h.dashboard_v2', {
        url: '/dashboard_v2',
        title: 'Dashboard v2',
        templateUrl: helper.basepath('dashboard_v2.html'),
        controller: ["$rootScope", "$scope", function($rootScope, $scope) {
            $rootScope.app.layout.horizontal = true;
            $scope.$on('$destroy', function(){
                $rootScope.app.layout.horizontal = false;
            });
        }],
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('zh_CN');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {

  tmhDynamicLocaleProvider.defaultLocale('zh');
  tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

    // tmhDynamicLocaleProvider.useStorage('$cookieStore');

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';

}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
// .constant('urlBase', "http://0.0.0.0:3000/api")
.constant('urlBase', "http://120.26.66.200:3000/api")
.config(function(LoopBackResourceProvider, urlBase) {
    // LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    LoopBackResourceProvider.setUrlBase(urlBase);
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
    return {
      responseError: function(rejection) {
        if (rejection.status == 401) {
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.path('/page/login')
        }
        return $q.reject(rejection);
      }
    };
  });
})
;
