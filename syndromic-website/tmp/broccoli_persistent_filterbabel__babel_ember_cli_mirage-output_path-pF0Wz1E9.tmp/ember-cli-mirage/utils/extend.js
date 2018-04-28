define('ember-cli-mirage/utils/extend', ['exports', 'lodash/assign', 'lodash/has'], function (exports, _assign2, _has2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = extend;
  function extend(protoProps, staticProps) {
    let Parent = this;

    class Child extends Parent {
      constructor(...args) {
        super(...args);
        // The constructor function for the new subclass is optionally defined by you
        // in your `extend` definition
        if (protoProps && (0, _has2.default)(protoProps, 'constructor')) {
          protoProps.constructor.call(this, ...args);
        }
      }
    }

    // Add static properties to the constructor function, if supplied.

    (0, _assign2.default)(Child, Parent, staticProps);

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) {
      (0, _assign2.default)(Child.prototype, protoProps);
    }

    return Child;
  }
});