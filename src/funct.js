import Distribution from './distribution';

import _ from 'lodash';
import functionOperations from './lib/function_operations';

class Funct {
  constructor(options) {
    this.guesstimate = options.guesstimate;
    this.distribution = options.distribution;
    this.inputs = options.inputs || [];
    this.function_type = options.function_type || 'addition';
  }

  toJSON() {
    return {inputs: this.inputs, function_type: this.function_type};
  }

  analyze(distributions = this._findInputDistributions()) {
    const value = this._calculateDistribution(distributions);
    this.distribution.value = value;
  }

  _findInputDistributions() {
    return this.inputs.map(n => this.guesstimate.metric.page.metricIdToDistribution(n));
  }

  _calculateDistribution(distributions) {
    const values = distributions.map(n => n.value);
    return this._functionType().apply(values);
  }

  _functionType() {
    return functionOperations[this.function_type];
  }
}

module.exports = Funct;
