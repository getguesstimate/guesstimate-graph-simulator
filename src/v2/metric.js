import Estimate from './estimate';

import uid from 'gen-uid';
import _ from 'lodash';

class Metric {
  constructor(info) {
    this.id = info.id || uid.token();
    this.name = info.name;
    this.estimates = info.estimates && _.map(info.estimates, function(n){ return new Estimate(n); });
  }

  distribution() {
    return this.estimates[0].distribution;
  }

  toJSON() {
    const estimates = _.map(this.estimates, function(n){ return n.toJSON(); });
    return {id: this.id, name: this.name, estimates: estimates};
  }

  source() {
    return (this.estimates && this.estmates[0]) || (this.functions && this.functions[0]);
  }
}

module.exports = Metric;
