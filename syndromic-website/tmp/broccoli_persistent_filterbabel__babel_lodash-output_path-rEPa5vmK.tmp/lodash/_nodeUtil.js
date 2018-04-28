define('lodash/_nodeUtil', ['module', 'exports', 'lodash/_freeGlobal'], function (module, exports, _freeGlobal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node. */
  var freeProcess = moduleExports && _freeGlobal.default.process;

  /** Used to access faster Node helpers. */
  var nodeUtil = function () {
    try {
      // Use `util.types` for Node 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  exports.default = nodeUtil;
});