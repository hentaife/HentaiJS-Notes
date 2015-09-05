class ClickDirective extends EventDirective {
  
  constructor() {
    super();
    
    this.name = 'click';
  }
  
}

HT.app.coreDirective('click', function() {
  return new ClickDirectiveHandler;
});