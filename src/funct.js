import Distribution from './distribution';

import _ from 'lodash';
import functionOperations from './lib/function_operations';

class Funct {
  constructor(options) {
    this.distribution = options.distribution;
    this.inputs = options.inputs || [];
    this.function_type = options.function_type || 'addition';
    this.guesstimate = options.guesstimate;
  }

  toJSON() {
    return {inputs: this.inputs, function_type: this.function_type};
  }

  analyzeDistribution(distributions) {
    const value = this._calculateDistribution(distributions);
    this.distribution.value = value;
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
