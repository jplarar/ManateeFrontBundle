'use strict';

describe('Controller: GetintouchCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsmeisterApp'));

  var GetintouchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GetintouchCtrl = $controller('GetintouchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
