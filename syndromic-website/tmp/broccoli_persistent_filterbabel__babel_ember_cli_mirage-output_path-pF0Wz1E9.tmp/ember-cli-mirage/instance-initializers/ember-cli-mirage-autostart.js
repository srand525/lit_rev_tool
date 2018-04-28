define('ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart', ['exports', 'ember-cli-mirage/get-rfc232-test-context', 'ember-cli-mirage/start-mirage'], function (exports, _getRfc232TestContext, _startMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;


  // An object we can register with the container to ensure that mirage is shut
  // down when the application is destroyed
  const MirageShutdown = Ember.Object.extend({
    testContext: null,

    willDestroy() {
      let testContext = this.get('testContext');
      testContext.server.shutdown();
      delete testContext.server;
    }
  });

  //
  // If we are running an rfc232/rfc268 test then we want to support the
  // `autostart` configuration option, which auto-starts mirage before the test
  // runs and shuts it down afterwards, and also sets `this.server` on the test
  // context so the tests don't need to use the global `server`. We do this in an
  // instance initializer because initializers only run once per test run, not
  // before and after each test.
  //
  function initialize(appInstance) {
    let testContext = (0, _getRfc232TestContext.default)();
    if (testContext) {
      let {
        'ember-cli-mirage': { autostart } = {}
      } = appInstance.resolveRegistration('config:environment');

      if (autostart) {
        let server = (0, _startMirage.default)(appInstance);
        testContext.server = server;

        // To ensure that the server is shut down when the application is
        // destroyed, register and create a singleton object that shuts the server
        // down in its willDestroy() hook.
        appInstance.register('mirage:shutdown', MirageShutdown);
        let shutdown = appInstance.lookup('mirage:shutdown');
        shutdown.set('testContext', testContext);
      }
    }
  }

  exports.default = {
    initialize
  };
});