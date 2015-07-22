class App extends Container {
  
  constructor() {
    super();
    
    this.initialized = false;
    this.providers = {};
  }
  
  provider(name, provider) {
    if(isUndefined(provider)) {
      return this.providers[name];
    }
    
    this.providers[name] = new provider;
    
    if(this.initialized) {
      this.providers[name].run();
    }
  }
  
  controller() {
    
  }
  
  run(element) {
    
    forEach(this.providers, function(provider) {
      provider.run(this);
    }, this);
    
    this.invoke(function(compile) {
      
      compile(element);
      
    }); 
    
    this.initialized = true;
    
  }
  
}