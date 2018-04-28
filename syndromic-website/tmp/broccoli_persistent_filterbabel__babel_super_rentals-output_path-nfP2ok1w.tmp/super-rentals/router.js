define('super-rentals/router', ['exports', 'super-rentals/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('about');
    this.route('contact');
    this.route('literature');
    this.route('usecaserepo');
  });

  exports.default = Router;
});