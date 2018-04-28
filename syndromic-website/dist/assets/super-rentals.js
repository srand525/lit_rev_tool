"use strict";



define('super-rentals/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    namespace: 'api'
  });
});
define('super-rentals/app', ['exports', 'super-rentals/resolver', 'ember-load-initializers', 'super-rentals/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('super-rentals/components/literature-listing', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    isWide: false,
    actions: {
      toggleImageSize() {
        this.toggleProperty('isWide');
      }
    }
  });
});
define('super-rentals/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('super-rentals/helpers/app-version', ['exports', 'super-rentals/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('super-rentals/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('super-rentals/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('super-rentals/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'super-rentals/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('super-rentals/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
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
define('super-rentals/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('super-rentals/initializers/export-application-global', ['exports', 'super-rentals/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('super-rentals/instance-initializers/ember-cli-mirage-autostart', ['exports', 'ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart'], function (exports, _emberCliMirageAutostart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
define("super-rentals/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('super-rentals/mirage/config', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    this.namespace = '/api';

    this.get('/literature', function () {
      return {
        data: [{
          type: 'literature',
          id: '1',
          attributes: {
            journal: 'Journal of medical Internet research',
            source: 'pubmed',
            title: 'Performance of a Mobile Phone App-Based Participatory Syndromic Surveillance System for Acute Febrile Illness and Acute Gastroenteritis in Rural Guatemala.'
          }
        }, {
          type: 'literature',
          id: '2',
          attributes: {
            journal: 'African health sciences',
            source: 'pubmed',
            title: 'Evaluating the use of cell phone messaging for community Ebola syndromic surveillance in high risked settings in Southern Sierra Leone.'
          }
        }, {
          type: 'literature',
          id: '3',
          attributes: {
            journal: 'BMC research notes',
            source: 'pubmed',
            title: 'SCM: a practical tool to implement hospital-based syndromic surveillance.'
          }
        }]
      };
    });
  };
});
define("super-rentals/mirage/scenarios/default", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () /* server */{

    /*
      Seed your development database using your factories.
      This data will not be loaded in your tests.
    */

    // server.createList('post', 10);
  };
});
define('super-rentals/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCliMirage.JSONAPISerializer.extend({});
});
define('super-rentals/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('super-rentals/router', ['exports', 'super-rentals/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('about');
    this.route('contact');
    this.route('literature');
    this.route('usecaserepo');
  });

  exports.default = Router;
});
define('super-rentals/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('super-rentals/routes/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('super-rentals/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel() {
      this.replaceWith('about');
    }
  });
});
define('super-rentals/routes/literature', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return [{
        journal: 'BMC research notes',
        source: 'pubmed',
        title: 'SCM: a practical tool to implement hospital-based syndromic surveillance.'
      }, { journal: 'African health sciences',
        source: 'pubmed',
        title: 'Evaluating the use of cell phone messaging for community Ebola syndromic surveillance in high risked settings in Southern Sierra Leone.'
      }, { journal: 'Journal of medical Internet research',
        source: 'pubmed',
        title: 'Performance of a Mobile Phone App-Based Participatory Syndromic Surveillance System for Acute Febrile Illness and Acute Gastroenteritis in Rural Guatemala.'
      }];
    }
  });
});
define('super-rentals/routes/usecaserepo', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return [{
        id: 'asthma',
        syndrome: 'Asthma',
        owner: 'Schachterle, Mathes et. al.',
        city: 'NYC',
        datasource: 'ED',
        analyticalmethods: 'GLMM',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: 'Syndromic data can be used for long-term asthma monitoring.'
      }, {
        id: 'ili',
        syndrome: 'ILI',
        owner: 'Ramona',
        city: 'NYC',
        datasource: 'ED',
        analyticalmethods: 'Serfling',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: 'Syndromic data for rapid assessment of ILI.'
      }, {
        id: 'injury',
        syndrome: 'Injury',
        owner: 'Ramona',
        city: 'NYC',
        datasource: 'ED',
        analyticalmethods: '',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: 'Syndromic data for near real-time surveillance of injuries and situational awareness.'
      }, {
        id: 'k2',
        syndrome: 'K2-Synthetic Marijuana',
        owner: 'Ramona',
        city: 'NYC',
        datasource: 'ED',
        analyticalmethods: '',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: 'Monitor changes in drug-related emergency department visits.'
      }];
    }

  });
});
define('super-rentals/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("super-rentals/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UwyuTKs3", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h1\"],[8],[0,\"About the NYC DOHMH Syndromic Surveillance Repository\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"\\n    The Syndromic Surveillance Unit within the Bureau of Communicable Disesase\\n    at the New York City Department of Health and Mental Hygiene has\\n    created this website to promote knowledge sharing in the field.\\n\\n    On this site, you will find a\\n\"],[4,\"link-to\",[\"usecaserepo\"],[[\"class\"],[\"menu-contact\"]],{\"statements\":[[0,\"      repository\\n\"]],\"parameters\":[]},null],[0,\"    of use cases for syndromic data,\\n\\n     and an automated\\n\"],[4,\"link-to\",[\"literature\"],[[\"class\"],[\"menu-contact\"]],{\"statements\":[[0,\"      literature review tool\\n\"]],\"parameters\":[]},null],[0,\"    to augment and aid in discovery of new knowledge.\\n\\n    \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n    This site was developed by Sophie Rand and Ramona Lall. We'd love to hear from you.\\n  \"],[9],[0,\"\\n\"],[4,\"link-to\",[\"contact\"],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"  Contact Us\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/about.hbs" } });
});
define("super-rentals/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JjgAJscm", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"menu\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"      \"],[6,\"h1\"],[8],[0,\"\\n        \"],[6,\"em\"],[8],[0,\"NYC DOHMH Syndromic Surveillance Knowledge Repository\"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[10,\"class\",\"links\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"about\"],[[\"class\"],[\"menu-about\"]],{\"statements\":[[0,\"        About\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"contact\"],[[\"class\"],[\"menu-contact\"]],{\"statements\":[[0,\"        Contact\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"literature\"],[[\"class\"],[\"menu-contact\"]],{\"statements\":[[0,\"        Literature\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"usecaserepo\"],[[\"class\"],[\"menu-contact\"]],{\"statements\":[[0,\"        Use Case Repository\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"body\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/application.hbs" } });
});
define("super-rentals/templates/components/literature-listing", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bmpJsKZT", "block": "{\"symbols\":[],\"statements\":[[6,\"article\"],[10,\"class\",\"listing\"],[8],[0,\"\\n  \"],[2,\" <a {{action 'toggleImageSize'}} class=\\\"image {{if isWide \\\"wide\\\"}}\\\">\\n  <img src=\\\"{{lit.image}}\\\" alt=\\\"\\\">\\n  <small>View Larger</small>\\n </a> \"],[0,\"\\n \"],[6,\"h3\"],[8],[1,[22,[\"lit\",\"title\"]],false],[9],[0,\"\\n \"],[6,\"div\"],[10,\"class\",\"detail owner\"],[8],[0,\"\\n   \"],[6,\"span\"],[8],[0,\"Journal:\"],[9],[0,\" \"],[1,[22,[\"lit\",\"journal\"]],false],[0,\"\\n \"],[9],[0,\"\\n \"],[6,\"div\"],[10,\"class\",\"detail type\"],[8],[0,\"\\n   \"],[6,\"span\"],[8],[0,\"Source:\"],[9],[0,\" \"],[1,[22,[\"lit\",\"source\"]],false],[0,\"\\n \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/components/literature-listing.hbs" } });
});
define("super-rentals/templates/contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KYqRKdgx", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"Contact Us\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"The developers of this site would love to help you leverage the site\"],[6,\"br\"],[8],[9],[0,\"to enhance your own research and add to our agency's knowledge base.\"],[9],[0,\"\\n\"],[6,\"b\"],[8],[0,\"For questions on the use case repository, contact:\"],[9],[0,\"\\n\\n\"],[6,\"address\"],[8],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"\\n    Rob Mathes, Director, Syndromic Surveillance\\n    \"],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"tel:347.396.2650\"],[8],[0,\"+1 (347) 396-2650\"],[9],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"mailto:rmathes@health.nyc.gov\"],[8],[0,\"rmathes@health.nyc.gov\"],[9],[0,\"\\n  \"],[6,\"br\"],[8],[9],[0,\" \"],[6,\"br\"],[8],[9],[0,\"\\n    Ramona Lall, Senior Syndromic Surveillance Analyst\\n    \"],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"tel:347.396.2793\"],[8],[0,\"+1 (347) 396-2793\"],[9],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"mailto:rlall@health.nyc.gov\"],[8],[0,\"rlall@health.nyc.gov\"],[9],[0,\"\\n  \"],[6,\"br\"],[8],[9],[0,\" \"],[6,\"br\"],[8],[9],[0,\"\\n    Sophie Rand, Syndromic Surveillance Analyst\\n    \"],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"tel:347.396.4681\"],[8],[0,\"+1 (347) 396-4681\"],[9],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"mailto:srand1@health.nyc.gov\"],[8],[0,\"srand1@health.nyc.gov\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"b\"],[8],[0,\"For questions on the literature review tool, contact:\"],[9],[0,\"\\n  \"],[6,\"address\"],[8],[0,\"\\n    Sophie Rand, Syndromic Surveillance Analyst\\n    \"],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"tel:347.396.4681\"],[8],[0,\"+1 (347) 396-4681\"],[9],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"mailto:srand1@health.nyc.gov\"],[8],[0,\"srand1@health.nyc.gov\"],[9],[0,\"\\n  \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\nKim Sebek, Director of ***, Child and Family Health\\n\"],[6,\"br\"],[8],[9],[0,\"\\n\"],[6,\"a\"],[10,\"href\",\"tel:347.396.4681\"],[8],[0,\"+1 (347) 396-4681\"],[9],[6,\"br\"],[8],[9],[0,\"\\n\"],[6,\"a\"],[10,\"href\",\"mailto:ksebek@health.nyc.gov\"],[8],[0,\"ksebek@health.nyc.gov\"],[9],[0,\"\\n\"],[9],[0,\"\\n  \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n  \"],[6,\"address\"],[8],[0,\"\\n    NYC Department of Health and Mental Hygiene\"],[6,\"br\"],[8],[9],[0,\"\\n      42-09 28th Street\"],[6,\"br\"],[8],[9],[0,\"\\n      Long Island City, NY 11101\\n      \"],[9],[0,\"\\n      \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n\"],[4,\"link-to\",[\"about\"],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"  About\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/contact.hbs" } });
});
define("super-rentals/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Zt1RdJEj", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/index.hbs" } });
});
define("super-rentals/templates/literature", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fvCHDKzV", "block": "{\"symbols\":[\"litUnit\"],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"About the NYC DOHMH Lit Review Tool\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"\\n    The New York City Department of Health and Mental Hygiene has\\n    developed a tool to systematically scrape, organize and store literature\\n    data from sources like Pubmed, PMC, and SpringerLink.\\n\\n    This tool can aid in your literature review tasks.\\n\"],[9],[0,\"\\n\\n    Developed by Sophie Rand and Kimberly Sebek.\\n    \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n    \"],[6,\"p\"],[8],[0,\"The developers of this tool would love to help you leverage this tool\"],[6,\"br\"],[8],[9],[0,\"to enhance your own research and add to the agency's knowledge base.\\n    Please contact us! \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[1,[26,\"literature-listing\",null,[[\"literature\"],[[21,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/literature.hbs" } });
});
define("super-rentals/templates/usecaserepo", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8RCCDGGF", "block": "{\"symbols\":[\"usecase\"],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"Use Case Repository\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"Please add your own syndromic use case vignette to our Repository.\\n    \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n    For examples of use cases, check out the paper below.\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"a\"],[10,\"href\",\"http://journals.sagepub.com/doi/abs/10.1177/0033354917711183\"],[8],[0,\"Advancing the Use of Emergency Department Syndromic Surveillance Data, New York City, 2012-2016.\\n\\nLall, R. et. al. NYC DOHMH\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[6,\"article\"],[10,\"class\",\"listing\"],[8],[0,\"\\n    \"],[6,\"h3\"],[8],[1,[21,1,[\"syndrome\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"detail description\"],[8],[0,\"\\n      \"],[6,\"span\"],[8],[0,\"Background:\"],[9],[0,\" \"],[1,[21,1,[\"description\"]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"detail owner\"],[8],[0,\"\\n      \"],[6,\"span\"],[8],[0,\"Owner:\"],[9],[0,\" \"],[1,[21,1,[\"owner\"]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"detail type\"],[8],[0,\"\\n      \"],[6,\"span\"],[8],[0,\"Data Source:\"],[9],[0,\" \"],[1,[21,1,[\"datasource\"]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"detail location\"],[8],[0,\"\\n      \"],[6,\"span\"],[8],[0,\"Location:\"],[9],[0,\" \"],[1,[21,1,[\"city\"]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"detail bedrooms\"],[8],[0,\"\\n      \"],[6,\"span\"],[8],[0,\"Analytical Methods:\"],[9],[0,\" \"],[1,[21,1,[\"analyticalmethods\"]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/usecaserepo.hbs" } });
});
define('super-rentals/tests/mirage/mirage.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | mirage');

  QUnit.test('mirage/config.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/scenarios/default.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass ESLint\n\n');
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

if (!runningTests) {
  require("super-rentals/app")["default"].create({"name":"super-rentals","version":"0.0.0+c457bea8"});
}
//# sourceMappingURL=super-rentals.map
