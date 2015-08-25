import _ from 'lodash';
import Distribution from './distribution';
import Funct from './funct';
import Estimate from './estimate';

class Guesstimate {
  constructor(options) {
    this.distribution = new Distribution(options.distribution);

    switch(this._findType(options)) {
    case 'funct':
      this.func = new Funct(_.merge(options.funct, {distribution: this.distribtuion}));
      break;
    case 'estimate':
      this.estimate = new Estimate(_.merge(options.estimate, {distribution: this.distribtuion}));
      break;
    }
  }

  toJSON() {
    let options = {distribution: this.distribution.toJSON()};
    switch(this._findType(this)) {
    case 'funct':
      options.func = this.func.toJSON();
      break;
    case 'estimate':
      options.estimate = this.estimate.toJSON();
      break;
    }
    return options;
  }

  _findType(object) {
    if (object.func !== undefined) {
      return 'funct';
    } else if (object.estimate !== undefined) {
      return 'estimate';
    }
  }
}

module.exports = Guesstimate;
