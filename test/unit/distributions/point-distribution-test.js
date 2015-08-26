import _ from 'lodash';

import Distribution from '../../../src/distributions/point-distribution';

describe('PointDistribution', () => {
  var distribution;
  const options = { type: 'point', value: 300 };

  beforeEach(() => {
    distribution = new Distribution(options);
  });

  describe('#constructor', () => {
    it('has type and value', () => {
      expect(distribution.type).to.equal('point');
      expect(distribution.value).to.equal(300);
    });
  });

  describe('#toJSON', () => {
    it('converts to json', () => {
      expect(distribution.toJSON()).to.deep.equal(options);
    });
  });
});
