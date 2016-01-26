module.exports = function(text, origTree, processing, returnObjects) {
  // This is my quick and dirty version of handlebars
  var re = function(name) {
      return new RegExp('{{' + name + '}}', 'g');
    },
    replaceables,
    replaceAddress,
    replaceValueId,
    replacedObjects = {},
    treeSearch = function(addresses, tree) {
      var tasks = {
          'object': function(a, t) {
            // Recursively search through the object
            return treeSearch(a.slice(1), t[a[0]]);
          },
          'array': function(a, t) {
            if (a.length > 1 && t[a[0]]  && typeof parseInt(a[1], 10) === 'number') {
              return treeSearch(a.slice(1), t[a[0]]);
            } else if (a.length === 1) {
              return t[a[0]];
            }
          },
          'function': function(a, t) {
            var returnValue;
            returnValue = t[a[0]](a.slice(1), t);
            return a.length > 2 ? treeSearch(a.slice(2), returnValue) : returnValue;
          },
          'default': function(a, t) {
            return a.length === 1 ? t[a[0]] : undefined;
          }
        },
        taskManager = function(a, t) {
          var type = Object.prototype.toString.call(t[a[0]]).replace(/\[object (.+?)\]/, '$1').toLowerCase(),
            fn = tasks[type] ? tasks[type] : tasks['default'];
          return processing ? processing(fn(a,t)) : fn(a, t);
        };
      return taskManager(addresses, tree);
    };

  if (typeof origTree === 'object') {
    replaceables = text.match(re('.+?'));
    if (replaceables) {
      for (replaceValueId = 0; replaceValueId < replaceables.length; replaceValueId++) {
        replaceAddress = replaceables[replaceValueId].replace(re('(.+?)'), '$1').split('.');
        replacedObjects[replaceables[replaceValueId]] = treeSearch(replaceAddress, origTree);
        text = text.replace(replaceables[replaceValueId], replacedObjects[replaceables[replaceValueId]]);
        // text = text.replace(replaceables[replaceValueId], treeSearch(replaceAddress, origTree));
      }
    }
  }

  return returnObjects ? replacedObjects : text;
};
