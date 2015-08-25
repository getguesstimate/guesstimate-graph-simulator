import Funct from '../../src/funct';
import Distribution from '../../src/distribution';
import _ from 'lodash';

describe('Function', () => {
  var funct;
  const distribution = new Distribution({value: 300});

  const options = {
    distribution: distribution,
    inputs: ['234', '3455'],
    function_type: 'addition'
  };

  beforeEach(() => {
    funct = new Funct(options);
  });

  describe('#constructor', () => {
    it('has distribution, inputs, and function_type', () => {
      expect(funct.distribution).to.deep.equal(options.distribution);
      expect(funct.inputs).to.equal(options.inputs);
      expect(funct.function_type).to.equal(options.function_type);
    });

    it('converts to json', () => {
      const expecting = _.pick(options, 'inputs', 'function_type');
      expect(funct.toJSON()).to.deep.equal(expecting);
    });
  });
});
