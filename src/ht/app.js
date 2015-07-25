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
    var controller;
    
    if(isUndefined(fn)) {
      return this.controllers[name];
    }
    
    controller = new Controller(this.invoke(fn));
    this.controllers[name] = controller;
  }
  
  directive(name, fn) {
    this.directives[name] = new Directive(this.invoke(fn));
  }
  
  coreDirective(name) {
    this.directive(HT.prefix + name, fn)
  }
  
  run(element) {
    forEach(this.providers, function(provider) {
      provider.register();
    });
    
    this.invoke(function(compile) {

      compile(element);
      
    }); 
    
    this.initialized = true;
    
  }
  
}