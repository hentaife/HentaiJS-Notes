class ClickDirectiveHandler extends DirectiveHandler {
  
  constructor() {
    super();
    
    this.name = 'click';
  }
  
}

HT.app.coreDirective('click', function() {
  return new ClickDirectiveHandler;
});