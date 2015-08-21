var Backbone = require('backbone');

class Edge extends Backbone.Model {

  defaults() {
  }

  initialize(attributes) {
    let nodes = this.collection.graph.nodes;
    this.inputNode = nodes.get(attributes[0]);
    this.outputNode = nodes.get(attributes[1]);
    console.log(this.inputNode);
    console.log(this.outputNode);
  }

  inputId() {
    return this.attributes[0];
  }

  outputId() {
    return this.attributes[1];
  }

  toCytoscape() {
    var edge = {};
    edge.id = this.inputId() + '-' + this.outputId();
    edge.target = 'n' + this.outputId();
    edge.source = 'n' + this.inputId();
    edge.toType = this.outputNode.get('nodeType');
    return {data: edge};
  }
}

module.exports = Edge;
