export default {
  NODE_TYPE_ELEMENT: 1,
  
  NODE_TYPE_ATTRIBUTE: 2,
  
  NODE_TYPE_TEXT: 3,
  
  NODE_TYPE_COMMENT: 8,
  
  NODE_TYPE_DOCUMENT: 9,
  
  NODE_TYPE_DOCUMENT_FRAGMENT: 11,
  
  SPECIAL_CHARS_REGEXP: /([\:\-\_]+(.))/g,
  
  PREFIX_REGEXP: /^((?:x|data)[\:\-_])/i
  
};