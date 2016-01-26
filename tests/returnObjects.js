var fandlebars = require('../index');
var testString = "This is a test string with 1:{{0.0}}, 2:{{1.test}}, 3:{{2.test value.0}}, {{3.null value.0}}, {{3.float value}}, {{3.undefined value.0}} -- and so forth";
var testTree = [
  ['value1'],
  {'test': 'value2'},
  {'test value': ['value3']},
  {'null value': [null], 'undefined value': [], 'float value': [1.232323232100000]}
];

console.log(fandlebars(testString, testTree, null, false));
console.log(fandlebars(testString, testTree, null, true));
