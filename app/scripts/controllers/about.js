'use strict';

/**
 * @ngdoc function
 * @name skillsmeisterApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the skillsmeisterApp
 */
angular.module('skillsmeisterApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
