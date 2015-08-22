var _ = require('lodash');
var uid = require('gen-uid');

class Metric {
  constructor(info) {
    this.id = info.id || uid.token();
    this.name = info.name;
    this.source = info.source;
    this.distribution = null;
    return this;
  }

  toJSON() {
    return _.pick(this, 'id', 'name', 'source');
  }

  calculate() {
    this.distribution = this.source.calculate();
  }

}

module.exports = Metric;
