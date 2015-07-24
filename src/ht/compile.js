class CompileProvider {
  
  register() {
    
    this.app.value('compile', function(element) {
 
      return new Compiler(element);
      
    });
    
  }
  
}

class Compiler {
  
  constructor(element) {
    this.element = element;
    
    this.run();
  }
  
  run() {
    this.compileNotes(this.element);
  }
  
  compileNotes(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      
      let node = nodeList[i];
      let childNodes = node.childNodes;
      
      if(childNodes) {
        this.compileNotes(childNodes);
      }
    }
  }
  
}

HT.app.provider('compile', CompileProvider);