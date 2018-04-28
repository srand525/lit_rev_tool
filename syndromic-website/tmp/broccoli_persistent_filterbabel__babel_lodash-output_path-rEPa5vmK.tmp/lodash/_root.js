define('lodash/_root', ['exports', 'lodash/_freeGlobal'], function (exports, _freeGlobal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal.default || freeSelf || Function('return this')();

  exports.default = root;
});