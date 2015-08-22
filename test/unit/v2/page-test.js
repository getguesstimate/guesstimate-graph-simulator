import Page from '../../../src/v2/page';
var _ = require('lodash');

describe.only('Page', () => {
  var page;

  const json = { metrics:
    [
      {id: '123', name: 'Cool Graph', source: 3 },
      {id: '124', name: 'Cooler Graph', source: 5 }
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
      expect(page.metrics[0].toJSON()).to.deep.equal(json.metrics[0]);
    });
  });

  describe('#toJSON', () => {
    it('is correct', () => {
      expect(page.toJSON()).to.deep.equal(json);
    });
  });
});
