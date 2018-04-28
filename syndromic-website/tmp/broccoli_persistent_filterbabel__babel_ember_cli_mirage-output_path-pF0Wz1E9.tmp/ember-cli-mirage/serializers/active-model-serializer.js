define('ember-cli-mirage/serializers/active-model-serializer', ['exports', 'ember-cli-mirage/serializer', 'ember-cli-mirage/utils/inflector'], function (exports, _serializer, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _serializer.default.extend({
    normalizeIds: false,
    keyForModel(type) {
      return (0, _inflector.underscore)(type);
    },

    keyForAttribute(attr) {
      return (0, _inflector.underscore)(attr);
    },

    keyForRelationship(type) {
      return (0, _inflector.pluralize)((0, _inflector.underscore)(type));
    },

    keyForEmbeddedRelationship(attributeName) {
      return (0, _inflector.underscore)(attributeName);
    },

    keyForRelationshipIds(type) {
      return `${(0, _inflector.underscore)((0, _inflector.singularize)(type))}_ids`;
    },

    keyForForeignKey(relationshipName) {
      return `${(0, _inflector.underscore)(relationshipName)}_id`;
    },

    keyForPolymorphicForeignKeyId(relationshipName) {
      return `${(0, _inflector.underscore)(relationshipName)}_id`;
    },

    keyForPolymorphicForeignKeyType(relationshipName) {
      return `${(0, _inflector.underscore)(relationshipName)}_type`;
    },

    normalize(payload) {
      let type = Object.keys(payload)[0];
      let attrs = payload[type];
      let modelName = (0, _inflector.camelize)(type);
      let modelClass = this.schema.modelClassFor(modelName);
      let { belongsToAssociations, hasManyAssociations } = modelClass;
      let belongsToKeys = Object.keys(belongsToAssociations);
      let hasManyKeys = Object.keys(hasManyAssociations);

      let jsonApiPayload = {
        data: {
          type: (0, _inflector.pluralize)(type),
          attributes: {}
        }
      };
      if (attrs.id) {
        jsonApiPayload.data.id = attrs.id;
      }

      let relationships = {};

      Object.keys(attrs).forEach(key => {
        if (key !== 'id') {
          if (this.normalizeIds) {
            if (belongsToKeys.includes(key)) {
              let association = belongsToAssociations[key];
              let associationModel = association.modelName;
              relationships[(0, _inflector.dasherize)(key)] = {
                data: {
                  type: associationModel,
                  id: attrs[key]
                }
              };
            } else if (hasManyKeys.includes(key)) {
              let association = hasManyAssociations[key];
              let associationModel = association.modelName;
              let data = attrs[key].map(id => {
                return {
                  type: associationModel,
                  id
                };
              });
              relationships[(0, _inflector.dasherize)(key)] = { data };
            } else {
              jsonApiPayload.data.attributes[(0, _inflector.dasherize)(key)] = attrs[key];
            }
          } else {
            jsonApiPayload.data.attributes[(0, _inflector.dasherize)(key)] = attrs[key];
          }
        }
      });
      if (Object.keys(relationships).length) {
        jsonApiPayload.data.relationships = relationships;
      }

      return jsonApiPayload;
    },

    getCoalescedIds(request) {
      return request.queryParams && request.queryParams.ids;
    }

  });
});