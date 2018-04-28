define('ember-cli-mirage/utils/ember-data', ['exports', 'lodash/find'], function (exports, _find2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hasEmberData = undefined;
  exports.isDsModel = isDsModel;


  function _hasEmberData() {
    let matchRegex = /^ember-data/i;
    return !!(0, _find2.default)(Object.keys(requirejs.entries), e => !!e.match(matchRegex));
  } /* global requirejs */

  const hasEmberData = exports.hasEmberData = _hasEmberData();

  function isDsModel(m) {
    return m && typeof m.eachRelationship === 'function';
  }
});