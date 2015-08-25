import _ from 'lodash';

// Accepts arrays as inputs and outputs

class Simulator {
  constructor(options) {
    this.samples = options.samples || 5;
  }

  run(inputs, operation) {
    return [operation.apply([inputs[0][0], inputs[1][0]])];
  }
}

module.exports = Simulator;
