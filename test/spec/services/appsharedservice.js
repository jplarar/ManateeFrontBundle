'use strict';

describe('Service: appSharedService', function () {

  // load the service's module
  beforeEach(module('skillsmeisterApp'));

  // instantiate service
  var appSharedService;
  beforeEach(inject(function (_appSharedService_) {
    appSharedService = _appSharedService_;
  }));

  it('should do something', function () {
    expect(!!appSharedService).toBe(true);
  });

});
