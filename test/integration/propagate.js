import Page from '../../src/page';
import _ from 'lodash';

describe('Page', () => {
  let page, animalMetric, catMetric, dogMetric;

  let json = {
    metrics:
      [
        {id: '124', name: 'cats', guesstimates: [{ distribution: { value: 300 }, estimate: {value: 300} }] },
        {id: '125', name: 'dogs', guesstimates: [{ distribution: { value: 500 }, estimate: {value: 500} }] },
        {id: '126', name: 'animals', guesstimates: [{ distribution: {value: 40}, funct: {inputs: ['124', '125'], function_type: 'addition'} }] },
        {id: '127', name: 'humans', guesstimates: [{ distribution: { value: 500 }, estimate: {value: 500} }] },
        {id: '128', name: 'beings', guesstimates: [{ distribution: {value: 40}, funct: {inputs: ['126', '127'], function_type: 'addition'} }] }
      ]
  };

  beforeEach(() => {
    page = new Page(json);
    animalMetric = _.filter(page.metrics, 'id', '126')[0];
    catMetric = _.filter(page.metrics, 'id', '124')[0];
    dogMetric = _.filter(page.metrics, 'id', '125')[0];
  });

  describe('metric', () => {
    describe('#analyze', () => {
      it('updates the metric\'s distribution', () => {
        animalMetric.analyze();
        expect(animalMetric.distribution().value).to.equal(800);
      });
    });
  });

  describe('funct', () => {
    describe('#findInputDistributions', () => {
      it('finds the correct distributions', () => {
        let funct = animalMetric.guesstimates[0].funct;
        expect(funct._findInputDistributions()).to.deep.equal([catMetric.distribution(), dogMetric.distribution()]);
      });
    });
  });
});
