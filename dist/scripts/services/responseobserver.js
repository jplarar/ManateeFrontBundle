'use strict';

/**
 * @ngdoc service
 * @name skillsmeisterApp.responseObserver
 * @description
 * # responseObserver
 * Factory in the skillsmeisterApp.
 */
angular.module('skillsmeisterApp')
  .factory('responseObserver', function responseObserver($q, $window, $location, SweetAlert, $log, $rootScope) {
    return {
        // optional method
        'request': function(config) {
          // do something on success
          return config;
        },
        // optional method
       'requestError': function(rejection) {
          // do something on error
          return $q.reject(rejection);
        },
        // optional method
        'response': function(response) {
          // do something on success
          return response;
        },
        // optional method
       'responseError': function(rejection) {
          $log.info('responseError');
          // do something on error
          // console.log(rejection);
          switch (rejection.status) {
            case 0:
              SweetAlert.swal('Error', 'Ocurrió un error, favor de contactar al administrador.', 'error');
              $log.info(rejection);
              // if($location.path == '/dashboard')
              //   $location.path('/login');    
              // else
              //   $location.path('/dashboard');
              $rootScope.isLoading = false;
            break;
            case 301:
              SweetAlert.swal('Error 301', 'Moved permanently.', 'error');
            break;
            case 401:
              SweetAlert.swal('Error 401', 'A simple error.', 'error');
            break;
            case 403:
              SweetAlert.swal('Error', 'You\'re not Authorized, please authenticate.', 'error');
              $location.path('/login');
              $rootScope.isLoading = false;
            break;
            case 404:
              SweetAlert.swal('Error', 'Not found.', 'error');
            break;
            case 500:
              SweetAlert.swal('Error', 'That page does not exist', 'error');
            break;
          }
          return $q.reject(rejection);
        }
    };
});