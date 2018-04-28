define('ember-cli-mirage/route-handlers/base', ['exports', 'ember-cli-mirage/assert', 'ember-cli-mirage/utils/inflector'], function (exports, _assert, _inflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class BaseRouteHandler {

    getModelClassFromPath(fullPath) {
      if (!fullPath) {
        return;
      }
      let path = fullPath.split('/');
      let lastPath;
      while (path.length > 0) {
        lastPath = path.splice(-1)[0];
        if (lastPath && lastPath !== ':id') {
          break;
        }
      }
      let modelName = (0, _inflector.dasherize)((0, _inflector.camelize)((0, _inflector.singularize)(lastPath)));
      return modelName;
    }

    _getIdForRequest(request, jsonApiDoc) {
      let id;
      if (request && request.params && request.params.id) {
        id = request.params.id;
      } else if (jsonApiDoc && jsonApiDoc.data && jsonApiDoc.data.id) {
        id = jsonApiDoc.data.id;
      }
      return id;
    }

    _getJsonApiDocForRequest(request, modelName) {
      let body;
      if (request && request.requestBody) {
        body = JSON.parse(request.requestBody);
      }
      return this.serializerOrRegistry.normalize(body, modelName);
    }

    _getAttrsForRequest(request, modelName) {
      let json = this._getJsonApiDocForRequest(request, modelName);
      let id = this._getIdForRequest(request, json);
      let attrs = {};

      (0, _assert.default)(json.data && (json.data.attributes || json.data.type || json.data.relationships), `You're using a shorthand or #normalizedRequestAttrs, but your serializer's normalize function did not return a valid JSON:API document. http://www.ember-cli-mirage.com/docs/v0.3.x/serializers/#normalizejson`);

      if (json.data.attributes) {
        attrs = Object.keys(json.data.attributes).reduce((sum, key) => {
          sum[(0, _inflector.camelize)(key)] = json.data.attributes[key];
          return sum;
        }, {});
      }

      if (json.data.relationships) {
        Object.keys(json.data.relationships).forEach(key => {
          let relationship = json.data.relationships[key];

          if (Array.isArray(relationship.data)) {
            attrs[`${(0, _inflector.camelize)((0, _inflector.singularize)(key))}Ids`] = relationship.data.map(rel => rel.id);
          } else {
            attrs[`${(0, _inflector.camelize)(key)}Id`] = relationship.data && relationship.data.id;
          }
        }, {});
      }

      if (id) {
        attrs.id = id;
      }

      return attrs;
    }

    _getAttrsForFormRequest({ requestBody }) {
      let attrs;
      let urlEncodedParts = [];

      (0, _assert.default)(requestBody && typeof requestBody === 'string', `You're using the helper method #normalizedFormData, but the request body is empty or not a valid url encoded string.`);

      urlEncodedParts = requestBody.split('&');

      attrs = urlEncodedParts.reduce((a, urlEncodedPart) => {
        let [key, value] = urlEncodedPart.split('=');
        a[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        return a;
      }, {});

      return attrs;
    }
  }
  exports.default = BaseRouteHandler;
});