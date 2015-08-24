import Guesstimate from '../../src/guesstimate';
import _ from 'lodash';

describe('Guesstimate', () => {

  describe('#An Estimate', () => {
    var guesstimate;
    const options = { distribution: {value: 40}, estimate: {value: 40} };

    beforeEach(() => {
      guesstimate = new Guesstimate(options);
    });

    describe('#toJSON', () => {
      it('converts to json', () => {
        expect(guesstimate.toJSON()).to.deep.equal(options);
      });
    });
  });
});
