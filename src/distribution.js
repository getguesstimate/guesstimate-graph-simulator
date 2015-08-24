import _ from 'lodash';

class Distribution {
  constructor(options) {
    this.value = options.value;
  }

  toJSON() {
    return _.pick(this, 'value');
  }
}

module.exports = Distribution;
