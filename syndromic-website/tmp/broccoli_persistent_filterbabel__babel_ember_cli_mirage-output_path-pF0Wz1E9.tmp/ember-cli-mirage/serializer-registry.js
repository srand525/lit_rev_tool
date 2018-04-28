define('ember-cli-mirage/serializer-registry', ['exports', 'ember-cli-mirage/orm/model', 'ember-cli-mirage/orm/collection', 'ember-cli-mirage/serializer', 'ember-cli-mirage/serializers/json-api-serializer', 'ember-cli-mirage/utils/inflector', 'ember-cli-mirage/assert', 'lodash/assign'], function (exports, _model, _collection, _serializer, _jsonApiSerializer, _inflector, _assert, _assign2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class SerializerRegistry {

    constructor(schema, serializerMap = {}) {
      this.schema = schema;
      this._serializerMap = serializerMap;
    }

    normalize(payload, modelName) {
      return this.serializerFor(modelName).normalize(payload);
    }

    serialize(response, request) {
      this.request = request;

      if (this._isModelOrCollection(response)) {
        let serializer = this.serializerFor(response.modelName);

        return serializer.serialize(response, request);
      } else if (Array.isArray(response) && response.filter(this._isCollection).length) {
        return response.reduce((json, collection) => {
          let serializer = this.serializerFor(collection.modelName);

          if (serializer.embed) {
            json[(0, _inflector.pluralize)(collection.modelName)] = serializer.serialize(collection, request);
          } else {
            json = (0, _assign2.default)(json, serializer.serialize(collection, request));
          }

          return json;
        }, {});
      } else {
        return response;
      }
    }

    serializerFor(type, { explicit = false } = {}) {
      let SerializerForResponse = this._serializerMap && this._serializerMap[(0, _inflector.camelize)(type)];

      if (explicit) {
        (0, _assert.default)(!!SerializerForResponse, `You passed in ${type} as an explicit serializer type but that serializer doesn't exist. Try running \`ember g mirage-serializer ${type}\`.`);
      } else {
        SerializerForResponse = SerializerForResponse || this._serializerMap.application || _serializer.default;

        (0, _assert.default)(!SerializerForResponse || SerializerForResponse.prototype.embed || SerializerForResponse.prototype.root || new SerializerForResponse() instanceof _jsonApiSerializer.default, 'You cannot have a serializer that sideloads (embed: false) and disables the root (root: false).');
      }

      return new SerializerForResponse(this, type, this.request);
    }

    _isModel(object) {
      return object instanceof _model.default;
    }

    _isCollection(object) {
      return object instanceof _collection.default;
    }

    _isModelOrCollection(object) {
      return this._isModel(object) || this._isCollection(object);
    }

    registerSerializers(newSerializerMaps) {
      let currentSerializerMap = this._serializerMap || {};
      this._serializerMap = (0, _assign2.default)(currentSerializerMap, newSerializerMaps);
    }

    getCoalescedIds(request, modelName) {
      return this.serializerFor(modelName).getCoalescedIds(request);
    }

  }
  exports.default = SerializerRegistry;
});