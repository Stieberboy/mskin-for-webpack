import { MskinObjectConfig } from "./modern-forms.object.config";
import { MskinObjectStatics } from "./modern-forms.statics.js";

export class MskinKeyBoardController {
    constructor( htmlParentSelector ) {
        var oldScope = this;

		this.eventController = new eventController( );

		this.eventHandle = {};

        for( var keyName in MskinObjectStatics.module.keyBoardController.keyMap ) {
            oldScope.eventHandle[keyName] = [];
        }


		this.eventController.addEvent(
			new CoEvent( oldScope.triggerOnPressKey, oldScope, { type: "onKeyPress", controller: "evtE2controller" } ),
			"keypress",
			htmlParentSelector
		);

        if( MskinObjectConfig.debug.consolePrintEventTrigger ) {
            var oldScope = this;

            for( var eventName in this.eventHandle ) {
                var eventOnText = "onKeyPress" + eventName.charAt(0).toUpperCase() + eventName.slice(1);
                this.eventHandle[eventName].push(
                    new CoEvent( function( oldScope, evtInfo, onPressKeyEvent ) {
                        console.log( "Tastendruck! => " + onPressKeyEvent.keyID + " - " + onPressKeyEvent.keyName );
                    }, oldScope, { type: "onKeyPress", controller: "evtE2controller", debugMsg:true },
                    "KeyPress",
                    "onKeyPress" )
                );
            }
        }

        this.eventController.linkEventController( );
    }

    triggerOnPressKey( oldScope, evtInfo, onPressKeyEvent ) {
        var keyID = onPressKeyEvent.keyCode;
        var keyMapByIds = oldScope.getKeyMapById();

        if( keyMapByIds.hasOwnProperty( keyID ) ) {
            var fnEventFieldName = keyMapByIds[keyID];
            var allEventOfKey = oldScope.eventHandle[fnEventFieldName];

            for( var iEventOfKey=0; iEventOfKey < allEventOfKey.length; iEventOfKey++ ) {
                allEventOfKey[iEventOfKey].fire( { "keyID": keyID, "keyName":fnEventFieldName });
            }
        }
        else if( MskinObjectConfig.debug.consolePrintEventTrigger ) {
            console.warn( "Nicht gelisteter keyCode ausgelöst! onKeyPress => keyCode: " + keyID );
        }
    }

    getKeyMapByName() {
        return MskinObjectStatics.module.keyBoardController.keyMap;
    }

    getKeyMapById() {
        var tmpReturn = {};
        var configKeyMap = MskinObjectStatics.module.keyBoardController.keyMap;

        for( var keyName in configKeyMap ) {
            tmpReturn[ configKeyMap[keyName] ] = keyName;
        }

        return tmpReturn;
    }
}
