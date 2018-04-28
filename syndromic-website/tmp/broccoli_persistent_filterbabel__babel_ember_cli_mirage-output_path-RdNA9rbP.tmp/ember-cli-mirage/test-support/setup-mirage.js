define('ember-cli-mirage/test-support/setup-mirage', ['exports', 'ember-cli-mirage/start-mirage'], function (exports, _startMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setupMirage;


  //
  // Used to set up mirage for a test. Must be called after one of the
  // `ember-qunit` `setup*Test()` methods. It starts the server and sets
  // `this.server` to point to it, and shuts the server down when the test
  // finishes.
  //
  // NOTE: the `hooks = self` is for mocha support
  //
  function setupMirage(hooks = self) {
    hooks.beforeEach(function () {
      if (!this.owner) {
        throw new Error('You must call one of the ember-qunit setupTest(),' + ' setupRenderingTest() or setupApplicationTest() methods before' + ' calling setupMirage()');
      }

      this.server = (0, _startMirage.default)(this.owner);
    });

    hooks.afterEach(function () {
      this.server.shutdown();
      delete this.server;
    });
  }
});