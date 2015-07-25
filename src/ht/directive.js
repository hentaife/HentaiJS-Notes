var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;

class Directive {
  
  static normalize() {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  
  static collect(node) {
    var nodeType;
    
    nodeType = node.nodeType;
    
    if(nodeType === NODE_TYPE_ELEMENT) {
      this.collectElement(node);
    }

  }
  
  static collectElement(node) {
    
  }
}