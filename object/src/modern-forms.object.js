class mskinObject {
    constructor( targetElement ) {
        this.htmlElement = {
			container: targetElement
		};
		this.value = null;
		
		// Definiere den EventController
		var evtController = new eventController( );
		
		// @todo Verlinke und setze somit den EventController inkraft
		//evtController.linkEventController( ); 
		
		this.events = {
			eventController: evtController,
			eventHandle: {
				onValueChange: function( ) {
					
				}
			}
		};
    }
	
	getValue( ) { 
		return this.value;
	}
	
	setValue( newValue ) {
		this.value = newValue;
	}
	
	hasValue( ) { 
		return this.value !== null;
	}
}