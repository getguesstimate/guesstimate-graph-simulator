import _ from 'lodash';
import Distribution from './distribution';

class Estimate {
  constructor(options) {
    this.value = options.value;
    this.distribution = new Distribution({value: this.value});
  }

  updateValue(value) {
    this.value = value;
    this.distribution.value = value;
  }

  toJSON() {
    return _.pick(this, 'value', 'distribution');
  }
}

module.exports = Estimate;
