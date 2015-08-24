import Estimate from '../../src/estimate';
import _ from 'lodash';

describe('Estimate', () => {
  var estimate;
  const options = { value: 300, distribution: { value: 300 } };

  beforeEach(() => {
    estimate = new Estimate(options);
  });

  describe('#constructor', () => {

    it('has value', () => {
      expect(estimate.value).to.equal(300);
    });

    it('converts to json', () => {
      expect(estimate.toJSON()).to.deep.equal(options);
    });
  });

  describe('#updateValue', () => {

    it('updates value and distribution values', () => {
      estimate.updateValue(20);
      expect(estimate.value).to.equal(20);
      expect(estimate.distribution.value).to.equal(20);
    });

  });
});
