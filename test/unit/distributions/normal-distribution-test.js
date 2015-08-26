import NormalDistribution from '../../../src/distributions/normal-distribution';
import _ from 'lodash';

describe('NormalDistribution', () => {
  var distribution;
  const options = { type: 'normal', mean: 10, stdev: 2, seed: 'STOCHATOR' };

  beforeEach(() => {
    distribution = new NormalDistribution(options);
  });

  describe('#constructor', () => {
    it('has type, mean, stdev', () => {
      expect(distribution.type).to.equal('normal');
      expect(distribution.mean).to.equal(10);
      expect(distribution.stdev).to.equal(2);
      expect(distribution).to.be.an.instanceOf(NormalDistribution);
    });
  });

  describe('#toJSON', () => {
    it('converts to json', () => {
      expect(distribution.toJSON()).to.deep.equal(_.pick(options, 'mean', 'stdev', 'type'));
    });
  });

  describe('#sample', () => {
    it('provides a sample', () => {
      expect(_.round(distribution.sample(), 2)).to.equal(9.52);
      expect(_.round(distribution.sample(), 2)).to.equal(13.4);
      expect(_.round(distribution.sample(), 2)).to.equal(11.36);
    });
  });
});
