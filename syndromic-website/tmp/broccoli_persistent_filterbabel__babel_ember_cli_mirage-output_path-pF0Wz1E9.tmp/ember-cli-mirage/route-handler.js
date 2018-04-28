define('ember-cli-mirage/route-handler', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/response', 'ember-cli-mirage/route-handlers/function', 'ember-cli-mirage/route-handlers/object', 'ember-cli-mirage/route-handlers/shorthands/get', 'ember-cli-mirage/route-handlers/shorthands/post', 'ember-cli-mirage/route-handlers/shorthands/put', 'ember-cli-mirage/route-handlers/shorthands/delete', 'ember-cli-mirage/route-handlers/shorthands/head'], function (exports, _assert, _response, _function, _object, _get, _post, _put, _delete, _head) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function isNotBlankResponse(response) {
    return response && !(Ember.typeOf(response) === 'object' && Object.keys(response).length === 0) && (Array.isArray(response) || !Ember.isBlank(response));
  }

  const DEFAULT_CODES = { get: 200, put: 204, post: 201, 'delete': 204 };

  function createHandler({ verb, schema, serializerOrRegistry, path, rawHandler, options }) {
    let handler;
    let args = [schema, serializerOrRegistry, rawHandler, path, options];
    let type = Ember.typeOf(rawHandler);

    if (type === 'function') {
      handler = new _function.default(...args);
    } else if (type === 'object') {
      handler = new _object.default(...args);
    } else if (verb === 'get') {
      handler = new _get.default(...args);
    } else if (verb === 'post') {
      handler = new _post.default(...args);
    } else if (verb === 'put' || verb === 'patch') {
      handler = new _put.default(...args);
    } else if (verb === 'delete') {
      handler = new _delete.default(...args);
    } else if (verb === 'head') {
      handler = new _head.default(...args);
    }
    return handler;
  }

  class RouteHandler {

    constructor({ schema, verb, rawHandler, customizedCode, options, path, serializerOrRegistry }) {
      this.verb = verb;
      this.customizedCode = customizedCode;
      this.serializerOrRegistry = serializerOrRegistry;
      this.handler = createHandler({ verb, schema, path, serializerOrRegistry, rawHandler, options });
    }

    handle(request) {
      return new Ember.RSVP.Promise(resolve => {
        this._getMirageResponseForRequest(request).then(mirageResponse => {
          this.serialize(mirageResponse, request).then(serializedMirageResponse => {
            resolve(serializedMirageResponse.toRackResponse());
          });
        });
      });
    }

    _getMirageResponseForRequest(request) {
      let result;
      try {
        /*
         We need to do this for the #serialize convenience method. Probably is
         a better way.
        */
        if (this.handler instanceof _function.default) {
          this.handler.setRequest(request);
        }

        result = this.handler.handle(request);
      } catch (e) {
        if (e instanceof _assert.MirageError) {
          throw e;
        } else {
          let message = Ember.typeOf(e) === 'string' ? e : e.message;
          let error = new _assert.MirageError(`Your ${request.method} handler for the url ${request.url} threw an error: ${message}`);

          result = new _response.default(500, {}, error.message);
        }
      }

      return this._toMirageResponse(result);
    }

    _toMirageResponse(result) {
      let mirageResponse;

      return new Ember.RSVP.Promise(resolve => {
        Ember.RSVP.Promise.resolve(result).then(response => {
          if (response instanceof _response.default) {
            mirageResponse = result;
          } else {
            let code = this._getCodeForResponse(response);
            mirageResponse = new _response.default(code, {}, response);
          }
          resolve(mirageResponse);
        });
      });
    }

    _getCodeForResponse(response) {
      let code;
      if (this.customizedCode) {
        code = this.customizedCode;
      } else {
        code = DEFAULT_CODES[this.verb];
        if (code === 204 && isNotBlankResponse(response)) {
          code = 200;
        }
      }
      return code;
    }

    serialize(mirageResponsePromise, request) {
      return new Ember.RSVP.Promise(resolve => {
        Ember.RSVP.Promise.resolve(mirageResponsePromise).then(mirageResponse => {
          mirageResponse.data = this.serializerOrRegistry.serialize(mirageResponse.data, request);
          resolve(mirageResponse);
        });
      });
    }
  }
  exports.default = RouteHandler;
});