class mskinCheckbox extends mskinButton {
	constructor( targetElement, isAsso=false ) {
		super( targetElement, true );
		var oldScope = this;
		
		this.events.eventHandle["onChangeStatus"] = [];
		
		this.htmlElement["container"] = null;
		this.htmlElement["input"] = targetElement;
		this.htmlElement["label"] = null;
		
/* Child Event Verbindungen */
		this.events.eventController.addEvent(
			new CoEvent( oldScope.preTriggerOnChangeStatus, this, { type: "onChangeStatus", controller: "evtE2controller" } ),
			"click",
			".mskin-object"
		);
		
		this.events.eventHandle.onChangeStatus.push(
			new CoEvent( function( a, evt ) { console.log( "changeStatus:", evt ); }, oldScope, { type: "onChangeStatus" } )
		);
		
		if( !isAsso )
			this.events.eventController.linkEventController( ); 
		
/* ---- defaultEventFunction ---- */
		
		this.events.eventFunctions["fnOnChangeStatus"] = function( evt ) {
			console.log( "- OnChangeStatus", evt );
			
			oldScope.triggerOnClick( oldScope, { type: "onClick", controller: "evtE2controller",  },  );
		};
    }
	
/* Eigene Event trigger Methoden */
	
	preTriggerOnChangeStatus( oldScope, evtInfo, newValue ) {
		console.log( "oldScope:", oldScope, "evtInfo:", evtInfo, "newValue:", newValue );
	}
	
	triggerOnChangeStatus( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onChangeStatus.length; iEvent++ ) {
			oldScope.events.eventHandle.onChangeStatus[iEvent].fire( newValue );
		}
	}
}