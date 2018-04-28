"use strict";



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
      this.replaceWith('literature');
    }
  });
});
define('super-rentals/routes/literature', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
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
  exports.default = Ember.HTMLBars.template({ "id": "fJQBVPv/", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"About the NYC DOHMH Lit Review Tool\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"\\n    The New York City Department of Health and Mental Hygiene has\\n    developed a tool to systematically scrape, organize and store literature\\n    data from sources like Pubmed, PMC, and SpringerLink.\\n\\n    This tool can aid in your literature review tasks.\\n\\n    \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n    Developed by Sophie Rand and Kimberly Sebek.\\n  \"],[9],[0,\"\\n\"],[4,\"link-to\",[\"contact\"],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"  Contact Us\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/about.hbs" } });
});
define("super-rentals/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wBiGbGZt", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"menu\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"      \"],[6,\"h1\"],[8],[0,\"\\n        \"],[6,\"em\"],[8],[0,\"Lit Review Tool\"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[10,\"class\",\"links\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"about\"],[[\"class\"],[\"menu-about\"]],{\"statements\":[[0,\"        About\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"contact\"],[[\"class\"],[\"menu-contact\"]],{\"statements\":[[0,\"        Contact\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"body\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/application.hbs" } });
});
define("super-rentals/templates/contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gLciSC/F", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"Contact Us\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"The developers of this tool would love to help you leverage this tool\"],[6,\"br\"],[8],[9],[0,\"to enhance your own research and add to the agency's knowledge base.\"],[9],[0,\"\\n  \"],[6,\"address\"],[8],[0,\"\\n    NYC Department of Health and Mental Hygiene\\n    \"],[6,\"p\"],[8],[0,\"\\n      42-09 28th Street\"],[6,\"br\"],[8],[9],[0,\"\\n      Long Island City, NY 11101\\n    \"],[9],[0,\"\\n    \"],[6,\"a\"],[10,\"href\",\"tel:347.396.4681\"],[8],[0,\"+1 (347) 396-4681\"],[9],[6,\"br\"],[8],[9],[0,\"\\n    \"],[6,\"a\"],[10,\"href\",\"mailto:srand1@health.nyc.gov\"],[8],[0,\"srand1@health.nyc.gov\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"br\"],[8],[9],[0,\"\\n\"],[4,\"link-to\",[\"about\"],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"  About\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/contact.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "Zyy/xLry", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"jumbo\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"right tomster\"],[8],[9],[0,\"\\n  \"],[6,\"h2\"],[8],[0,\"Welcome!\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"We hope you find this tool useful for discovering new knowledge in your domain area.\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"about\"],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"    About Us\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "super-rentals/templates/literature.hbs" } });
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
  require("super-rentals/app")["default"].create({"LOG_ACTIVE_GENERATION":false,"LOG_VIEW_LOOKUPS":false,"rootElement":"#ember-testing","autoboot":false,"name":"super-rentals","version":"0.0.0+c457bea8"});
}
//# sourceMappingURL=super-rentals.map
