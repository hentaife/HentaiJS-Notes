class App extends Container {
  
  constructor() {
    super();
    
    this.initialized = false;
    this.providers = {};
    this.controllers = {};
    this.directives = {};
  }
  
  provider(name, fn) {
    var provider;

    if(isUndefined(fn)) {
      return this.providers[name];
    }
    
    provider = new fn;
    provider.app = this;
    this.providers[name] = provider;
    
    if(this.initialized) {
      provider.register();
    }
  }
  
  controller(name, fn) {
    this.controllers[name] = fn;
  }
  
  directive(name, fn) {
    this.directives[name] = fn;
  }
  
  coreDirective(name, fn) {
    this.directive(camelCase(HT.prefix + '-' + name), fn)
  }
  
  createController(name) {
    if(!this.controllers[name]) {
      return;
    }
    
    return new Controller(this.invoke(this.controllers[name]));
  }
  
  createDirective(name, controller, element, attrs) {
    if(!this.directives[name]) {
      return;
    }
    
    return new Directive(this.invoke(this.directives[name]), controller, element, attrs);
  }
  
  run($element) {
    forEach(this.providers, function(provider) {
      provider.register();
    });
    
    this.invoke(function(compile) {

      compile($element);
      
    }); 
    
    this.initialized = true;
    
  }
  
}