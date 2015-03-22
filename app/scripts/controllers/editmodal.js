'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:EditmodalCtrl
 * @description
 * # EditmodalCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('EditmodalCtrl', function ($scope, $modalInstance, $log, item, $timeout) {
  var oldItem = angular.extend({}, item);
  $timeout(function() {
    $("form:not(.filter) :input:visible:enabled:first").focus();
  }, 300);
  $scope.selectedIndex = 0;
  
  // console.log(item);
  $scope.item = typeof item == 'undefined' ? {} : item;
  $scope.item.status = typeof item == 'undefined' ? 'P' : item.status;
  $scope.newItem = typeof item == 'undefined' ? true : false;
  $scope.save = function () {
    $modalInstance.close($scope.item);
  };
  $scope.cancel = function () {
    if($scope.newItem)
  		$modalInstance.dismiss();
  	else
  		$modalInstance.dismiss(oldItem);
  }; 
});
