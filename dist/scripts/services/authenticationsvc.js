'use strict';

/**
 * @ngdoc service
 * @name skillsmeisterApp.authenticationSvc
 * @description
 * # authenticationSvc
 * Factory in the skillsmeisterApp.
 */
angular.module('skillsmeisterApp')
  .factory('authenticationSvc', function ($http, $q, $window, $log, SweetAlert, $location, $rootScope) {
    var serverURL = 'http://api.skillsmeister.com/';
    var obj = {};
    obj.userInfo = {};
    obj.setUserInfo = function (userInfo) {
      obj.userInfo = userInfo;
      return obj.userInfo;
    };
    obj.getUserInfo = function () {
      return obj.userInfo;
    };
    obj.serverCall = function  (route, newData) {
      obj.userInfo = angular.fromJson($window.sessionStorage.userInfo);
      var authKey = (obj.userInfo == 'null' || obj.userInfo == null) ? '' : obj.userInfo.apiKey;
      var data = newData || {};
      var deferred = $q.defer();
      $http({
        method: 'POST',
        data: data,
        dataType: 'json',
        withCredentials: false,
        url: serverURL + route,
        headers: {
          'content-type': 'application/json',
          'x-authorization': authKey
        }
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };
    obj.login = function (_username, _password) {
      return obj.serverCall('api/login', {_username: _username, _password: _password});
    };
    obj.logout = function () {
      return obj.serverCall('api/logout');
    };
    obj.init = function () {
      // console.log('running');
      // $log.info('Initializaing the app');
      // $log.info('validating');
      if ($window.sessionStorage.userInfo && $window.sessionStorage.userInfo !== 'null' && $window.sessionStorage.userInfo !== null) {
        $rootScope.isLoading = true;
        var autoCall = obj.serverCall('api/validate');
        autoCall.then(function(response) {
          // $log.info(res);
          var res = response.response;
          // $log.info(res);
          if(res.error == 0) {
            $rootScope.userInfo = angular.fromJson($window.sessionStorage.userInfo);
            $rootScope.isLoggedIn = true;
            // $rootScope.getCategories();
            ($location.path() == '/login') ? $location.path('/leaderboard') : '';
            $rootScope.isLoading = false;
          } else {
            SweetAlert.swal('Un momento', 'Tu sesión expiró favor de iniciar sesión otra vez', 'error');
            $rootScope.isLoading = false;
          }
        });
      }
    };
    obj.init();
    return obj;
  });