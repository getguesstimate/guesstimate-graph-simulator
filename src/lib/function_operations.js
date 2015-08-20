var _ = require('lodash');

var functionOperations = {

  'multiplication': {
    name: 'multiplication',
    sign: 'x',
    apply(inputs) {
      var product = _.reduce(inputs, function(p, n) { return p * n; });
      return product;
    }
  },

  'addition': {
    name: 'addition',
    sign: '+',
    apply(inputs){
      var sum = _.reduce(inputs, function(s, n) { return s + n; });
      return sum;
    }
  }
};

module.exports = functionOperations;
