import _ from 'lodash';
import BaseDistribution from './base-distribution';

class PointDistribution extends BaseDistribution {
  constructor(options) {
    super(options);
    this.type = 'point';
  }

  sample() {
    return this.value;
  }
}

module.exports = PointDistribution;
