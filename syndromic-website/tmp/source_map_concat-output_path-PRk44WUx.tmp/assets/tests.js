'use strict';

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
define('super-rentals/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/literature-listing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/literature-listing.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });

  QUnit.test('routes/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/literature.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/literature.js should pass ESLint\n\n');
  });

  QUnit.test('routes/usecaserepo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/usecaserepo.js should pass ESLint\n\n');
  });
});
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
define('super-rentals/tests/test-helper', ['super-rentals/app', 'super-rentals/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('super-rentals/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/list-rentals-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/list-rentals-test.js should pass ESLint\n\n35:69 - \'assert\' is defined but never used. (no-unused-vars)\n38:68 - \'assert\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('integration/components/literature-listing-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/literature-listing-test.js should pass ESLint\n\n21:56 - \'assert\' is defined but never used. (no-unused-vars)\n25:60 - \'assert\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/literature-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/literature-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/usecaserepo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/usecaserepo-test.js should pass ESLint\n\n');
  });
});
define('super-rentals/tests/unit/adapters/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define('super-rentals/tests/unit/routes/about-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | about', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:about');
      assert.ok(route);
    });
  });
});
define('super-rentals/tests/unit/routes/contact-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact');
      assert.ok(route);
    });
  });
});
define('super-rentals/tests/unit/routes/index-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define('super-rentals/tests/unit/routes/literature-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | literature', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:literature');
      assert.ok(route);
    });
  });
});
define('super-rentals/tests/unit/routes/usecaserepo-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | usecaserepo', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:usecaserepo');
      assert.ok(route);
    });
  });
});
define('super-rentals/config/environment', [], function() {
  var prefix = 'super-rentals';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
