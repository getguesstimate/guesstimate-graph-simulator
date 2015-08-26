import Funct from '../../src/funct';
import Guesstimate from '../../src/guesstimate';
import PointDistribution from '../../src/distributions/point-distribution';
import _ from 'lodash';

describe('Function', () => {
  var guesstimate, funct;
  const distribution = new PointDistribution({value: [300]});
  const functOptions = {
    distribution: distribution,
    inputs: ['234', '3455'],
    function_type: 'addition'
  };
  const guesstimateOptions = {
    distribution: {
      type: 'point', value: 300
    },
    funct: functOptions
  };

  beforeEach(() => {
    guesstimate = new Guesstimate(guesstimateOptions);
    funct = guesstimate.funct;
  });

  describe('#constructor', () => {
    it('has inputs, and function_type', () => {
      expect(funct.inputs).to.equal(functOptions.inputs);
      expect(funct.function_type).to.equal(functOptions.function_type);
    });

    it('converts to json', () => {
      const expecting = _.pick(functOptions, 'inputs', 'function_type');
      expect(funct.toJSON()).to.deep.equal(expecting);
    });
  });

  describe('#analyze', function() {
    it('updates its distribution', () => {
      let distributions = [new PointDistribution({value: 5}), new PointDistribution({value: 23})];
      funct.analyze(distributions);
      expect(guesstimate.distribution.value).to.deep.equal(28);
    });
  });

  describe('#_calculateDistribution', function() {
    it('adds distributions', () => {
      let distributions = [new PointDistribution({value: 5}), new PointDistribution({value: 23})];
      let outputDistribution = funct._calculateDistribution(distributions);

      expect(outputDistribution).to.be.an.instanceOf(PointDistribution);
      expect(outputDistribution.value).to.equal(28);
    });
  });

  describe('#_functionType', function() {
    it('is addition', () => {
      expect(funct._functionType().name).to.equal('addition');
    });
  });
});
