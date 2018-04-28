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