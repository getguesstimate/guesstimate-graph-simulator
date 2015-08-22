import Metric from './metric';
import _ from 'lodash';

class Page {
  constructor(json) {
    this.metrics = _.map(json.metrics, function(n){ return new Metric(n); });
  }

  toJSON() {
    const metrics = _.map(this.metrics, function(n){ return n.toJSON(); });
    return { metrics: metrics };
  }

  toCytoscape(editingMetricId) {
  }
}

module.exports = Page;
