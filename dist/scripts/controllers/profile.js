'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('ProfileCtrl', function ($scope, $log, $modal, SweetAlert, $location, $window, appSharedService, $rootScope) {
  	$scope.user = {};
  	$scope.user.courses = [];
  	var promise = appSharedService.getUser();
  	promise.then(function(res) {
  		var res = res.response;
		if(res.error!==0) {
			SweetAlert.swal('Hubo un error', res.description, 'error');
			return;
		}
		$log.info(res.data[0])
		$scope.user = res.data[0];
		$scope.getCourses();
  	});
  	$scope.getRandomSpan = function() {
		return Math.floor((Math.random()*3));
	}
	$scope.colors = ['red','yellow','blue'];
	$scope.getCourses = function () {
	  	var getCourses = appSharedService.getUserListings();
	  	getCourses.then(function(res) {
	  		var res = res.response;
			if(res.error!==0) {
				SweetAlert.swal('Hubo un error', res.description, 'error');
				return;
			}
			$log.info(res);
			console.log(res.data.length);
			if(res.data.length == 0) {
				$scope.noCourses = true;
			} else {
				_.each(res.data, function(obj, idx) {
					obj.color = $scope.colors[$scope.getRandomSpan()];
				});
				$scope.user.courses = res.data;
			}
			// $scope.user = res.data[0];
	  	});
  	}

  	$scope.editCourse = function(size, index) {
  		var modalInstance = $modal.open({
	      templateUrl: 'views/editmodal.html',
	      controller: 'EditmodalCtrl',
	      size: size,
	      resolve: {
	        item: function () {
	          return $scope.user.courses[index];
	        }
	      },
	      backdrop: 'static',
	      keyboard: false
	    });
	    modalInstance.result.then(function (item) {
			$rootScope.isLoading = true;
			$log.info(item);
			// return;

			if(typeof(item.listingId) === 'undefined') {
				$log.info('is undefined');
				var promise = appSharedService.newListing(item);
				var isNew = true;
			} else {
				var promise = appSharedService.editListing(item);
			}
			//Parse the user and success alert.
			promise.then(function(res) {
			  var res = res.response;
			  if(res.error!==0) {
				SweetAlert.swal('Hubo un error', res.description, 'error');
				return;
			  }
			  if(isNew) {
			  	res.data[0].color = $scope.colors[$scope.getRandomSpan()];
			  	$scope.user.courses.push(res.data[0]);
			  	$scope.noCourses = false;
			  }
			  SweetAlert.swal('Success!','Muy bien tu cursos ha sido publicado','success');
			  $rootScope.isLoading = false;
			})
	    }, function (oldItem) {
	    	if(oldItem) {
	    		var index = _.findKey($scope.user.courses, { 'listingId': oldItem.listingId });
		    	$scope.user.courses[index] = oldItem;
	    	}
	    });
  	}
  });
