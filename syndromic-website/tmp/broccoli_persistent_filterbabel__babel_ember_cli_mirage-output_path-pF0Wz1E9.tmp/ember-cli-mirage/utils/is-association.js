define('ember-cli-mirage/utils/is-association', ['exports', 'lodash/isPlainObject'], function (exports, _isPlainObject2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (object) {
    return (0, _isPlainObject2.default)(object) && object.__isAssociation__ === true;
  };
});