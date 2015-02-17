//Updates an entire object using fandlebars
var fandlebars = require('./fandlebars.js');

var fbobj = function(obj, tree) {
  var newObj = Array.isArray(obj) ? [] : {};
  for (var v in obj) {
    if (typeof obj[v] === 'object') {
      newObj[v] = fbobj(obj[v], tree);
    } else {
      newObj[v] = fandlebars(obj[v], tree);
    }
  }
  return newObj;
};

module.exports = fbobj;
