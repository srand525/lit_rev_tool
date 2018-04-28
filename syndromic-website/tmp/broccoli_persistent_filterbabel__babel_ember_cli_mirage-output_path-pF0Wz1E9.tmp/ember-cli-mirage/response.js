define('ember-cli-mirage/response', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class Response {

    constructor(code, headers = {}, data = {}) {
      this.code = code;
      this.headers = headers;
      this.data = data;
    }

    toRackResponse() {
      let { headers } = this;
      if (!headers.hasOwnProperty('Content-Type')) {
        headers['Content-Type'] = 'application/json';
      }

      return [this.code, this.headers, this.data];
    }

  }
  exports.default = Response;
});