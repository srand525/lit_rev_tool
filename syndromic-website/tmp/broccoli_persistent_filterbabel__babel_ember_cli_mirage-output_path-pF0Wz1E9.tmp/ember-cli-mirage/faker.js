define("ember-cli-mirage/faker", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  let list = {
    random() {
      let items = arguments.length > 0 ? arguments : [];

      return function () {
        return faker.random.arrayElement(items);
      };
    },

    cycle() {
      let items = arguments.length > 0 ? arguments : [];

      return function (i) {
        return items[i % items.length];
      };
    }
  };

  faker.list = list;

  faker.random.number.range = function (min, max) {
    return function () /* i */{
      return Math.random() * (max - min) + min;
    };
  };

  exports.default = faker;
});