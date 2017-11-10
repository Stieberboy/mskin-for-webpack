import { MskinObjectConfig } from "./modern-forms.object.config";
import  { MskinMode } from "./modern-forms.mode";
import  { MskinObject } from "./modern-forms.object.webpack-base";

export class MskinButton extends MskinObject {
    constructor( targetElement, isAsso=false ) {
		super( targetElement, true );

		// Setze das Event...

/* /Child Event Verbindungen */
		var oldScope = this;

		this.events.eventHandle["onMouseOver"] = [];
		this.events.eventHandle["onClick"] = [];

/* Child Event Verbindungen */
		this.events.eventController.addEvent(
			new CoEvent( oldScope.triggerOnMouseOver, this, { type: "onMouseOver", controller: "evtE2controller" } ),
			"mouseover",
			".mskin-object"
		);

		this.events.eventController.addEvent(
			new CoEvent( oldScope.triggerOnClick, this, { type: "onClick", controller: "evtE2controller" } ),
			"click",
			".mskin-object"
		);

		this.events.eventHandle.onMouseOver.push(
			new CoEvent( function( a, evt ) { console.log( "mouseOver:", evt ); }, oldScope, { type: "onMouseOver" } )
		);

		this.events.eventHandle.onClick.push(
			new CoEvent( function( a, evt ) { console.log( "click:", evt ); }, oldScope, { type: "onClick" } )
		);

        this.eventHandle( isAsso );

/* ---- defaultEventFunction ---- */

		this.events.eventFunctions["fnOnClick"] = function( evt ) {
			console.log( "- OnClick", evt );

			oldScope.triggerOnClick( oldScope, { type: "onClick", controller: "evtE2controller",  },  );
		};

		this.events.eventFunctions["fnOnMouseOver"] = function( evt ) {
			console.log( "- OnMouseOver", evt );

			/*oldScope.triggerOnMouseOver( oldScope, { type: "onMouseOver", controller: "evtE2controller",  },  );*/
		};
    }

/* Eigene Event trigger Methoden */

	triggerOnMouseOver( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onMouseOver.length; iEvent++ ) {
			oldScope.events.eventHandle.onMouseOver[iEvent].fire( newValue );
		}
	}

	triggerOnClick( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onClick.length; iEvent++ ) {
			oldScope.events.eventHandle.onClick[iEvent].fire( newValue );
		}
	}
}
