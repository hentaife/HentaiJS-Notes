
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