'use strict';

/**
 * @ngdoc directive
 * @name skillsmeisterApp.directive:scroll
 * @description
 * # scroll
 */
angular.module('skillsmeisterApp')
  .directive('scroll', function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             // console.log(this.pageYOffset);
             if (this.pageYOffset >= 117) {
                 scope.boolChangeClass = true;
             } else {
                 scope.boolChangeClass = false;
             }
            scope.$apply();
        });
    };
  });
