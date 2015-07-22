var HT;

HT = window.HT || (window.HT = {});

extend(HT, {
  isObject,
  isFunction,
  extend,
  merge
});

HT.app = new App;
HT.$ = jQuery;
HT.app.value('$', HT.$);
HT.app.value('app', HT.app);