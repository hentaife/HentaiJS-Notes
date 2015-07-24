class Controller {
  
  constructor(data) {
    
    this.model = {};
    
    forEach(data, function(value, key) {
      defineProperty(this.model, key, {
        set: function(value) {
          
        }
      });
    }, this);
  }
  
}