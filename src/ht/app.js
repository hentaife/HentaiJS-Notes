class App extends Container {
  
  constructor() {
    super();
    
    this.initialized = false;
    this.providers = {};
    this.controllers = {};
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