// basic node.js test
/**
  var myModule = require("./tests/node");
  console.log(myModule.throughAdd); // true
  console.log(myModule.directly);   // true
 */
require("yunode").use(
  "path"
).and(function (Path) {

  // handy private scope, reusable for both web and node

  // standard way to add through yuno object
  yuno.add(exports, "throughAdd", {value: true});
  // backward compatible with node exports too
  exports.directly = true;

});