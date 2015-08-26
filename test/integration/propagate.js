import Page from '../../src/page';
import _ from 'lodash';

describe('Page', () => {
  let page, animalMetric, catMetric, dogMetric, beingMetric;

  let json = {
    monteCarlo: {
      samples: 10
    },
    metrics:
      [
        {id: '124', name: 'cats', guesstimates: [{ distribution: { type: 'point', value: 300 }, estimate: {value: 300} }] },
        {id: '125', name: 'dogs', guesstimates: [{ distribution: { type: 'point', value: 500 }, estimate: {value: 500} }] },
        {id: '126', name: 'animals', guesstimates: [{ distribution: {type: 'point', value: 40 }, funct: {inputs: ['124', '125'], function_type: 'addition'} }] },
        {id: '127', name: 'humans', guesstimates: [{ distribution: {type: 'point', value: 500 }, estimate: {value: 500} }] },
        {id: '128', name: 'beings', guesstimates: [{ distribution: {type: 'point', value: 40 }, funct: {inputs: ['126', '127'], function_type: 'addition'} }] }
      ]
  };

  beforeEach(() => {
    page = new Page(json);
    animalMetric = _.filter(page.metrics, 'id', '126')[0];
    catMetric = _.filter(page.metrics, 'id', '124')[0];
    dogMetric = _.filter(page.metrics, 'id', '125')[0];
    beingMetric = _.filter(page.metrics, 'id', '128')[0];
  });

  describe('metric', () => {
    describe('#_analyze', () => {
      it("updates the metric's distribution", () => {
        animalMetric._analyze();
        expect(animalMetric.distribution().value).to.deep.equal(800);
      });
    });

    describe('#propagate', () => {
      it("updates animal and beings' metric distribution", () => {
        animalMetric.propagate();
        expect(animalMetric.distribution().value).to.deep.equal(800);
        expect(beingMetric.distribution().value).to.deep.equal(1300);
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
