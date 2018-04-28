define('lodash/isSymbol', ['exports', 'lodash/_baseGetTag', 'lodash/isObjectLike'], function (exports, _baseGetTag, _isObjectLike) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' || (0, _isObjectLike.default)(value) && (0, _baseGetTag.default)(value) == symbolTag;
  }

  exports.default = isSymbol;
});