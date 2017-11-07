export class MskinMode {
	constructor( msg=null ) {
		this.modeName = null;
		this.modeMsg = msg;

		this.events = {
			eventHandle: {
				onModeChange: []
			},
			eventFunctions: {

			}
		};
	}

	triggerOnValueChange( newValue ) {
		for( var iEvent = 0; iEvent < this.events.eventHandle.onModeChange.length; iEvent ) {
			this.events.eventHandle.onModeChange[iEvent].fire( newValue );
		}
	}

	setText( modeMessage ) {
		this.modeMsg = modeMessage;
	}

	getMode( ) {
		return this.modeName;
	}

	setMode( newModeKey ) {
		if( newModeKey === "warn" || newModeKey === "error" || newModeKey === "none" ) {
            this.modeName = newModeKey;
			this.triggerOnValueChange( newModeKey );
        }
        else {
            console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine String oder valide! Als Parameter sind nur folgende Strings zugelassen > none, warn, error <" );
        }
	}
}
