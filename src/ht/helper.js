export default {
  
  isArray: Array.isArray,
  
  slice: Array.slice;
  
  shift: Array.shift,
  
  getPrototypeOf: Object.getPrototypeOf,
  
  lowercase(string) {
    return isString(string) ? string.toLowerCase() : string;
  },
  
  hasOwnProperty: Object.prototype.hasOwnProperty,
  
  defineProperty: Object.defineProperty;
  
  isObject() {
    return value !== null && typeof value === 'object';
  },
  
  isFunction() {
    return typeof value === 'function';
  },
  
  isUndefined() {
    return typeof value === 'undefined';
  },
  
  isString() {
    return typeof value === 'string';
  },
  
  isArrayLike() {
    if (obj == null || isWindow(obj)) {
      return false;
    }

    // Support: iOS 8.2 (not reproducible in simulator)
    // "length" in obj used to prevent JIT error (gh-11508)
    var length = "length" in Object(obj) && obj.length;

    if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
      return true;
    }

    return isString(obj) || isArray(obj) || length === 0 ||
           typeof length === 'number' && length > 0 && (length - 1) in obj;
  },
  
  isBlankObject() {
    
  },
  
  isBlankObject(value) {
    return value !== null && typeof value === 'object' && !getPrototypeOf(value);
  },

  isWindow(obj) {
    return obj && obj.window === obj;
  },

  forEach(obj, iterator, context) {
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
  },

  baseExtend(dst, objs, deep) {
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
  },

  extend(dst) {
    return baseExtend(dst, slice.call(arguments, 1), false);
  },

  merge(dst) {
    return baseExtend(dst, slice.call(arguments, 1), true);
  },

  camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      });
  },

  trim(value) {
    return isString(value) ? value.trim() : value;
  }
  
};

