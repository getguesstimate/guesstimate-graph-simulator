import Metric from './metric';
import _ from 'lodash';

class Page {
  constructor(options) {
    let that = this;
    this.metrics = options.metrics && options.metrics.map(n => this._setupMetric(n));
  }

  toJSON() {
    const metrics = _.map(this.metrics, function(n){ return n.toJSON(); });
    return { metrics: metrics };
  }

  toCytoscape(editingMetricId) {
  }

  _setupMetric(n) {
    let options = _.merge(_.clone(n), {page: this});
    return new Metric(options);
  }
}

module.exports = Page;
