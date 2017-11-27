import { MskinObjectConfig } from "./modern-forms.object.config";
import { MskinObjectInitor } from "./modern-forms.interact.key-controll.js";

export class MskinKeyBordControll {
    construct( ) {
		// Definiere den EventController
		var tmp_evtController = new eventController( );

		// @todo Verlinke und setze somit den EventController inkraft
		//evtController.linkEventController( );
        this.events.eventController.linkEventController( );

		this.eventController = tmp_evtControlle;
		this.eventHandle: {
                // Arrow Pad
                "arrowTop": [],
                "arrowRight": [],
                "arrowBottom": [],
                "arrowLeft": [],

                // Num Pad
                "numSlash": [],
                "numMulti": [],
                "numMinus": [],
                "numPlus": [],
                "numEnter": [],

                // Command Keys
                "cmdEscape": [],
                "cmdTabulator": [],
                "cmdCapslock": [],
                "cmdShiftLeft": [],
                "cmdCtrlLeft": [],
                "cmdAltLeft": [],
                "cmdAltRight": [],
                "cmdContextMenu": [],
                "cmdControllRight": [],
                "cmdShiftRechts": [],
                "cmdEnter": [],
                "cmdAltLeft": [],

                // Main Keys 26
                "a":[], "b":[], "c":[], "d":[], "e":[],
                "f":[], "g":[], "h":[], "i":[], "j":[],
                "k":[], "l":[], "m":[], "n":[], "o":[],
                "p":[], "q":[], "r":[], "s":[], "t":[],
                "u":[], "v":[], "w":[], "x":[], "y":[],
                "z":[]
			},
			eventFunctions: {}
		};

        if( MskinObjectConfig.debug.consolePrintEventTrigger ) {
            var oldScope = this;

            for( var eventName in this.eventHandle ) {
                var eventOnText = "onKeyPress" + eventName.charAt(0).toUpperCase() + eventName.slice(1);

        		this.eventController.addEvent(
        			new CoEvent( oldScope.triggerOnClickTextbox, oldScope, { type: eventOnText, controller: "evtE2controller" } ),
        			"keypress",
        			".mskin-object-input"
        		);
            }
        }
    }
}
