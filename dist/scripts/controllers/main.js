'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
