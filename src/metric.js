import Guesstimate from './guesstimate';

import uid from 'gen-uid';
import _ from 'lodash';

class Metric {
  constructor(options) {
    this.id = options.id || uid.token();
    this.name = options.name;
    this.guesstimates = options.guesstimates && _.map(options.guesstimates, function(n){ return new Guesstimate(n); });
  }

  distribution() {
    return this.guesstimates[0].distribution;
  }

  toJSON() {
    const guesstimates = _.map(this.guesstimates, function(n){ return n.toJSON(); });
    return {id: this.id, name: this.name, guesstimates: guesstimates};
  }

  source() {
    return this.guesstimates && this.guesstimates[0];
  }
}

module.exports = Metric;
