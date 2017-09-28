class mskinInput extends mskinObject {
    constructor( targetElement ) {
		super( targetElement );
		
        this.htmlElement["input"] = $( "input", this.htmlElement.container );
        this.htmlElement["header"] = $( ".mskin-object-header", this.htmlElement.container );
		this.mode = new mskinMode( );

		// Setze das Event...
		
/* Child Event Verbindungen */
		var oldScope = this;
		this.events.eventHandle.onValueChange.push(
			new CoEvent( oldScope.triggerOnValueChange, oldScope, { type: "onValueChange" } )
		);
		
		this.mode.events.eventHandle.onModeChange.push(
			new CoEvent( oldScope.triggerOnModeChange, oldScope, { type: "onModeChange" } )
		);
		
		evtController.addEvent(
			new CoEvent( oldScope.triggerOnValueChange, this, { "type": "onFocus", controller: "evtE2controller" } ),
			"focus",
			".mskin-object-input" );
		
/* /Child Event Verbindungen */
		
		var oldScope = this;
		
		this.events = {
			eventController: evtController,
			eventHandle: {
				onValueChange: [],
				onModeChange: [],
				onFocus: []
			},
			eventFunctions: {
				fnOnValueChange: function( evt ) {
					console.log( "- OnValueChange", evt );
				}
			}
		};
		
		this.events.eventHandle.onValueChange.push(
			this.events.eventFunctions.fnOnValueChange
		)
		
		this.con_event_host_onValueChange();
		this.con_event_host_onModeChange();
    }
	
	/* Child Event Verbindungen */
	
	con_event_host_onValueChange( ) {
		var oldScope = this;
		this.events.eventHandle.onValueChange.push(
			new CoEvent( oldScope.triggerOnValueChange, this, { type: "onValueChange" } )
		);
	}
	
	
	con_event_host_onModeChange( ) {
		var oldScope = this;
		this.mode.events.eventHandle.onModeChange.push(
			new CoEvent( oldScope.triggerOnModeChange, this, { type: "onModeChange" } )
		);
	}
	
	/* Eigene Event trigger Methoden */
	
	triggerOnValueChange( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onValueChange.length; iEvent ) {
			oldScope.events.eventHandle.onValueChange[iEvent].fire( newValue );
		}
	}
	
	triggerOnModeChange( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onModeChange.length; iEvent ) {
			oldScope.events.eventHandle.onModeChange[iEvent].fire( newValue );
		}
	}
}