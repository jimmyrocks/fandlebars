var fandlebars = require('../index');
var testString = "This is a test string with 1:{{0}}, 2:{{1}}, 3:{{2}} -- and so forth";
var testTree = [
  'value1',
  'value2',
  'value3'
];

console.log(fandlebars(testString, testTree));
