import _ from 'lodash';
import Distribution from './distribution';

class Estimate {
  constructor(options) {
    this.value = options.value;
    this.distribution = options.distribution || new Distribution({value: this.value});
  }

  toJSON() {
    return _.pick(this, 'value', 'distribution');
  }
}

module.exports = Estimate;
