import Distribution from '../../../src/v2/distribution';
import _ from 'lodash';

describe('Distribution', () => {
  var distribution;

  describe('with id, name, source', () => {
    const options = { value: 300 };

    beforeEach(() => {
      distribution = new Distribution(options);
    });

    it('has value', () => {
      expect(distribution.value).to.equal(300);
    });

    it('converts to json', () => {
      expect(distribution.toJSON()).to.deep.equal(options);
    });
  });
});
