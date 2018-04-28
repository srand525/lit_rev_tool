define('super-rentals/tests/integration/components/literature-listing-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | literature-listing', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    hooks.beforeEach(function () {
      this.lit = Ember.Object.create({
        image: 'fake.png',
        title: 'test-title',
        owner: 'test-owner',
        type: 'test-type',
        city: 'test-city',
        bedrooms: 3
      });
    });

    (0, _qunit.test)('should display rental details', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EXfBXfU4",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rental-listing\",null,[[\"rental\"],[[22,[\"rental\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });

    (0, _qunit.test)('should toggle wide class on click', async function (assert) {});
  });
});