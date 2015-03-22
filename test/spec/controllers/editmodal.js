'use strict';

describe('Controller: EditmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsmeisterApp'));

  var EditmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditmodalCtrl = $controller('EditmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
