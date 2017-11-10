import { MskinObjectConfig } from "./modern-forms.object.config";
import  { MskinMode } from "./modern-forms.mode";
import  { MskinObject } from "./modern-forms.object.webpack-base";

export class MskinInput extends MskinObject {
    constructor( targetElement, isAsso=false )  {
        /* Source Check */
        var styleLinks = false;
        if( MskinObjectConfig.defaultCssRequier ) {
            styleLinks = $( "link[mskin-css-inport=\"full-style\"], link[mskin-css-inport=\"input\"]" );
            if( styleLinks.length == 0 )
                console.error( "Das erstellen des mskinInput Elements wurde" +
                    " abgebrochen! Grund dafuer ist das fehlen der benoetigten Style" +
                    " Informationen... Importieren sie das komplette Style Paket" +
                    " oder das benoetigte Input-Style!" );
        }

        var jsSourceComplete = false;
        var jsLinksModule = $( "script[mskin-js-import]" );
        var jsLinksFullPack = jsLinksModule.is( "[mskin-js-import=\"full-pack\"]" );
        if( jsLinksFullPack )  {
            jsSourceComplete = true;
        }
        else if( jsLinksModule.is( "script[mskin-js-import=\"input\"]" ) )  {
            jsSourceComplete = true;
        }
        else {
            console.error( "Das erstellen des mskinInput Elements wurde" +
                " abgebrochen! Grund dafuer ist das fehlen der benoetigten Style" +
                " Informationen... Importieren sie das komplette Style Paket" +
                " oder das benoetigte Input-Style!" );
        }

        /* Source Check - ENDE */

        if(
        /* CSS Checkout */
        ( !MskinObjectConfig.defaultCssRequier
          || MskinObjectConfig.defaultCssRequier && styleLinks.length > 0 ) &&

        /* JS Checkout */
        jsSourceComplete ) {

    		super( targetElement, true );

            this.htmlElement["input"]  = $( "input", this.htmlElement.container )[0];
            this.htmlElement["header"] = $( ".mskin-object-header", this.htmlElement.container )[0];
            this.htmlElement["clear"]  = $( ".mskin-textbox-cancle", this.htmlElement.container )[0];

    		this.mode = new MskinMode( );

    		// Setze das Event...

    /* Child Event Verbindungen */
    		var oldScope = this;
    		this.events.eventController.addEvent(
    			new CoEvent( oldScope.triggerOnValueChange, this, { type: "onChangeValue", controller: "evtE2controller" } ),
    			"input",
    			".mskin-object-input"
    		);

    		this.events.eventController.addEvent(
    			new CoEvent( oldScope.triggerOnClickTextbox, this, { type: "onClickTextbox", controller: "evtE2controller" } ),
    			"click",
    			".mskin-object-input"
    		);

    		this.events.eventController.addEvent(
    			new CoEvent( oldScope.triggerOnClickClearButton, this, { type: "onClickClearButton", controller: "evtE2controller" } ),
    			"click",
    			".mskin-textbox-cancle"
    		);

    		this.mode.events.eventHandle.onModeChange.push(
    			new CoEvent( oldScope.triggerOnModeChange, oldScope, { type: "onModeChange" } )
    		);

    /*		this.events.eventController.addEvent(
    			new CoEvent( oldScope.triggerOnValueChange, this, { type: "onFocus", controller: "evtE2controller" } ),
    			"focus",
    			".mskin-object-input"
    		);*/

    /* ---- defaultEventFunction ---- */

    		this.events.eventFunctions["fnOnValueChange"] = function( evt ) {
    			console.log( "- OnValueChange", evt );

    			var curVal = $( oldScope.htmlElement.input ).val();

    			if( curVal !== "" ) {
    				$( oldScope.htmlElement.container ).addClass( "has-value" );
    			}
    			else {
    				$( oldScope.htmlElement.container ).removeClass( "has-value" );
    			}
    		};

    		this.events.eventFunctions["fnOnClickClearButton"] = function( evt ) {
    			console.log( "- OnClickClearButton", evt );

    			$( oldScope.htmlElement.input ).val( "" );
    			oldScope.triggerOnValueChange( oldScope, { type: "onChangeValueByClear", controller: "evtE2controller",  },  );
    		};

    /* /Child Event Verbindungen */

            this.eventHandle( isAsso );

    		var oldScope = this;

    		this.events.eventHandle["onModeChange"] = [];
    		this.events.eventHandle["onFocus"] = [];
    		this.events.eventHandle["onClickClearButton"] = [
    			new CoEvent( this.events.eventFunctions.fnOnClickClearButton, this, { type: "onClickClearButton" } )
    		];
    		this.events.eventHandle["onClickTextbox"] = [];
    		this.events.eventHandle["onValueChange"].push(
    			new CoEvent( this.events.eventFunctions.fnOnValueChange, this, { type: "onModeChange" } )
    		);

    /*		this.con_event_host_onValueChange();
    		this.con_event_host_onModeChange();*/
        }
        else {
            return false;
        }
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
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onValueChange.length; iEvent++ ) {
			oldScope.events.eventHandle.onValueChange[iEvent].fire( newValue );
		}
	}

	triggerOnModeChange( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onModeChange.length; iEvent++ ) {
			oldScope.events.eventHandle.onModeChange[iEvent].fire( newValue );
		}
	}

	triggerOnClickClearButton( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onClickClearButton.length; iEvent++ ) {
			oldScope.events.eventHandle.onClickClearButton[iEvent].fire( newValue );
		}
	}

	triggerOnClickTextbox(  ) {

	}
}
