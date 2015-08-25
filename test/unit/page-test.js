import Page from '../../src/page';
import _ from 'lodash';

describe('Page', () => {
  var page;

  let json = {
    metrics:
      [
        {id: '124', name: 'Cooler Graph', guesstimates: [{ distribution: { value: 300 }, estimate: {value: 300} }] },
        {id: '125', name: 'Cooler Graph', guesstimates: [{ distribution: { value: 500 }, estimate: {value: 500} }] }
      ]
  };


  beforeEach(() => {
    page = new Page(json);
  });

  describe('#constructor', () => {
    it('has two metrics', () => {
      expect(page.metrics.length).to.equal(2);
    });

    it('has first correct metric', () => {
      expect(page.metrics[0].page).to.deep.equal(page);
      expect(page.metrics[0].toJSON()).to.deep.equal(json.metrics[0]);
    });
  });

  describe('#toJSON', () => {
    it('is correct', () => {
      expect(page.toJSON()).to.deep.equal(json);
    });
  });

  describe('#metricIdToDistribution', () => {
    it('gives you the correct distribution', () => {
      expect(page.metricIdToDistribution('125').value).to.equal(500);
    });
  });
});
