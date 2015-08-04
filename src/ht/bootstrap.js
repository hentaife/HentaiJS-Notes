import {App} from './app';

HT.$(function() {
  var $element = HT.$('[ht-app]');
  
  if($element.length > 1) {
    HT.error('multipe bootstrap elements found');
  } else if($element.length) {
    HT.app.run($element);
  }
});