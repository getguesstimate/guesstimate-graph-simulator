import Metric from '../../../src/v2/metric';
var _ = require('lodash');

describe('Metric', () => {
  var metric;

  describe('with id, name, source', () => {
    const info = { id: '123', name: 'Cool Graph', source: 3 };

    beforeEach(() => {
      metric = new Metric(info);
    });


    it('has id, name, source', () => {
      expect(metric.id).to.equal('123');
      expect(metric.name).to.equal('Cool Graph');
      expect(metric.source).to.equal(3);
    });

    it('converts to json', () => {
      expect(metric.toJSON()).to.deep.equal(info);
    });
  });

  describe('without a id', () => {
    beforeEach(() => {
      metric = new Metric({ name: 'Cool Graph', source: 3 });
    });

    it('generates a 12-character id', () => {
      expect(metric.id.length).to.equal(12);
    });
  });
});
