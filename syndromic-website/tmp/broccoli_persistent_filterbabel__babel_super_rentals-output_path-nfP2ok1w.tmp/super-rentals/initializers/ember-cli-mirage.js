define('super-rentals/initializers/ember-cli-mirage', ['exports', 'super-rentals/config/environment', 'super-rentals/mirage/config', 'ember-cli-mirage/get-rfc232-test-context', 'ember-cli-mirage/start-mirage'], function (exports, _environment, _config, _getRfc232TestContext, _startMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.startMirage = startMirage;
  exports.default = {
    name: 'ember-cli-mirage',
    initialize(application) {
      if (_config.default) {
        application.register('mirage:base-config', _config.default, { instantiate: false });
      }
      if (_config.testConfig) {
        application.register('mirage:test-config', _config.testConfig, { instantiate: false });
      }

      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};
      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }
  };
  function startMirage(env = _environment.default) {
    return (0, _startMirage.default)(null, { env, baseConfig: _config.default, testConfig: _config.testConfig });
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }
    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }
    let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    let defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    let usingInDev = env === 'development' && !addonConfig.usingProxy;
    let usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});