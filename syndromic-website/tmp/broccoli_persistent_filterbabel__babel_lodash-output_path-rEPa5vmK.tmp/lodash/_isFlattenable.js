define('lodash/_isFlattenable', ['exports', 'lodash/_Symbol', 'lodash/isArguments', 'lodash/isArray'], function (exports, _Symbol, _isArguments, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /** Built-in value references. */
  var spreadableSymbol = _Symbol.default ? _Symbol.default.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return (0, _isArray.default)(value) || (0, _isArguments.default)(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  exports.default = isFlattenable;
});