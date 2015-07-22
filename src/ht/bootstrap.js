HT.$(function() {
  var element = HT.$('[ht-app]');
  
  if(element.length) {
    HT.app.run(element);
  }
});