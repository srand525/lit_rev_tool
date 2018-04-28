define('ember-cli-mirage/utils/inflector', ['exports', 'ember-inflector'], function (exports, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'singularize', {
    enumerable: true,
    get: function () {
      return _emberInflector.singularize;
    }
  });
  Object.defineProperty(exports, 'pluralize', {
    enumerable: true,
    get: function () {
      return _emberInflector.pluralize;
    }
  });
  exports.capitalize = Ember.String.capitalize;
  exports.camelize = Ember.String.camelize;
  exports.dasherize = Ember.String.dasherize;
  exports.underscore = Ember.String.underscore;
});