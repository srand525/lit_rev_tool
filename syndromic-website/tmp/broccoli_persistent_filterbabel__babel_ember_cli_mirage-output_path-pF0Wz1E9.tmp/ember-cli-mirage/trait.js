define("ember-cli-mirage/trait", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  let trait = function (extension) {
    let __isTrait__ = true;
    return {
      extension,
      __isTrait__
    };
  };

  exports.default = trait;
});