define('ember-cli-mirage/route-handlers/shorthands/get', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/route-handlers/shorthands/base', 'ember-cli-mirage', 'ember-cli-mirage/utils/inflector'], function (exports, _assert, _base, _emberCliMirage, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class GetShorthandRouteHandler extends _base.default {

    /*
      Retrieve a model/collection from the db.
       Examples:
        this.get('/contacts', 'contact');
        this.get('/contacts/:id', 'contact');
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
          return model;
        }
      } else if (this.options.coalesce) {
        let ids = this.serializerOrRegistry.getCoalescedIds(request, camelizedModelName);
        if (ids) {
          return modelClass.find(ids);
        }
      }
      return modelClass.all();
    }

    /*
      Retrieve an array of collections from the db.
       Ex: this.get('/home', ['contacts', 'pictures']);
    */
    handleArrayShorthand(request, modelClasses) {
      let keys = this.shorthand;
      let id = this._getIdForRequest(request);

      /*
      If the first key is singular and we have an id param in
      the request, we're dealing with the version of the shorthand
      that has a parent model and several has-many relationships.
      We throw an error, because the serializer is the appropriate
      place for this now.
      */
      (0, _assert.default)(!id || (0, _inflector.singularize)(keys[0]) !== keys[0], `It looks like you're using the "Single record with
      related records" version of the array shorthand, in addition to opting
      in to the model layer. This shorthand was made when there was no
      serializer layer. Now that you're using models, please ensure your
      relationships are defined, and create a serializer for the parent
      model, adding the relationships there.`);

      return modelClasses.map(modelClass => modelClass.all());
    }

  }
  exports.default = GetShorthandRouteHandler;
});