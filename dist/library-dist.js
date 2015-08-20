var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function (factory) {
  !(typeof exports === "object" && typeof module !== "undefined") && typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  var _ = require("lodash");
  var NodeCollection = require("./collections/nodecollection");
  var EdgeCollection = require("./collections/edgecollection");

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

    _createClass(RepoGraph, {
      removeNode: {
        value: function removeNode(nodeId) {
          var node = this.nodes.get(nodeId);
          node.remove();
        }
      },
      propogate: {
        value: function propogate() {
          var dependents = this.nodes.allOfTtype("dependent");
          dependents.map(function (n) {
            return n.propogate();
          });
        }
      },
      outsideMetrics: {
        value: function outsideMetrics(node) {
          var nodes = this.outsideNodes(node);
          return _.select(nodes, function (n) {
            return n.ttype() !== "function";
          });
        }
      },
      outsideNodes: {
        // Used to find possible outputs for a function node

        value: function outsideNodes(node) {
          var insideNodes = _.union([node], node.allOutputs());
          return _.difference(this.nodes.models, insideNodes);
        }
      },
      toCytoscape: {
        value: function toCytoscape(params) {
          var asCytoscape = { nodes: this.nodes.toCytoscape(), edges: this.edges.toCytoscape() };
          if (params.editingNode !== undefined) {
            var editingCytoscapeNode = _.find(asCytoscape.nodes, function (f) {
              return f.data.nodeId === params.editingNode.id;
            }, this);
            editingCytoscapeNode.data.editing = "true";
          }
          return asCytoscape;
        }
      },
      toJSON: {
        value: function toJSON() {
          return {
            nodes: this.nodes.toJSON(),
            edges: this.edges.toJSON()
          };
        }
      }
    });

    return RepoGraph;
  })();

  module.exports = RepoGraph;
});
//# sourceMappingURL=./library-dist.js.map