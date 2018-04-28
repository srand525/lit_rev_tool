define('ember-cli-mirage/utils/reference-sort', ['exports', 'lodash/uniq', 'lodash/flatten'], function (exports, _uniq2, _flatten2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (edges) {
    let nodes = (0, _uniq2.default)((0, _flatten2.default)(edges));
    let cursor = nodes.length;
    let sorted = new Array(cursor);
    let visited = {};
    let i = cursor;

    let visit = function (node, i, predecessors) {

      if (predecessors.indexOf(node) >= 0) {
        throw new Error(`Cyclic dependency in properties ${JSON.stringify(predecessors)}`);
      }

      if (visited[i]) {
        return;
      } else {
        visited[i] = true;
      }

      let outgoing = edges.filter(function (edge) {
        return edge && edge[0] === node;
      });
      i = outgoing.length;
      if (i) {
        let preds = predecessors.concat(node);
        do {
          let pair = outgoing[--i];
          let child = pair[1];
          if (child) {
            visit(child, nodes.indexOf(child), preds);
          }
        } while (i);
      }

      sorted[--cursor] = node;
    };

    while (i--) {
      if (!visited[i]) {
        visit(nodes[i], i, []);
      }
    }

    return sorted.reverse();
  };
});