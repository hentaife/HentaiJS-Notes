/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _coreApp = __webpack_require__(3);

	var _coreApp2 = _interopRequireDefault(_coreApp);

	var _directive = __webpack_require__(2);

	var _directive2 = _interopRequireDefault(_directive);

	var HT;

	HT = window.HT || (window.HT = {});

	HT.directives = _directive2['default'].directives;
	HT.app = new _coreApp2['default']();
	HT.$ = jQuery;
	HT.app.value('$', HT.$);
	HT.app.value('app', HT.app);

	HT.$(function () {
	  var $element = HT.$('[ht-app]');

	  if ($element.length > 1) {
	    HT.error('multipe bootstrap elements found');
	  } else if ($element.length) {
	    HT.app.run($element);
	  }
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

	exports['default'] = Directive;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _container = __webpack_require__(4);

	var _container2 = _interopRequireDefault(_container);

	var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

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
	})(_container2['default']);

	exports['default'] = App;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

	exports['default'] = Container;
	module.exports = exports['default'];

/***/ }
/******/ ]);