import App from './core/app';
import Directive from './directive';

var HT;

HT = window.HT || (window.HT = {});

HT.directives = Directive.directives;
HT.app = new App;
HT.$ = jQuery;
HT.app.value('$', HT.$);
HT.app.value('app', HT.app);

HT.$(function() {
  var $element = HT.$('[ht-app]');
  
  if($element.length > 1) {
    HT.error('multipe bootstrap elements found');
  } else if($element.length) {
    HT.app.run($element);
  }
});