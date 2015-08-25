import _ from 'lodash';

// Accepts arrays as inputs and outputs

class Simulator {
  constructor(options) {
    this.samples = options.samples || 500;
  }

  run(inputs, operation) {
    const all_single = (_.every(inputs, 'length', 1));
    const run_samples = all_single ? 1 : this.samples;
    return Array.apply(null, {length: run_samples}).map( n => this.sample(inputs, operation) );
  }

  sample(inputs, operation) {
    let samples = inputs.map(n => _.sample(n));
    return operation(samples);
  }
}

module.exports = Simulator;
