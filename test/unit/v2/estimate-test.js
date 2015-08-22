import Estimate from '../../../src/v2/estimate';
import _ from 'lodash';

describe('Estimate', () => {
  var estimate;

  describe('with id, name, source', () => {
    const options = { value: 300, distribution: { value: 300 } };

    beforeEach(() => {
      estimate = new Estimate(options);
    });

    it('has value', () => {
      expect(estimate.value).to.equal(300);
    });

    it('converts to json', () => {
      expect(estimate.toJSON()).to.deep.equal(options);
    });
  });
});
