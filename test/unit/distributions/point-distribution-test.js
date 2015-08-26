import Distribution from '../../../src/distributions/point-distribution';
import _ from 'lodash';

describe('PointDistribution', () => {
  var distribution;

  describe('#constructor', () => {
    const options = { type: 'point', value: 300 };

    beforeEach(() => {
      distribution = new Distribution(options);
    });

    it('has type and value', () => {
      expect(distribution.type).to.equal('point');
      expect(distribution.value).to.equal(300);
    });

    it('converts to json', () => {
      expect(distribution.toJSON()).to.deep.equal(options);
    });
  });
});
