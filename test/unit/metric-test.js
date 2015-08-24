import Metric from '../../src/metric';
import _ from 'lodash';

describe('Metric', () => {
  var metric;
  const info = { id: '123', name: 'Cool Graph', estimates: [{ value: 300, distribution: { value: 300 } }] };

  beforeEach(() => {
    metric = new Metric(info);
  });

  describe('#constructor', () => {
    it('has id, name, source', () => {
      expect(metric.id).to.equal('123');
      expect(metric.name).to.equal('Cool Graph');
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
      expect(metric.toJSON()).to.deep.equal(info);
    });
  });

  describe('#distribution', () => {
    it('is correct', () => {
      expect(metric.distribution()).to.deep.equal(metric.estimates[0].distribution);
    });
  });
});
