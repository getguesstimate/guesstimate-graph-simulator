import Simulator from './simulator';
import _ from 'lodash';
import functionOperations from './lib/function_operations';

class Funct {
  constructor(options) {
    this.guesstimate = options.guesstimate;
    this.distribution = options.distribution;
    this.inputs = options.inputs || [];
    this.function_type = options.function_type || 'addition';
    this.simulator = new Simulator({samples: 5});
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

  _calculateDistribution(distributions, analyzeOptions = this.defaultAnalyzeOptions()) {
    const inputs = distributions.map(n => n.value);
    return this.simulator.run(inputs, this._functionType());
  }

  defaultAnalyzeOptions() {
    return {
      samples: 10
    };
  }

  _functionType() {
    return functionOperations[this.function_type];
  }
}

module.exports = Funct;
