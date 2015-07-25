class DirectiveHandler {
  
  constructor() {
    
    this.name = '';
  }
  
  link(controller, element, attrs) {
    var name;
    
    name = this.name;
    
    element.on(name, function($event) {
      controller.fire(attrs[camelCase(HT.prefix + '-' + name)], $event);
    });
  }
  
}