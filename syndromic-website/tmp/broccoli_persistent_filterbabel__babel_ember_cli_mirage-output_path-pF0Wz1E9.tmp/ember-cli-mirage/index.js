define('ember-cli-mirage/index', ['exports', 'ember-cli-mirage/factory', 'ember-cli-mirage/trait', 'ember-cli-mirage/association', 'ember-cli-mirage/response', 'ember-cli-mirage/faker', 'ember-cli-mirage/orm/model', 'ember-cli-mirage/orm/collection', 'ember-cli-mirage/serializer', 'ember-cli-mirage/serializers/active-model-serializer', 'ember-cli-mirage/serializers/json-api-serializer', 'ember-cli-mirage/serializers/rest-serializer', 'ember-cli-mirage/orm/associations/has-many', 'ember-cli-mirage/orm/associations/belongs-to', 'ember-cli-mirage/identity-manager'], function (exports, _factory, _trait, _association, _response, _faker, _model, _collection, _serializer, _activeModelSerializer, _jsonApiSerializer, _restSerializer, _hasMany, _belongsTo, _identityManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IdentityManager = exports.belongsTo = exports.hasMany = exports.RestSerializer = exports.JSONAPISerializer = exports.ActiveModelSerializer = exports.Serializer = exports.Collection = exports.Model = exports.faker = exports.Response = exports.association = exports.trait = exports.Factory = undefined;


  function hasMany(...args) {
    return new _hasMany.default(...args);
  }
  function belongsTo(...args) {
    return new _belongsTo.default(...args);
  }

  exports.Factory = _factory.default;
  exports.trait = _trait.default;
  exports.association = _association.default;
  exports.Response = _response.default;
  exports.faker = _faker.default;
  exports.Model = _model.default;
  exports.Collection = _collection.default;
  exports.Serializer = _serializer.default;
  exports.ActiveModelSerializer = _activeModelSerializer.default;
  exports.JSONAPISerializer = _jsonApiSerializer.default;
  exports.RestSerializer = _restSerializer.default;
  exports.hasMany = hasMany;
  exports.belongsTo = belongsTo;
  exports.IdentityManager = _identityManager.default;
  exports.default = {
    Factory: _factory.default,
    Response: _response.default,
    hasMany,
    belongsTo
  };
});