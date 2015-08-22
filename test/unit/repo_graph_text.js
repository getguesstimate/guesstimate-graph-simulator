import RepoGraph from '../../src/repo_graph';

describe('RepoGraph', () => {

  describe('with one node and no edges', () => {
    var graph;

    beforeEach(() => {
      const info = {
        name: 'sample graph',
        data: {
          nodes: [{name: "foo", nodeType: 'estimate', pid: 1, value: 0.25}],
          edges: []
        }
      };
      graph = new RepoGraph(info);
    });

    it('has one node', () => {
      expect(graph.nodes.length).to.equal(1);
    });

    it('has zero edges', () => {
      expect(graph.edges.length).to.equal(0);
    });
  });

  describe('with multiple nodes and edges', () => {
    var graph;

    beforeEach(() => {
      const info = {
        name: 'sample graph',
        data: {
          nodes: [
            {name: 'people in NYC', nodeType: 'estimate', pid: '1', value: 200},
            {name: 'people in Boston', nodeType: 'estimate', pid: 2, value: 100},
            {nodeType: 'function', functionType: 'multiplication', pid: 3, outputIds: 4},
            {name: 'all people', nodeType: 'dependent', pid: 4, value: 3}
          ],
          edges: [
            {'0': 'c1', '1': 'c3'},
            {'0': 'c2', '1': 'c3'},
            {'0': 'c3', '1': 'c4'}
          ]
        }
      };
      graph = new RepoGraph(info);
    });


    it('has four node', () => {
      expect(graph.nodes.length).to.equal(4);
    });

    it('has three edges', () => {
      expect(graph.edges.length).to.equal(3);
    });
  });
});
