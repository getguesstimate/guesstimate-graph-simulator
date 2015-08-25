import Guesstimate from './guesstimate';

import uid from 'gen-uid';
import _ from 'lodash';

class Metric {
  constructor(options) {
    this.id = options.id || uid.token();
    this.name = options.name;
    this.guesstimates = options.guesstimates && options.guesstimates.map(n => this._setupGuesstimate(n));
    this.page = options.page;
    return this;
  }

  distribution() {
    return this.guesstimates[0].distribution;
  }

  toJSON() {
    const guesstimates = _.map(this.guesstimates, function(n){ return n.toJSON(); });
    return {id: this.id, name: this.name, guesstimates: guesstimates};
  }

  propagate() {
    this._analyze();
    _.each(this._outputs(), (n) => n.propagate());
  }

  hasInput(metricId) {
    const funct = this.guesstimates[0].funct;
    return funct && _.includes(funct.inputs, metricId);
  }

  _analyze() {
    const funct = this.guesstimates[0].funct;
    funct && funct.analyze();
  }

  _outputs() {
    return this.page.metricIdToOutputs(this.id);
  }

  _setupGuesstimate(n) {
    let options = _.merge(_.clone(n), {metric: this});
    return new Guesstimate(options);
  }
}

module.exports = Metric;
