import Metric from '../../src/metric';
import Guesstimate from '../../src/guesstimate';
import _ from 'lodash';

describe('Metric', () => {
  var metric;
  const options = { id: '123', name: 'Cool Graph', guesstimates: [{ distribution: { value: 300 }, estimate: {value: 300} }] };

  beforeEach(() => {
    metric = new Metric(options);
  });

  describe('#constructor', () => {
    it('has id, name, source', () => {
      expect(metric.id).to.equal('123');
      expect(metric.name).to.equal('Cool Graph');
    });

    it('has a valid guesstimate', () => {
      expect(metric.guesstimates[0]).to.be.an.instanceOf(Guesstimate);
      expect(metric.guesstimates[0].metric).to.equal(metric);
    });

    describe('without a id', () => {
      beforeEach(() => {
        metric = new Metric({ name: 'Cool Graph' });
      });

      it('generates a 12-character id', () => {
        expect(metric.id.length).to.equal(12);
      });
    });
  });

  describe('#toJson', () => {
    it('converts to json', () => {
      expect(metric.toJSON()).to.deep.equal(options);
    });
  });

  describe('#distribution', () => {
    it('is correct', () => {
      expect(metric.distribution()).to.deep.equal(metric.guesstimates[0].distribution);
    });
  });
});
