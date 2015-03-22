'use strict';

describe('Filter: scroll', function () {

  // load the filter's module
  beforeEach(module('skillsmeisterApp'));

  // initialize a new instance of the filter before each test
  var scroll;
  beforeEach(inject(function ($filter) {
    scroll = $filter('scroll');
  }));

  it('should return the input prefixed with "scroll filter:"', function () {
    var text = 'angularjs';
    expect(scroll(text)).toBe('scroll filter: ' + text);
  });

});
