'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:BrowseCtrl
 * @description
 * # BrowseCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('BrowseCtrl', function ($scope, SweetAlert, $log, $rootScope, appSharedService, $timeout) {
  	$scope.data = {q: ''};
  	$scope.search = function() {
  		var promise = appSharedService.search($scope.data);
	  	promise.then(function(res) {
	  		var res = res.response;
			if(res.error!==0) {
				SweetAlert.swal('Hubo un error', res.description, 'error');
				return;
			}
			$log.info(res)
			_.each(res.data, function(object, index) {
				$log.info(_.result(_.findWhere($rootScope.categories, { 'categoryId': object.categoryId }), 'imageUrl'));
	    		object.categoryImage = _.result(_.findWhere($rootScope.categories, { 'categoryId': object.categoryId }), 'imageUrl');
	    	});
	    	$scope.courses = res.data;
	  	});
  	}
  	angular.element(document).ready(function () {
  		$timeout(function() {
  			$scope.search();
  		}, 300);
  	});
  });
