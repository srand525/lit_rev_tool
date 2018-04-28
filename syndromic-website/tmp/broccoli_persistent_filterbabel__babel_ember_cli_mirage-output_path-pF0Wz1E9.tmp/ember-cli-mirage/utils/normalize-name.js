define('ember-cli-mirage/utils/normalize-name', ['exports', 'ember-cli-mirage/utils/inflector'], function (exports, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toCollectionName = toCollectionName;
  exports.toInternalCollectionName = toInternalCollectionName;
  exports.toModelName = toModelName;
  function toCollectionName(type) {
    let modelName = (0, _inflector.dasherize)(type);
    return (0, _inflector.camelize)((0, _inflector.pluralize)(modelName));
  }

  function toInternalCollectionName(type) {
    return `_${toCollectionName(type)}`;
  }

  function toModelName(type) {
    let modelName = (0, _inflector.dasherize)(type);
    return (0, _inflector.singularize)(modelName);
  }
});