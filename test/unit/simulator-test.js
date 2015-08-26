import Simulator from '../../src/simulator';
import functionOperations from '../../src/lib/function_operations';
import PointDistribution from '../../src/distributions/point-distribution';
import ArrayDistribution from '../../src/distributions/array-distribution';
import NormalDistribution from '../../src/distributions/normal-distribution';

import _ from 'lodash';

describe('Simulator', () => {
  var simulator, operation;

  const options = {
    samples: 5,
  };

  beforeEach(() => {
  });

  describe('#run', function() {
    it('adds single numbers', () => {
      let inputs = [new PointDistribution({value: 3}), new PointDistribution({value: 4})];
      let operation = functionOperations.addition;
      let simulator = new Simulator({inputs: inputs, operation: operation});
      let resultDistribution = simulator.run();

      expect(resultDistribution).to.be.an.instanceOf(PointDistribution);
      expect(resultDistribution.value).to.equal(7);
    });

    it('adds arrays', () => {
      let inputs = [new ArrayDistribution({value: [1,1]}), new ArrayDistribution({value: [2,2,2]})];
      let operation = functionOperations.addition;
      let simulator = new Simulator({inputs: inputs, operation: operation, samples: 5});
      let resultDistribution = simulator.run();

      expect(resultDistribution).to.be.an.instanceOf(ArrayDistribution);
      expect(resultDistribution.value).to.deep.equal([3,3,3,3,3]);
    });

    it('adds normal distributions', () => {
      let inputs = [
        new NormalDistribution({mean: 10, stdev: 3, seed: 'STOCHATOR'}),
        new NormalDistribution({mean: 15, stdev: 1, seed: 'STOCHATOR'})
      ];
      let operation = functionOperations.addition;
      let simulator = new Simulator({inputs: inputs, operation: operation, samples: 5});
      let resultDistribution = simulator.run();

      expect(resultDistribution).to.be.an.instanceOf(ArrayDistribution);
      expect(resultDistribution.value.map(n => _.round(n, 2))).to.deep.equal([24.03, 31.81, 27.71, 17.22, 26.01]);
    });
  });
});
