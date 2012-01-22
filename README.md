yuno :: semantic cross platform module loader
=============================================
In this era where JavaScript is used in both browsers and server side, there is still no module loader able to scale across platforms so ...

Y U NO use() MODULES and() add() STUFF !!!
------------------------------------------
![meme logo](http://s3.amazonaws.com/ragefaces/fd910848b62298e03671f2e200c4c245.png width=200px)

Features
--------
  * **backward compatible** with both browsers and node.js, if you use *yuno* object to require modules these do not have to use *yuno* object in order to be loaded
  * **synchronous and asynchronous** with parallel scripts injection in the second case to speed up multiple dependencies resolution
  * **automatic asynchronous cross dependencies resolution** where if two different scripts requires same module before being executed, this will be loaded once and notified as soon as it's loaded
  * **in between AMD and CommonJS require**, a semantic `add()` method to explicitly *define* modules plus `use()` to *require* one or more modules before execution
  * **smart synchronous loader** passing through normal *require* first, require through current *path* after, and resolving through global namespace as fall back for *node.je*. For browsers the **combiner** will be available soon to be able to create **all in one packages**

API
---
  * **use(arg1:String, ..., argN:String):Object** specify one or more module to include before execution
  * **and(callback:Function):void** executed once `use()` has been resolved and all dependencies are available. The callback is called with global or window context referenced via `this`
  * **add(obj:Object, name:String, descriptor:Object):Object** define the name property in generic object through an **ES5 descriptor** and return the defined value. ES5 descriptors are those used via `Object.defineProperty(obj, name, descriptor)`

Examples
--------

    // generic usage
    yuno.use("lib1", "other.lib").and(function (lib1, other_lib_) {
      // do stuff with lib1 and other_lib_
      yuno.add(my.nameSpace, "method", {value: function () {
        // the generic method
      }});
    });


    // basic node.js example
    require("yuno").use(
      "path"
    ).and(function (Path) {

      // handy private scope, reusable for both web and node

      // standard way to add through yuno object
      yuno.add(exports, "throughAdd", {enumerable: true, value: true});
      // backward compatible with node exports too
      exports.directly = true;

    });
    
    /**
      var myModule = require("./tests/node");
      console.log(myModule.throughAdd); // true
      console.log(myModule.directly);   // true
     */


    // backward compatible with node and browsers
    // yuno.use("whatever").and(function (whatever){
      whatever.doStuff();
    });
    
    // the whatever node module
    exports.whatever = {doStuff: function () {}};

    // the whatever browser module
    var whatever = {doStuff: function () {}};


    // the dependencies free module
    yuno.add(my.namespace, "object", {value:{}});
    // or simply ...
    my.namespace.object = {};



