define('ember-cli-mirage/serializers/json-api-serializer', ['exports', 'ember-cli-mirage/serializer', 'ember-cli-mirage/utils/inflector', 'lodash/get', 'lodash'], function (exports, _serializer, _inflector, _get2, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const JSONAPISerializer = _serializer.default.extend({

    keyForModel(modelName) {
      return (0, _inflector.dasherize)(modelName);
    },

    keyForCollection(modelName) {
      return (0, _inflector.dasherize)(modelName);
    },

    keyForAttribute(attr) {
      return (0, _inflector.dasherize)(attr);
    },

    keyForRelationship(key) {
      return (0, _inflector.dasherize)(key);
    },

    getHashForPrimaryResource(resource) {
      let resourceHash = this.getHashForResource(resource);
      let hashWithRoot = { data: resourceHash };
      let addToIncludes = this.getAddToIncludesForResource(resource);

      return [hashWithRoot, addToIncludes];
    },

    getHashForIncludedResource(resource) {
      let serializer = this.serializerFor(resource.modelName);
      let hash = serializer.getHashForResource(resource);
      let hashWithRoot = { included: this.isModel(resource) ? [hash] : hash };
      let addToIncludes = [];

      if (!this.hasQueryParamIncludes()) {
        addToIncludes = this.getAddToIncludesForResource(resource);
      }

      return [hashWithRoot, addToIncludes];
    },

    getHashForResource(resource) {
      let hash;

      if (this.isModel(resource)) {
        hash = this._getResourceObjectForModel(resource);
      } else {
        hash = resource.models.map(m => this._getResourceObjectForModel(m));
      }

      return hash;
    },

    /*
      Returns a flat unique list of resources that need to be added to includes
    */
    getAddToIncludesForResource(resource) {
      let relationshipPaths;

      if (this.hasQueryParamIncludes()) {
        relationshipPaths = this.request.queryParams.include.split(',');
      } else {
        let serializer = this.serializerFor(resource.modelName);
        relationshipPaths = serializer.getKeysForIncluded();
      }

      return this.getAddToIncludesForResourceAndPaths(resource, relationshipPaths);
    },

    getAddToIncludesForResourceAndPaths(resource, relationshipPaths) {
      let includes = [];

      relationshipPaths.forEach(path => {
        let relationshipNames = path.split('.');
        let newIncludes = this.getIncludesForResourceAndPath(resource, ...relationshipNames);
        includes.push(newIncludes);
      });

      return (0, _lodash.default)(includes).flatten().compact().uniqBy(m => m.toString()).value();
    },

    getIncludesForResourceAndPath(resource, ...names) {
      let nameForCurrentResource = (0, _inflector.camelize)(names.shift());
      let includes = [];
      let modelsToAdd = [];

      if (this.isModel(resource)) {
        let relationship = resource[nameForCurrentResource];

        if (this.isModel(relationship)) {
          modelsToAdd = [relationship];
        } else if (this.isCollection(relationship)) {
          modelsToAdd = relationship.models;
        }
      } else {
        resource.models.forEach(model => {
          let relationship = model[nameForCurrentResource];

          if (this.isModel(relationship)) {
            modelsToAdd.push(relationship);
          } else if (this.isCollection(relationship)) {
            modelsToAdd = modelsToAdd.concat(relationship.models);
          }
        });
      }

      includes = includes.concat(modelsToAdd);

      if (names.length) {
        modelsToAdd.forEach(model => {
          includes = includes.concat(this.getIncludesForResourceAndPath(model, ...names));
        });
      }

      return includes;
    },

    _getResourceObjectForModel(model) {
      let attrs = this._attrsForModel(model, true);
      delete attrs.id;

      let hash = {
        type: this.typeKeyForModel(model),
        id: model.id,
        attributes: attrs
      };

      return this._maybeAddRelationshipsToResourceObjectForModel(hash, model);
    },

    _maybeAddRelationshipsToResourceObjectForModel(hash, model) {
      let relationships = model.associationKeys.reduce((relationships, key) => {
        let relationship = model[key];
        let relationshipKey = this.keyForRelationship(key);
        let relationshipHash = {};

        if (this.hasLinksForRelationship(model, key)) {
          let serializer = this.serializerFor(model.modelName);
          let links = serializer.links(model);
          relationshipHash.links = links[key];
        }

        if (this.alwaysIncludeLinkageData || this._relationshipIsIncluded(key)) {
          let data = null;
          if (this.isModel(relationship)) {
            data = {
              type: this.typeKeyForModel(relationship),
              id: relationship.id
            };
          } else if (this.isCollection(relationship)) {
            data = relationship.models.map(model => {
              return {
                type: this.typeKeyForModel(model),
                id: model.id
              };
            });
          }
          relationshipHash.data = data;
        }

        if (!_lodash.default.isEmpty(relationshipHash)) {
          relationships[relationshipKey] = relationshipHash;
        }

        return relationships;
      }, {});

      if (!_lodash.default.isEmpty(relationships)) {
        hash.relationships = relationships;
      }

      return hash;
    },

    hasLinksForRelationship(model, relationshipKey) {
      let serializer = this.serializerFor(model.modelName);
      let links;
      if (serializer.links) {
        links = serializer.links(model);

        return links[relationshipKey] != null;
      }
    },

    _relationshipIsIncluded(relationshipKey) {
      if (this.hasQueryParamIncludes()) {
        let relationshipKeyAsString = this.keyForRelationship(relationshipKey);

        return this.request.queryParams.include.split(',').some(str => str.indexOf(relationshipKeyAsString) > -1);
      } else {
        let relationshipPaths = this.getKeysForIncluded();

        return relationshipPaths.includes(relationshipKey);
      }
    },

    getQueryParamIncludes() {
      return (0, _get2.default)(this, 'request.queryParams.include');
    },

    hasQueryParamIncludes() {
      return !!this.getQueryParamIncludes();
    },

    typeKeyForModel(model) {
      return (0, _inflector.dasherize)((0, _inflector.pluralize)(model.modelName));
    },

    getCoalescedIds(request) {
      let ids = request.queryParams && request.queryParams['filter[id]'];
      if (typeof ids === 'string') {
        return ids.split(',');
      }
      return ids;
    }
  });

  JSONAPISerializer.prototype.alwaysIncludeLinkageData = false;

  exports.default = JSONAPISerializer;
});