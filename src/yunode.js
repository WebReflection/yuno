var Path = require("path"),
    DIRECTORY_SEPARATOR = Path.join("a", "b").replace(/^a(.+?)b$/, "$1"),
    defineProperty = Object.defineProperty,
    basePath = ["."];

function and(callback) {
  callback.apply(global, this);
}

defineProperty(global, "yuno", {value: Object.defineProperties(exports, {
  and: {enumerable: true, value: function and() {
    console.warn("usage: yuno.use(module1, ... , moduleN).and(callback);");
  }},
  use: {enumerable: true, value: function use() {
    for (var
      nmsp, load, current, j, len, key, module,
      args = arguments,
      i = 0, length = args.length;
      i < length; ++i
    ) {
      load = arguments[i];
      try {
        args[i] = require(load);
      } catch(folderStructure) {
        // console.warn("module %s loaded through folder structure", arguments[i]);
        try {
          args[i] = require(
            basePath.concat(load.split(".")).join(DIRECTORY_SEPARATOR)
          );
        } catch(globalNamespace) {
          j = 0;
          nmsp = global;
          for (
            current = load.split("."),
            len = current.length - 1; j < len; ++j
          ) {
            key = current[j];
            nmsp = hasOwnProperty.call(nmsp, key) ? nmsp[key] : nmsp[key] = {};
          }
          args[i] = nmsp[current[j]];
        }
      }
    }
    return defineProperty({}, "and", {value: and.bind(args)});
  }},
  add: {enumerable: true, value: function add(object, name, descriptor) {
    return defineProperty(object, name, descriptor)[name];
  }}
})});