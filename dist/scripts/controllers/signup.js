'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('SignupCtrl', function ($scope, $log, SweetAlert, appSharedService, $rootScope, authenticationSvc, $window, $location) {
    $scope.registerUser = function() {
    	$scope.user.country = 'México';
    	$rootScope.isLoading = true;
    	var promise = appSharedService.newUser($scope.user);
    	promise.then(function(res){
	        var res = res.response;
	        if(res.error!==0) {
	            SweetAlert.swal('Error','Could not load data','error');
	        } else {
	        	$scope.login();
	        }
	    });
    }
    $scope.login = function() {
    	var promise = authenticationSvc.login($scope.user.email, $scope.user.password);
	    promise.then(function (res) {
	        $log.info(res);
	        var res = res.response;
	        if(res.error !== 0) {
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
