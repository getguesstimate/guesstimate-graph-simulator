import Distribution from './distribution';

import _ from 'lodash';

class Funct {
  constructor(options) {
    this.inputs = options.inputs || [];
    this.function_type = options.function_type || 'addition';
  }

  toJSON() {
    return {inputs: this.inputs, function_type: this.function_type};
  }
}

module.exports = Funct;
