'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:LeaderboardCtrl
 * @description
 * # LeaderboardCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('LeaderboardCtrl', function ($scope, SweetAlert, $log, $rootScope, $window, appSharedService, $timeout) {
  	$scope.listings = function () {
	  	var promise = appSharedService.leaderboardListings();
	    promise.then(function(res) {
	    	var res = res.response;
	    	if(res.error != 0) {
	    		SweetAlert.swal('Lo sentimos', res.description, 'error');
	    		return;
	    	}
	    	$log.info(res.data[0]);
			_.each(res.data, function(object, index) {
				$log.info(_.result(_.findWhere($rootScope.categories, { 'categoryId': object.categoryId }), 'imageUrl'));
	    		object.categoryImage = _.result(_.findWhere($rootScope.categories, { 'categoryId': object.categoryId }), 'imageUrl');
	    	});
	    	$scope.courses = res.data;
	    });
	}
	$scope.topUsers = function () {
	  	var promise = appSharedService.leaderboardUsers();
	    promise.then(function(res) {
	    	var res = res.response;
	    	if(res.error != 0) {
	    		SweetAlert.swal('Lo sentimos', res.description, 'error');
	    		return;
	    	}
	    	$scope.users = res.data;
	    });
	}
    angular.element(document).ready(function () {
  		$timeout(function() {
  			$scope.listings();
  			$scope.topUsers();
  		}, 300);
  	});
  });
