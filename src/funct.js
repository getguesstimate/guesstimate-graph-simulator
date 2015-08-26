import Simulator from './simulator';
import _ from 'lodash';
import functionOperations from './lib/function_operations';

class Funct {
  constructor(options) {
    this.guesstimate = options.guesstimate;
    this.inputs = options.inputs || [];
    this.function_type = options.function_type || 'addition';
  }

  toJSON() {
    return {inputs: this.inputs, function_type: this.function_type};
  }

  analyze(distributions = this._findInputDistributions()) {
    const output = this._calculateDistribution(distributions);
    this.guesstimate.distribution = output;
  }

  _findInputDistributions() {
    return this.inputs.map(n => this.guesstimate.metric.page.metricIdToDistribution(n));
  }

  _calculateDistribution(distributions, analyzeOptions = this.defaultAnalyzeOptions()) {
    let simulation = new Simulator({inputs: distributions, operation: this._functionType()});
    return simulation.run();
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
