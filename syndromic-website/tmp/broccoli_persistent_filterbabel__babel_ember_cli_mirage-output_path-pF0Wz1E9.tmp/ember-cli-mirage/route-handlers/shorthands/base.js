define('ember-cli-mirage/route-handlers/shorthands/base', ['exports', 'ember-cli-mirage/utils/normalize-name', 'ember-cli-mirage/route-handlers/base'], function (exports, _normalizeName, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class BaseShorthandRouteHandler extends _base.default {

    constructor(schema, serializerOrRegistry, shorthand, path, options = {}) {
      super();
      shorthand = shorthand || this.getModelClassFromPath(path);
      this.schema = schema;
      this.serializerOrRegistry = serializerOrRegistry;
      this.shorthand = shorthand;
      this.options = options;

      let type = Array.isArray(shorthand) ? 'array' : typeof shorthand;
      if (type === 'string') {
        let modelClass = this.schema[(0, _normalizeName.toCollectionName)(shorthand)];
        this.handle = request => {
          return this.handleStringShorthand(request, modelClass);
        };
      } else if (type === 'array') {
        let modelClasses = shorthand.map(modelName => this.schema[(0, _normalizeName.toCollectionName)(modelName)]);
        this.handle = request => {
          return this.handleArrayShorthand(request, modelClasses);
        };
      }
    }

    // handleStringShorthand() {
    //
    // }
    //
    // handleArrayShorthand() {
    //
    // }

  }
  exports.default = BaseShorthandRouteHandler;
});