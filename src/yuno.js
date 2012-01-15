"yuno" in this || (function (window) {"use strict";

  // (C) WebReflection - Mit Style License

  function use() {
    for (var
      nmsp, current, j, len, key, module,
      a = arguments,
      i = 0, length = a.length,
      modules = Array(length),
      result = {};
      i < length; ++i
    ) {
      nmsp = window;
      for (
        current = a[i].split("."),
        j = 0, len = current.length - 1; j < len; ++j
      ) {
        key = current[j];
        nmsp = hasOwnProperty.call(nmsp, key) ? nmsp[key] : defineProperty(nmsp, key, {value: {}})[key];
      }
      if (hasOwnProperty.call(nmsp, key = current[j])) {
        modules[i] = nmsp[key];
      } else {
        module = {
          p: a[i],
          k: key,
          m: modules,
          n: nmsp,
          i: i,
          handleEvent: handleEvent
        };
        hasOwnProperty.call(downloading, key = a[i]) ?
          downloading[key].push(module) :
          downloading[key] = inject(module, current.join("/"))
        ;
      }
    }
    return defineProperty(modules.r = result, "and", {value: function and(callback) {
      ready(modules) ?
        callback.apply(result, modules) :
        modules.c = callback
      ;
    }});
  }

  function ready(modules) {
    for (var i = 0, length = modules.length; i < length; ++i) {
      if (!hasOwnProperty.call(modules, i)) return false;
    }
    return true;
  }

  function notify() {
    var current, modules, module, key, n, k, i, c;
    for (key in downloading) {
      if (hasOwnProperty.call(downloading, key)) {
        current = downloading[key];
        for (i = current.length; i--;) {
          module = current[i];
          if (hasOwnProperty.call(n = module.n, k = module.k)) {
            modules = module.m;
            modules[module.i] = n[k];
            if (ready(modules)) {
              current.splice(i, 1);
              if (c = modules.c) {
                delete modules.c;
                c.apply(modules.r, modules);
              }
              i = current.length;
            }
          }
        }
        if (!current.length) {
          delete downloading[key];
        }
      }
    }
  }

  function add(object, name, descriptor) {
    defineProperty(object, name, descriptor);
    notify();
    return object[name];
  }

  function handleEvent(e) {
    var
      self = this,
      script = e.currentTarget,
      parentNode = script.parentNode
    ;
    script[REMOVE_EVENT_LISTENER]("load", self, false);
    script[REMOVE_EVENT_LISTENER]("error", self, false);
    parentNode && parentNode.removeChild(script);
    if (e.type != "load") {
      throw "unable to load " + self.p;
    }
    notify();
  }

  function inject(self, src) {
    var
      documentElement = document.documentElement,
      script = document.createElement("script")
    ;
    script.src = prefix + src + suffix + ".js";
    script[ADD_EVENT_LISTENER]("load", self, false);
    script[ADD_EVENT_LISTENER]("error", self, false);
    documentElement.insertBefore(
      script, documentElement.lastChild
    );
    return [self];
  }

  var

    document = window.document,

    ADD_EVENT_LISTENER = "addEventListener",
    REMOVE_EVENT_LISTENER = "removeEventListener",
    DEFINE_GETTER = "__defineGetter__",
    DEFINE_SETTER = "__defineSetter__",

    Array = window.Array,
    yuno = {use: use, add: add},
    downloading = {},
    hasOwnProperty = yuno.hasOwnProperty,
    slice = [].slice,
    defineProperty = window.Object.defineProperty || function defineProperty(
      object, name, descriptor
    ) {
      if (hasOwnProperty.call(object, name)) {
        throw "unable to redefine " + name;
      } else {
        if (hasOwnProperty.call(descriptor, "value")) {
          object[name] = descriptor.value;
        } else if (DEFINE_GETTER in object && DEFINE_SETTER in object) {
          if(hasOwnProperty.call(descriptor, "get")) {
            object[DEFINE_GETTER](name, descriptor.get);
          }
          if(hasOwnProperty.call(descriptor, "set")) {
            object[DEFINE_SETTER](name, descriptor.set);
          }
        }
        return object;
      }
    },
    script = document.getElementsByTagName("script"),
    suffix = script[script.length - 1].src.replace(/^(.*)yuno(\.min)?\.js(?:[?#].*)?$/i, "$1$2"),
    i = suffix.indexOf("."),
    prefix
  ;

  if (~i) {
    prefix = suffix.slice(0, i);
    suffix = suffix.slice(script);
  } else {
    prefix = suffix;
    suffix = "";
  }

  defineProperty(window, "yuno", {value: yuno});

  script = null;

}(this));