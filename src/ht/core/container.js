export default class Container {
  
  constructor() {
    this.values = {};
  }
  
  value(name, value) {
    if(isUndefined(value)) {
      return this.values[name];
    }
    
    this.values[name] = value;
  }
  
  invoke(fn, self) {
    var names, length, args;
    
    args = [];
    names = this.annotate(fn);
    
    for (let i = 0, length = names.length; i < length; i++) {
      args.push(this.value(names[i]));
    }
    
    if (isArray(fn)) {
      fn = fn[length];
    }
    
    return fn.apply(self, args);
  }
  
  annotate(fn) {
    var last, fnText, argDecl, names;
    
    if(isArray(fn)) {
      last = fn.length - 1;
      return fn.slice(0, last);
    }
    
    names = [];
    fnText = fn.toString().replace(STRIP_COMMENTS, '');
    argDecl = fnText.match(FN_ARGS);
    forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
      arg.replace(FN_ARG, function(all, underscore, name) {
        names.push(name);
      });
    });
    
    return names;
  }
  
}