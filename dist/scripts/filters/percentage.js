'use strict';

/**
 * @ngdoc filter
 * @name skillsmeisterApp.filter:percentage
 * @function
 * @description
 * # percentage
 * Filter in the skillsmeisterApp.
 */
angular.module('skillsmeisterApp')
  .filter('percentage', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
});
