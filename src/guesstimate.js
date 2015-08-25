import _ from 'lodash';
import Distribution from './distribution';
import Funct from './funct';
import Estimate from './estimate';

class Guesstimate {
  constructor(options) {
    this.distribution = new Distribution(options.distribution);
    this.metric = options.metric;

    const [type, typeKlass] = this._findType(options);
    this[type] = new typeKlass(_.merge(_.clone(options[type]), {distribution: this.distribution, guesstimate: this}));
  }

  toJSON() {
    const options = {distribution: this.distribution.toJSON()};
    const [type, foobar] = this._findType(this);
    options[type] = this[type].toJSON();
    return options;
  }

  _findType(object) {
    if (object.hasOwnProperty('funct')) {
      return ['funct', Funct];
    } else if (object.hasOwnProperty('estimate')) {
      return ['estimate', Estimate];
    } else {
      return [null, null];
    }
  }
}

module.exports = Guesstimate;
