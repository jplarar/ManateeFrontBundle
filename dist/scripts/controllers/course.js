'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('CourseCtrl', function ($scope, $rootScope, $log, SweetAlert, $routeParams, appSharedService, $timeout) {
  	$log.info($routeParams.id);
  	// $scope.getListing = function() {
	var promise = appSharedService.getListing($routeParams.id);
  	promise.then(function(res) {
  		var res = res.response;
		if(res.error!==0) {
			SweetAlert.swal('Hubo un error', res.description, 'error');
			return;
		}
		$timeout(function() {
    		res.data[0].categoryImage = _.result(_.findWhere($rootScope.categories, { 'categoryId': res.data[0].category }), 'imageUrl');
    		$log.info(res.data[0])
		$scope.course = res.data[0];
    	}, 300);
  	});
	$scope.reviews = [
		{comment: 'La verdad me encanto el curso, fue lo mejor poderlo llevar.', rating: 5, user: 'Luis Villarreal'},
		{comment: 'Me pareció muy bueno pero pense que era un poco más especializado.', rating: 4, user: 'Juan Paulo Lara'}
	]
	$scope.rate = 2;
	$scope.max = 5;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};
  });
