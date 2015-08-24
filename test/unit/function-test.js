import Funct from '../../src/funct';
import _ from 'lodash';

describe('Function', () => {
  var funct;
  const options = { inputs: ['234', '3455'], function_type: 'addition' };

  beforeEach(() => {
    funct = new Funct(options);
  });

  describe('#constructor', () => {

    it('has inputs and function_type', () => {
      expect(funct.inputs).to.equal(options.inputs);
      expect(funct.function_type).to.equal(options.function_type);
    });

    it('converts to json', () => {
      expect(funct.toJSON()).to.deep.equal(options);
    });
  });
});
