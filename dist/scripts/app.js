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
    $rootScope.categories = [{"categoryId":1,"name":"Académico","imageUrl":"academico.png","children":[{"categoryId":22,"name":"Matematicas","imageUrl":null},{"categoryId":23,"name":"Idiomas","imageUrl":null},{"categoryId":24,"name":"Programacion","imageUrl":null},{"categoryId":25,"name":"Fisica","imageUrl":null},{"categoryId":26,"name":"Ciencia","imageUrl":null},{"categoryId":27,"name":"Cultura","imageUrl":null},{"categoryId":28,"name":"Medicina","imageUrl":null},{"categoryId":29,"name":"Nuticion","imageUrl":null},{"categoryId":30,"name":"Otro","imageUrl":null}]},{"categoryId":2,"name":"Estilo de Vida","imageUrl":"estilo-de-vida.png","children":[{"categoryId":6,"name":"Cocina","imageUrl":null},{"categoryId":7,"name":"Baile","imageUrl":null},{"categoryId":8,"name":"Conducir","imageUrl":null},{"categoryId":9,"name":"Primeros auxilios","imageUrl":null},{"categoryId":10,"name":"Otros","imageUrl":null}]},{"categoryId":3,"name":"Deportes","imageUrl":"deportes.png","children":[{"categoryId":11,"name":"Futbol","imageUrl":null},{"categoryId":12,"name":"Basquetbol","imageUrl":null},{"categoryId":13,"name":"Americano","imageUrl":null},{"categoryId":14,"name":"Voleibol","imageUrl":null},{"categoryId":15,"name":"Natacion","imageUrl":null},{"categoryId":16,"name":"Gym","imageUrl":null},{"categoryId":17,"name":"Otros","imageUrl":null}]},{"categoryId":4,"name":"Música","imageUrl":"musica.png","children":[{"categoryId":18,"name":"Canto","imageUrl":null},{"categoryId":19,"name":"Instrumento","imageUrl":null},{"categoryId":20,"name":"Otro","imageUrl":null},{"categoryId":21,"name":"Teoria","imageUrl":null}]},{"categoryId":5,"name":"Profesiones","imageUrl":"profesiones.png","children":[{"categoryId":31,"name":"Carpinteria","imageUrl":null},{"categoryId":32,"name":"Plometia","imageUrl":null},{"categoryId":33,"name":"Albanileria","imageUrl":null},{"categoryId":34,"name":"Mecanica","imageUrl":null},{"categoryId":35,"name":"Electronica","imageUrl":null},{"categoryId":36,"name":"Otros","imageUrl":null}]}];
    authenticationSvc.init();
    // $rootScope.getCategories = function () {
    //   var categories = appSharedService.categories();
    //   categories.then(function(res) {
    //     var res = res.response;
    //     if(res.error != 0) {
    //       SweetAlert.swal('Error', res.description, 'warning');
    //     }
    //     console.log('categorias');
    //     console.log(JSON.stringify(res.data));
    //     $rootScope.categories = res.data;
    //   });
    // };
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
