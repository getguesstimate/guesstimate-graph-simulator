import Estimate from './estimate';

import uid from 'gen-uid';
import _ from 'lodash';

class Metric {
  constructor(info) {
    this.id = info.id || uid.token();
    this.name = info.name;
    this.estimates = info.estimates && _.map(info.estimates, function(n){ return new Estimate(n); });
  }

  toJSON() {
    return _.pick(this, 'id', 'name');
  }

  source() {
    return (this.estimates && this.estmates[0]) || (this.functions && this.functions[0]);
  }
}

module.exports = Metric;
