define('ember-cli-mirage/route-handlers/shorthands/put', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/route-handlers/shorthands/base', 'ember-cli-mirage/utils/inflector'], function (exports, _assert, _base, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class PutShorthandRouteHandler extends _base.default {

    /*
      Update an object from the db, specifying the type.
         this.put('/contacts/:id', 'user');
    */
    handleStringShorthand(request, modelClass) {
      let modelName = this.shorthand;
      let camelizedModelName = (0, _inflector.camelize)(modelName);

      (0, _assert.default)(modelClass, `The route handler for ${request.url} is trying to access the ${camelizedModelName} model, but that model doesn't exist. Create it using 'ember g mirage-model ${modelName}'.`);

      let id = this._getIdForRequest(request);
      let attrs = this._getAttrsForRequest(request, modelClass.camelizedModelName);

      return modelClass.find(id).update(attrs);
    }

  }
  exports.default = PutShorthandRouteHandler;
});