import _ from 'lodash';
import uid from 'gen-uid';

class Estimate {
  constructor(options) {
    this.value = options.value;
  }

  toJSON() {
    return _.pick(this, 'value');
  }
}

module.exports = Estimate;
