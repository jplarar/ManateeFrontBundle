'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('LoginCtrl', function ($scope, $log, SweetAlert, appSharedService, $rootScope, authenticationSvc, $window, $location) {
    $scope.login = function() {
    	$rootScope.isLoading = true;
    	var promise = authenticationSvc.login($scope.user.email, $scope.user.password);
	    promise.then(function (res) {
	        $log.info(res);
	        var res = res.response;
	        if(res.error !== 0) {
	        	$rootScope.isLoading = false;
	        	SweetAlert.swal('Error '+res.error, res.description, 'error');
	        	return;
	        } else {
	        	var userInfo = {username: $scope.user.email, apiKey: res.data[0].apiKey};
	        	authenticationSvc.setUserInfo(userInfo);
	        	$rootScope.userInfo = userInfo;
	        	$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
	        	$rootScope.isLoggedIn = true;
        		$location.path("/leaderboard");
        		$rootScope.isLoading = false;
	        }
	    });
    }
  });
