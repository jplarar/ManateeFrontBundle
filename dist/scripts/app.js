'use strict';

/**
 * @ngdoc overview
 * @name skillsmeisterApp
 * @description
 * # skillsmeisterApp
 *
 * Main module of the application.
 */
angular
  .module('skillsmeisterApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'googlechart',
    'picardy.fontawesome',
    'ui.bootstrap',
    'angular-lodash',
    'oitozero.ngSweetAlert'
  ])
  .run(function ($log, SweetAlert, $rootScope, $timeout, $location, authenticationSvc, appSharedService, $window) {
    authenticationSvc.init();
    $rootScope.getCategories = function () {
      var categories = appSharedService.categories();
      categories.then(function(res) {
        var res = res.response;
        if(res.error != 0) {
          SweetAlert.swal('Error', res.description, 'warning');
        }
        $rootScope.categories = res.data;
      });
    };
    $rootScope.logout = function () {
      var promise = authenticationSvc.logout();
      promise.then(function(res) {
        // $log.info(res);
        var res = res.response;
        if(res.error === 0) {
          // $log.info('Succesfully logged out');
        $window.sessionStorage["userInfo"] = null;
        $rootScope.isLoggedIn = false;
        $location.path('/login');
        }
      });
    };
    $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
      $('li,div,a').removeClass('active');
      $timeout(function() {
        $('a[ng-href="#'+$location.$$path+'"]').addClass('active').parent().addClass('active');
      }, 200);
    });
    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj.authenticated === false) {
        $location.path("/login");
      }
    });
  })
  .config(function ($routeProvider, $httpProvider) {
    // useXDomain o
    // $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('responseObserver');
    
    var auth = function($q, authenticationSvc, $log, $rootScope) {
      var userInfo = authenticationSvc.getUserInfo();
      $rootScope.userInfo = userInfo;
      // $log.info($.isEmptyObject(userInfo));
      // $log.info('user');
      $log.info(userInfo);
      if (userInfo != "undefined" && !$.isEmptyObject(userInfo)) {
        $rootScope.isLoggedIn = true;
        return $q.when(userInfo);
      } else {
        $rootScope.isLoggedIn = false;
        return $q.reject({ authenticated: false });
      }
    };
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: auth
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardCtrl',
        resolve: auth
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardCtrl',
        resolve: auth
      })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl',
        resolve: auth
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/getintouch', {
        templateUrl: 'views/getintouch.html',
        controller: 'GetintouchCtrl'
      })
      .when('/course/:id', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        resolve: auth
      })
      .otherwise({
        redirectTo: '/'
      });
  });
