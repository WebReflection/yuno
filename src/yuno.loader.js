var yuno = function (window, yuno, defineProperty, DEFINE_GETTER, DEFINE_SETTER) {

  //:inject defineProperty.js

  defineProperty(yuno, "use", {value: function use() {
    yuno.$ = arguments;
  }});

  defineProperty(yuno, "and", {value: function and(callback) {
    cllback.apply(window, yuno.$);
    delete yuno.$;
  }});

  defineProperty(yuno, "add", {value: function add(obj, name, descriptor) {
    defineProperty(obj, name, descriptor);
    return obj[name];
  }});

  return yuno;

}(this, {}, Object.defineProperty, "__defineGetter__", "__defineSetter__");