define('ember-cli-mirage/route-handlers/shorthands/delete', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/route-handlers/shorthands/base', 'ember-cli-mirage/utils/inflector'], function (exports, _assert, _base, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class DeleteShorthandRouteHandler extends _base.default {

    /*
      Remove the model from the db of type *camelizedModelName*.
       This would remove the user with id :id:
        Ex: this.del('/contacts/:id', 'user');
    */
    handleStringShorthand(request, modelClass) {
      let modelName = this.shorthand;
      let camelizedModelName = (0, _inflector.camelize)(modelName);
      (0, _assert.default)(modelClass, `The route handler for ${request.url} is trying to access the ${camelizedModelName} model, but that model doesn't exist. Create it using 'ember g mirage-model ${modelName}'.`);

      let id = this._getIdForRequest(request);
      return modelClass.find(id).destroy();
    }

    /*
      Remove the model and child related models from the db.
       This would remove the contact with id `:id`, as well
      as this contact's addresses and phone numbers.
        Ex: this.del('/contacts/:id', ['contact', 'addresses', 'numbers');
    */
    handleArrayShorthand(request, modelClasses) {
      let id = this._getIdForRequest(request);

      let parent = modelClasses[0].find(id);
      let childTypes = modelClasses.slice(1).map(modelClass => (0, _inflector.pluralize)(modelClass.camelizedModelName));

      // Delete related children
      childTypes.forEach(type => parent[type].destroy());
      parent.destroy();
    }

  }
  exports.default = DeleteShorthandRouteHandler;
});