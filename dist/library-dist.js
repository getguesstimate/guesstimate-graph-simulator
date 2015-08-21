var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (factory) {
  !(typeof exports === 'object' && typeof module !== 'undefined') && typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  var _ = require('lodash');
  var NodeCollection = require('./collections/nodecollection');
  var EdgeCollection = require('./collections/edgecollection');

  var RepoGraph = (function () {
    function RepoGraph(repo) {
      _classCallCheck(this, RepoGraph);

      var defaultData = { nodes: [], edges: [] };
      var data = repo.data || defaultData;
      this.nodes = new NodeCollection(data.nodes, this);
      this.edges = new EdgeCollection(data.edges, this);
      this.unsavedChanges = false;
      this.propogate();
    }

    _createClass(RepoGraph, [{
      key: 'removeNode',
      value: function removeNode(nodeId) {
        var node = this.nodes.get(nodeId);
        node.remove();
      }
    }, {
      key: 'propogate',
      value: function propogate() {
        var dependents = this.nodes.allOfTtype('dependent');
        dependents.map(function (n) {
          return n.propogate();
        });
      }
    }, {
      key: 'outsideMetrics',
      value: function outsideMetrics(node) {
        var nodes = this.outsideNodes(node);
        return _.select(nodes, function (n) {
          return n.ttype() !== 'function';
        });
      }

      // Used to find possible outputs for a function node
    }, {
      key: 'outsideNodes',
      value: function outsideNodes(node) {
        var insideNodes = _.union([node], node.allOutputs());
        return _.difference(this.nodes.models, insideNodes);
      }
    }, {
      key: 'toCytoscape',
      value: function toCytoscape(params) {
        var asCytoscape = { nodes: this.nodes.toCytoscape(), edges: this.edges.toCytoscape() };
        if (params.editingNode !== undefined) {
          var editingCytoscapeNode = _.find(asCytoscape.nodes, function (f) {
            return f.data.nodeId === params.editingNode.id;
          }, this);
          editingCytoscapeNode.data.editing = 'true';
        }
        return asCytoscape;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return {
          nodes: this.nodes.toJSON(),
          edges: this.edges.toJSON()
        };
      }
    }]);

    return RepoGraph;
  })();

  module.exports = RepoGraph;
});
//# sourceMappingURL=./library-dist.js.map