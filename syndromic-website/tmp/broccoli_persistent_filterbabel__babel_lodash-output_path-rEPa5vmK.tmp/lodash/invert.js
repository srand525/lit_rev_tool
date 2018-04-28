define('lodash/invert', ['exports', 'lodash/constant', 'lodash/_createInverter', 'lodash/identity'], function (exports, _constant, _createInverter, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /**
   * Creates an object composed of the inverted keys and values of `object`.
   * If `object` contains duplicate values, subsequent values overwrite
   * property assignments of previous values.
   *
   * @static
   * @memberOf _
   * @since 0.7.0
   * @category Object
   * @param {Object} object The object to invert.
   * @returns {Object} Returns the new inverted object.
   * @example
   *
   * var object = { 'a': 1, 'b': 2, 'c': 1 };
   *
   * _.invert(object);
   * // => { '1': 'c', '2': 'b' }
   */
  var invert = (0, _createInverter.default)(function (result, value, key) {
    if (value != null && typeof value.toString != 'function') {
      value = nativeObjectToString.call(value);
    }

    result[value] = key;
  }, (0, _constant.default)(_identity.default));

  exports.default = invert;
});