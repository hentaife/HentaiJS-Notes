'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var isArray = Array.isArray;
var slice = [].slice;

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function baseExtend(dst, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!isObject(obj) && !isFunction(obj)) continue;
    var keys = Object.keys(obj);
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject(src)) {
        if (isDate(src)) {
          dst[key] = new Date(src.valueOf());
        } else {
          if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
          baseExtend(dst[key], [src], true);
        }
      } else {
        dst[key] = src;
      }
    }
  }
  return dst;
}

function extend(dst) {
  return baseExtend(dst, slice.call(arguments, 1), false);
}

function merge(dst) {
  return baseExtend(dst, slice.call(arguments, 1), true);
}
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

var Container = (function () {
  function Container() {
    _classCallCheck(this, Container);

    this.values = {};
  }

  _createClass(Container, [{
    key: 'value',
    value: function value(name, _value) {
      if (isUndefined(_value)) {
        return this.values[name];
      }

      this.values[name] = _value;
    }
  }, {
    key: 'invoke',
    value: function invoke(fn, self) {
      var names, length, args;

      args = [];
      names = this.annotate(fn);

      for (var i = 0, _length = names.length; i < _length; i++) {
        args.push(this.value(names[i]));
      }

      if (isArray(fn)) {
        fn = fn[length];
      }

      return fn.apply(self, args);
    }
  }, {
    key: 'annotate',
    value: function annotate(fn) {
      var last, fnText, argDecl, names;

      if (isArray(fn)) {
        last = fn.length - 1;
        return fn.slice(0, last);
      }

      names = [];
      fnText = fn.toString().replace(STRIP_COMMENTS, '');
      argDecl = fnText.match(FN_ARGS);
      forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
        arg.replace(FN_ARG, function (all, underscore, name) {
          names.push(name);
        });
      });

      return names;
    }
  }]);

  return Container;
})();

var App = (function (_Container) {
  _inherits(App, _Container);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);

    this.initialized = false;
    this.providers = {};
  }

  _createClass(App, [{
    key: 'provider',
    value: function provider(name, _provider) {
      if (isUndefined(_provider)) {
        return this.providers[name];
      }

      this.providers[name] = new _provider();

      if (this.initialized) {
        this.providers[name].run();
      }
    }
  }, {
    key: 'controller',
    value: function controller() {}
  }, {
    key: 'run',
    value: function run(element) {

      forEach(this.providers, function (provider) {
        provider.run(this);
      }, this);

      this.invoke(function (compile) {

        compile(element);
      });

      this.initialized = true;
    }
  }]);

  return App;
})(Container);

var Provider = (function () {
  function Provider() {
    _classCallCheck(this, Provider);
  }

  _createClass(Provider, [{
    key: 'run',
    value: function run(app) {
      app.invoke(this.register);
    }
  }, {
    key: 'register',
    value: function register() {}
  }]);

  return Provider;
})();

var HT;

HT = window.HT || (window.HT = {});

extend(HT, {
  isObject: isObject,
  isFunction: isFunction,
  extend: extend,
  merge: merge
});

HT.app = new App();
HT.$ = jQuery;
HT.app.value('$', HT.$);
HT.app.value('app', HT.app);

var CompileProvider = (function (_Provider) {
  _inherits(CompileProvider, _Provider);

  function CompileProvider() {
    _classCallCheck(this, CompileProvider);

    _get(Object.getPrototypeOf(CompileProvider.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CompileProvider, [{
    key: 'register',
    value: function register(app) {

      app.value('compile', this.factory);
    }
  }, {
    key: 'factory',
    value: function factory(element) {}
  }]);

  return CompileProvider;
})(Provider);

HT.app.provider('compile', CompileProvider);
//# sourceMappingURL=ht.js.map