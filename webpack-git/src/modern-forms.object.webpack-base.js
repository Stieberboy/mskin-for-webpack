import { MskinObjectConfig } from "./modern-forms.object.config";

export class MskinObject {
    constructor( targetElement ) {

        this.htmlElement = {
			container: targetElement
		};
		this.value = null;
        this.config = MskinObjectConfig;

		// Definiere den EventController
		var tmp_evtController = new eventController( );

		// @todo Verlinke und setze somit den EventController inkraft
		//evtController.linkEventController( );

		this.events = {
			eventController: tmp_evtController,
			eventHandle: {
				onValueChange: []
			},
			eventFunctions: {}
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
