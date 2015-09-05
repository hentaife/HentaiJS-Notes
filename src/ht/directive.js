export default class Directive {
  
  constructor(handler, controller, element, attrs) {
    
    handler.link(controller, HT.$(element), attrs);
    
  }
  
  static normalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  
  static collect(node) {
    var nodeType, directives;
    
    nodeType = node.nodeType;
    
    if(nodeType === NODE_TYPE_ELEMENT) {
      directives = this.collectElement(node);
    }

    return directives;
  }
  
  static collectElement(node) {
    var attrs, directives;
    
    attrs = node.attributes;
    directives = {};
    
    for (let i = 0; i < attrs.length; i++) {
      let attr = attrs[i];
      let name = attr.name;
      let value = trim(attr.value);
      let directiveName = this.normalize(name);
      
      directives[directiveName] = value;
    }
    
    return directives;
  }
}