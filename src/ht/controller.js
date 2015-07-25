class Controller {
  
  constructor(data) {
    var self = this;
    
    this.model = {
      '$attributes': data
    };
    
    forEach(data, function(value, key) {
      defineProperty(this.model, key, {
        set: function(value) {
          this['$attributes'][key] = value;
        },
        
        get: function() {
          return this['$attributes'][key];
        }
      });
    }, this);
  }
  
  compile(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      
      let node = nodeList[i];
      let directives = Directive.collect(node);
      let context = this.createContext(directives, this);
      
      context.applyDirectives(node, directives);
      
      let childNodes = node.childNodes;
      if(childNodes) {
        context.compile(childNodes);
      }
    }
  }
  
  createContext(directives, parent) {
    var controller = this;
    
    forEach(directives, function(value, name) {
      if(HT.prefix + 'Controller' === name) {
        controller = HT.app.createController(value, parent)
      }
    });
    
    return controller;
  }
  
  applyDirectives(node, directives) {
    
    forEach(directives, function(value, name) {
      
      HT.app.createDirective(name, this, node, directives);
      
    }, this);
    
  }
  
  fire(expr) {
    var params = arguments;
    shift.apply(params);
    
    (new Function('return this.' + expr)).apply(this.model, params);
  }
  
}