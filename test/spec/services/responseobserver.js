'use strict';

describe('Service: responseObserver', function () {

  // load the service's module
  beforeEach(module('skillsmeisterApp'));

  // instantiate service
  var responseObserver;
  beforeEach(inject(function (_responseObserver_) {
    responseObserver = _responseObserver_;
  }));

  it('should do something', function () {
    expect(!!responseObserver).toBe(true);
  });

});
