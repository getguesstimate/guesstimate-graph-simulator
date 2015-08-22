class Page {
  constructor(json) {
    this.metrics = _.map(json.metrics, function(n){return new Metric(n); });
  }

  toJSON() {
  }

  toCytoscape(editingMetricId) {

  }
}
