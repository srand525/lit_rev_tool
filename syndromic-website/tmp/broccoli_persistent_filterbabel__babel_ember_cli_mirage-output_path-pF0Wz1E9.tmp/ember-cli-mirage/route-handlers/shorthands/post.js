define('ember-cli-mirage/route-handlers/shorthands/post', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/route-handlers/shorthands/base', 'ember-cli-mirage/utils/inflector'], function (exports, _assert, _base, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class PostShorthandRouteHandler extends _base.default {

    /*
      Push a new model of type *camelizedModelName* to the db.
       For example, this will push a 'user':
        this.post('/contacts', 'user');
    */

    handleStringShorthand(request, modelClass) {
      let modelName = this.shorthand;
      let camelizedModelName = (0, _inflector.camelize)(modelName);
      (0, _assert.default)(modelClass, `The route handler for ${request.url} is trying to access the ${camelizedModelName} model, but that model doesn't exist. Create it using 'ember g mirage-model ${modelName}'.`);

      let attrs = this._getAttrsForRequest(request, modelClass.camelizedModelName);
      return modelClass.create(attrs);
    }

  }
  exports.default = PostShorthandRouteHandler;
});