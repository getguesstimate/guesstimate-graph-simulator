import _ from 'lodash';

class BaseDistribution {
  constructor(options) {
    this.type = options.distributionType;
    this.value = options.value;
  }

  toJSON() {
    return _.pick(this, 'type', 'value');
  }

}

module.exports = BaseDistribution;
