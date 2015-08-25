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

  describe('#A Function', () => {
    var guesstimate;
    const options = { distribution: {value: 40}, funct: {inputs: ['1', '2'], function_type: 'addition'} };

    beforeEach(() => {
      guesstimate = new Guesstimate(options);
    });

    describe('#constructor', () => {
      it('saves function', () => {
        expect(guesstimate.func.function_type).to.equal('addition');
      });
    });

    describe('#toJSON', () => {
      it('converts to json', () => {
        expect(guesstimate.toJSON()).to.deep.equal(options);
      });
    });
  });
});
