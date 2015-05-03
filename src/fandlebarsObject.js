//Updates an entire object using fandlebars
var fandlebars = require('./fandlebars.js');

var fbobj = function(obj, tree, processing) {
  var newObj = Array.isArray(obj) ? [] : {};
  for (var v in obj) {
    if (typeof obj[v] === 'object') {
      newObj[v] = fbobj(obj[v], tree);
    } else if (typeof obj[v] === 'string') {
      newObj[v] = fandlebars(obj[v], tree, processing);
    } else {
      newObj[v] = obj[v];
    }
  }
  return newObj;
};

module.exports = fbobj;
