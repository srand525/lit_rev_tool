define("ember-cli-mirage/route-handlers/object", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class ObjectRouteHandler {

    constructor(schema, serializerOrRegistry, object) {
      this.schema = schema;
      this.serializerOrRegistry = serializerOrRegistry;
      this.object = object;
    }

    handle() /* request */{
      return this.object;
    }

  }
  exports.default = ObjectRouteHandler;
});