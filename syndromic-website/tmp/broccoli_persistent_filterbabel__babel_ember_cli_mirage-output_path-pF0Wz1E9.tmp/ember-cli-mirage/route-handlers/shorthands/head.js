define('ember-cli-mirage/route-handlers/shorthands/head', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/route-handlers/shorthands/base', 'ember-cli-mirage', 'ember-cli-mirage/utils/inflector'], function (exports, _assert, _base, _emberCliMirage, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class HeadShorthandRouteHandler extends _base.default {

    /*
      Retrieve a model/collection from the db.
       Examples:
        this.head('/contacts', 'contact');
        this.head('/contacts/:id', 'contact');
    */
    handleStringShorthand(request, modelClass) {
      let modelName = this.shorthand;
      let camelizedModelName = (0, _inflector.camelize)(modelName);

      (0, _assert.default)(modelClass, `The route handler for ${request.url} is trying to access the ${camelizedModelName} model, but that model doesn't exist. Create it using 'ember g mirage-model ${modelName}'.`);

      let id = this._getIdForRequest(request);
      if (id) {
        let model = modelClass.find(id);
        if (!model) {
          return new _emberCliMirage.Response(404);
        } else {
          return new _emberCliMirage.Response(204);
        }
      } else if (this.options.coalesce && request.queryParams && request.queryParams.ids) {
        let model = modelClass.find(request.queryParams.ids);

        if (!model) {
          return new _emberCliMirage.Response(404);
        } else {
          return new _emberCliMirage.Response(204);
        }
      } else {
        return new _emberCliMirage.Response(204);
      }
    }
  }
  exports.default = HeadShorthandRouteHandler;
});