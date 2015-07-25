'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var isArray = Array.isArray;
var slice = [].slice;
var shift = [].shift;
var getPrototypeOf = Object.getPrototypeOf;
var lowercase = function lowercase(string) {
  return isString(string) ? string.toLowerCase() : string;
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var defineProperty = Object.defineProperty;

var NODE_TYPE_ELEMENT = 1;
var NODE_TYPE_ATTRIBUTE = 2;
var NODE_TYPE_TEXT = 3;
var NODE_TYPE_COMMENT = 8;
var NODE_TYPE_DOCUMENT = 9;
var NODE_TYPE_DOCUMENT_FRAGMENT = 11;

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isString(value) {
  return typeof value === 'string';
}

function isArrayLike(obj) {
  if (obj == null || isWindow(obj)) {
    return false;
  }

  // Support: iOS 8.2 (not reproducible in simulator)
  // "length" in obj used to prevent JIT error (gh-11508)
  var length = "length" in Object(obj) && obj.length;

  if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
    return true;
  }

  return isString(obj) || isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
}

function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}

function isWindow(obj) {
  return obj && obj.window === obj;
}

function forEach(obj, iterator, context) {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else if (isBlankObject(obj)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in obj) {
        iterator.call(context, obj[key], key, obj);
      }
    } else if (typeof obj.hasOwnProperty === 'function') {
      // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else {
      // Slow path for objects which do not have a method `hasOwnProperty`
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
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

function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  });
}

function trim(value) {
  return isString(value) ? value.trim() : value;
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
    this.controllers = {};
    this.directives = {};
  }

  _createClass(App, [{
    key: 'provider',
    value: function provider(name, fn) {
      var provider;

      if (isUndefined(fn)) {
        return this.providers[name];
      }

      provider = new fn();
      provider.app = this;
      this.providers[name] = provider;

      if (this.initialized) {
        provider.register();
      }
    }
  }, {
    key: 'controller',
    value: function controller(name, fn) {
      this.controllers[name] = fn;
    }
  }, {
    key: 'directive',
    value: function directive(name, fn) {
      this.directives[name] = fn;
    }
  }, {
    key: 'coreDirective',
    value: function coreDirective(name, fn) {
      this.directive(camelCase(HT.prefix + '-' + name), fn);
    }
  }, {
    key: 'createController',
    value: function createController(name) {
      if (!this.controllers[name]) {
        return;
      }

      return new Controller(this.invoke(this.controllers[name]));
    }
  }, {
    key: 'createDirective',
    value: function createDirective(name, controller, element, attrs) {
      if (!this.directives[name]) {
        return;
      }

      return new Directive(this.invoke(this.directives[name]), controller, element, attrs);
    }
  }, {
    key: 'run',
    value: function run($element) {
      forEach(this.providers, function (provider) {
        provider.register();
      });

      this.invoke(function (compile) {

        compile($element);
      });

      this.initialized = true;
    }
  }]);

  return App;
})(Container);

var HT;

HT = window.HT || (window.HT = {});

extend(HT, {

  //expose helpers
  isObject: isObject,
  isFunction: isFunction,
  extend: extend,
  merge: merge,
  forEach: forEach,

  prefix: 'ht',

  error: function error(message) {
    console.log(message);
  }
});

HT.app = new App();
HT.$ = jQuery;
HT.app.value('$', HT.$);
HT.app.value('app', HT.app);

var CompileProvider = (function () {
  function CompileProvider() {
    _classCallCheck(this, CompileProvider);
  }

  _createClass(CompileProvider, [{
    key: 'register',
    value: function register() {

      this.app.value('compile', function ($element) {

        return new Compiler($element);
      });
    }
  }]);

  return CompileProvider;
})();

var Compiler = (function () {
  function Compiler($element) {
    _classCallCheck(this, Compiler);

    this.$element = $element;
    this.controller = new Controller({});

    this.run();
  }

  _createClass(Compiler, [{
    key: 'run',
    value: function run() {
      this.controller.compile(this.$element);
    }
  }]);

  return Compiler;
})();

HT.app.provider('compile', CompileProvider);

var Controller = (function () {
  function Controller(data) {
    _classCallCheck(this, Controller);

    var self = this;

    this.model = {
      '$attributes': data
    };

    forEach(data, function (value, key) {
      defineProperty(this.model, key, {
        set: function set(value) {
          this['$attributes'][key] = value;
        },

        get: function get() {
          return this['$attributes'][key];
        }
      });
    }, this);
  }

  _createClass(Controller, [{
    key: 'compile',
    value: function compile(nodeList) {
      for (var i = 0; i < nodeList.length; i++) {

        var node = nodeList[i];
        var directives = Directive.collect(node);
        var context = this.createContext(directives, this);

        context.applyDirectives(node, directives);

        var childNodes = node.childNodes;
        if (childNodes) {
          context.compile(childNodes);
        }
      }
    }
  }, {
    key: 'createContext',
    value: function createContext(directives, parent) {
      var controller = this;

      forEach(directives, function (value, name) {
        if (HT.prefix + 'Controller' === name) {
          controller = HT.app.createController(value, parent);
        }
      });

      return controller;
    }
  }, {
    key: 'applyDirectives',
    value: function applyDirectives(node, directives) {

      forEach(directives, function (value, name) {

        HT.app.createDirective(name, this, node, directives);
      }, this);
    }
  }, {
    key: 'fire',
    value: function fire(expr) {
      var params = arguments;
      shift.apply(params);

      new Function('return this.' + expr).apply(this.model, params);
    }
  }]);

  return Controller;
})();

var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;

var Directive = (function () {
  function Directive(handler, controller, element, attrs) {
    _classCallCheck(this, Directive);

    handler.link(controller, HT.$(element), attrs);
  }

  _createClass(Directive, null, [{
    key: 'normalize',
    value: function normalize(name) {
      return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
  }, {
    key: 'collect',
    value: function collect(node) {
      var nodeType, directives;

      nodeType = node.nodeType;

      if (nodeType === NODE_TYPE_ELEMENT) {
        directives = this.collectElement(node);
      }

      return directives;
    }
  }, {
    key: 'collectElement',
    value: function collectElement(node) {
      var attrs, directives;

      attrs = node.attributes;
      directives = {};

      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        var _name = attr.name;
        var value = trim(attr.value);
        var directiveName = this.normalize(_name);

        directives[directiveName] = value;
      }

      return directives;
    }
  }]);

  return Directive;
})();

var DirectiveHandler = (function () {
  function DirectiveHandler() {
    _classCallCheck(this, DirectiveHandler);

    this.name = '';
  }

  _createClass(DirectiveHandler, [{
    key: 'link',
    value: function link(controller, element, attrs) {
      var name;

      name = this.name;

      element.on(name, function ($event) {
        controller.fire(attrs[camelCase(HT.prefix + '-' + name)], $event);
      });
    }
  }]);

  return DirectiveHandler;
})();

var ClickDirectiveHandler = (function (_DirectiveHandler) {
  _inherits(ClickDirectiveHandler, _DirectiveHandler);

  function ClickDirectiveHandler() {
    _classCallCheck(this, ClickDirectiveHandler);

    _get(Object.getPrototypeOf(ClickDirectiveHandler.prototype), 'constructor', this).call(this);

    this.name = 'click';
  }

  return ClickDirectiveHandler;
})(DirectiveHandler);

HT.app.coreDirective('click', function () {
  return new ClickDirectiveHandler();
});

HT.$(function () {
  var $element = HT.$('[ht-app]');

  if ($element.length > 1) {
    HT.error('multipe bootstrap elements found');
  } else if ($element.length) {
    HT.app.run($element);
  }
});
//# sourceMappingURL=ht.js.map