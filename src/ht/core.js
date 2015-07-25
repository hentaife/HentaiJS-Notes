var HT;

HT = window.HT || (window.HT = {});

extend(HT, {
  
  //expose helpers
  isObject,
  isFunction,
  extend,
  merge,
  forEach,
  
  prefix: 'ht',
  
  error(message) {
    console.log(message);
  }
});

HT.app = new App;
HT.$ = jQuery;
HT.app.value('$', HT.$);
HT.app.value('app', HT.app);