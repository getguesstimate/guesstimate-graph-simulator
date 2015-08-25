import Simulator from '../../src/simulator';
import functionOperations from '../../src/lib/function_operations';
import _ from 'lodash';

describe('Simulator', () => {
  var simulator, operation;

  const options = {
    samples: 5,
  };

  beforeEach(() => {
    simulator = new Simulator(options);
  });

  describe('#run', function() {
    it('adds single numbers', () => {
      let operation = functionOperations.addition.apply;
      let inputs = [[3], [4]];
      expect(simulator.run(inputs, operation)).to.deep.equal([7]);
    });

    it.only('adds arrays', () => {
      let operation = functionOperations.addition.apply;
      let inputs = [[9,8,8], [8,3,9]];
      expect(simulator.run(inputs, operation)).to.deep.equal([7, 7, 7, 7, 7]);
    });
  });
});
