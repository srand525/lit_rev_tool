define("ember-cli-mirage/association", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  let association = function (...traitsAndOverrides) {
    let __isAssociation__ = true;
    return {
      __isAssociation__,
      traitsAndOverrides
    };
  };

  exports.default = association;
});