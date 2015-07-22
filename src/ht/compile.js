class CompileProvider extends Provider {
  
  register(app) {
    
    app.value('compile', this.factory);
    
  }
  
  factory(element) {
    
  }
  
}

HT.app.provider('compile', CompileProvider);