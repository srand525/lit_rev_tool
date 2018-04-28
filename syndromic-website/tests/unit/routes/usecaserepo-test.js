import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | usecaserepo', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:usecaserepo');
    assert.ok(route);
  });
});
