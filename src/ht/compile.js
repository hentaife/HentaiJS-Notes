class CompileProvider {
  
  register() {
    
    this.app.value('compile', function($element) {
 
      return new Compiler($element);
      
    });
    
  }
  
}

class Compiler {
  
  constructor($element) {
    this.$element = $element;
    this.controller = new Controller({});
    
    this.run();
  }
  
  run() {
    this.controller.compile(this.$element);
  }
  
}

HT.app.provider('compile', CompileProvider);