import Page from '../../src/page';
import _ from 'lodash';

describe('Page', () => {
  var page;

  let json = {
    metrics:
      [
        {id: '124', name: 'cats', guesstimates: [{ distribution: { type: 'point', value: 300 }, estimate: {value: 300} }] },
        {id: '125', name: 'dogs', guesstimates: [{ distribution: { type: 'point', value: 500 }, estimate: {value: 500} }] },
        {id: '126', name: 'animals', guesstimates: [{ distribution: { type: 'point', value: 40}, funct: {inputs: ['124', '125'], function_type: 'addition'} }] },
      ]
  };

  beforeEach(() => {
    page = new Page(json);
  });

  describe('#constructor', () => {
    it('has three metrics', () => {
      expect(page.metrics.length).to.equal(3);
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

  describe('#metricIdToOutputs', () => {
    it('returns correct outputs', () => {
      expect(page.metricIdToOutputs('125')[0].id).to.equal('126');
    });
  });
});
