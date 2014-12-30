var fandlebars = require('../index');
var testString = '1:{{one.Test Value.x}}, 2:{{two.1.g}},\n 3:{{three.x}}, 4:{{four.0}},\n 5:{{five.0.x.4}}, 6:{{six.0.5}}, 7:{{seven.s..t.3.g}} -- and so forth';
var testTree = {
  'one': function(a) {
    return {
      'x': 'value' + a[0]
    };
  },
  'two': ['value2', {
    g: 'valueTWO'
  }],
  'three': {
    'x': 'value3'
  },
  'four': ['value4', {
    g: 'valueFOUR'
  }],
  'five': [{
    'x': function(a, t) {
      return 'value' + t.y(a[0]);
    },
    'y': function(a) {
      return parseInt(a, 10) + 1;
    }
  }],
  'six': [
    function(a, t) {
      console.log(a, t);
      return 'value' + t[1](a[0]);
    },
    function(a) {
      return parseInt(a, 10) + 1;
    }
  ],
  'seven': {
    's': function() {
      return {
        't': function() {
          return {g: 's7'};
        }
      };
    }
  }
};

console.log(fandlebars(testString, testTree));
