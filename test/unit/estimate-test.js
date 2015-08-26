import Estimate from '../../src/estimate';
import Distribution from '../../src/distributions/point-distribution';
import _ from 'lodash';

describe('Estimate', () => {
  var estimate;
  const distribution = new Distribution({value: 300});
  const options = {distribution: distribution, value: 300 };

  beforeEach(() => {
    estimate = new Estimate(options);
  });

  describe('#constructor', () => {

    it('has value', () => {
      expect(estimate.value).to.equal(300);
    });

    it('converts to json', () => {
      expect(estimate.toJSON()).to.deep.equal({value: 300});
    });
  });

  describe('#update', () => {

    it('updates value and distribution values', () => {
      estimate.update(20);
      expect(estimate.value).to.equal(20);
      expect(estimate.distribution.value).to.equal(20);
    });
  });
});
