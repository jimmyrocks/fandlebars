var fandlebars = require('../index');
var testString = "This is a test string with 1:{{one}}, 2:{{two}}, 3:{{three}} -- and so forth";
var testTree = {
  'one': 'value1',
  'two': 'value2',
  'three': 'value3'
};

console.log(fandlebars(testString, testTree));
