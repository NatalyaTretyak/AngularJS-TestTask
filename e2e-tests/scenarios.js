'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  it('should automatically redirect to /permission when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch('/permission');
  });

  describe('permission', function() {
    beforeEach(function() {
      browser.get('index.html#!/permission');
    });

    it('should render permission when user navigates to /permission', function() {
      expect(
        element
          .all(by.css('[ng-view] p'))
          .first()
          .getText()
      ).toMatch(/partial for permission/);
    });
  });
});
