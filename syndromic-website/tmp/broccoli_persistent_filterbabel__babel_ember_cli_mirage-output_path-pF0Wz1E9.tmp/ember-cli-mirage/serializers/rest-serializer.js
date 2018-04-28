define('ember-cli-mirage/serializers/rest-serializer', ['exports', 'ember-cli-mirage/serializers/active-model-serializer', 'ember-cli-mirage/utils/inflector'], function (exports, _activeModelSerializer, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _activeModelSerializer.default.extend({

    keyForModel(type) {
      return (0, _inflector.camelize)(type);
    },

    keyForAttribute(attr) {
      return (0, _inflector.camelize)(attr);
    },

    keyForRelationship(type) {
      return (0, _inflector.camelize)((0, _inflector.pluralize)(type));
    },

    keyForEmbeddedRelationship(attributeName) {
      return (0, _inflector.camelize)(attributeName);
    },

    keyForRelationshipIds(type) {
      return (0, _inflector.camelize)((0, _inflector.pluralize)(type));
    },

    keyForForeignKey(relationshipName) {
      return (0, _inflector.camelize)((0, _inflector.singularize)(relationshipName));
    },

    getCoalescedIds(request) {
      return request.queryParams && request.queryParams.ids;
    }

  });
});