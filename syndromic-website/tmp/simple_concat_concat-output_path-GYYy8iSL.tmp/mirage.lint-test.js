QUnit.module('ESLint | mirage');

QUnit.test('mirage/config.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'mirage/config.js should pass ESLint\n\n');
});

QUnit.test('mirage/scenarios/default.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'mirage/scenarios/default.js should pass ESLint\n\n');
});

QUnit.test('mirage/serializers/application.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'mirage/serializers/application.js should pass ESLint\n\n');
});

