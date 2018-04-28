define('ember-cli-mirage/get-rfc232-test-context', ['exports', 'require'], function (exports, _require2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getRfc232TestContext;


  //
  // Helper to get our rfc232/rfc268 test context object, or null if we're not in
  // such a test.
  //
  function getRfc232TestContext() {
    // Support older versions of `ember-qunit` that don't have
    // `@ember/test-helpers` (and therefore cannot possibly be running an
    // rfc232/rfc268 test).
    if (_require2.default.has('@ember/test-helpers')) {
      let { getContext } = (0, _require2.default)('@ember/test-helpers');
      return getContext();
    }
  }
});