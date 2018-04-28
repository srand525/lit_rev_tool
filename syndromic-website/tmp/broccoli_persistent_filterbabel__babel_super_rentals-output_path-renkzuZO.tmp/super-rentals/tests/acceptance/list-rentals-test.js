define('super-rentals/tests/acceptance/list-rentals-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Acceptance | list rentals', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('should show literature as the home page', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/literature', 'should redirect automatically');
    });

    (0, _qunit.test)('should link to information about the company.', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.click)(".menu-about");
      assert.equal((0, _testHelpers.currentURL)(), '/about', 'should navigate to about');
    });

    (0, _qunit.test)('should link to contact information.', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.click)(".menu-contact");
      assert.equal((0, _testHelpers.currentURL)(), '/contact', 'should navigate to contact');
    });

    (0, _qunit.test)('should list available rentals.', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
    });

    (0, _qunit.test)('should filter the list of rentals by city.', async function (assert) {});

    (0, _qunit.test)('should show details for a selected rental', async function (assert) {});
  });
});