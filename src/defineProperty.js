try {
    if (!defineProperty({},"_",{value:1})._) {
      throw 0;
    }
  } catch(_) {
    defineProperty = function defineProperty(
      object, name, descriptor
    ) {
        /*
      if (hasOwnProperty.call(object, name)) {
        throw "unable to redefine " + name;
      } else {
        */
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
      // }
    };
  }