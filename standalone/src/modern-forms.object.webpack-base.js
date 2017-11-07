class mskinObject {
    constructor( targetElement ) {

        this.htmlElement = {
			container: targetElement
		};
		this.value = null;
        this.config = new MskinObjectConfig( true );

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

var mskinObjectsInfos = {
    "cssClassTyps": [ "mskin-textbox", "mskin-button", "mskin-checkbox", "mskin-radio", "mskin-datepicker" ],
    "getInstanzFromObjecClasses" = function( classTypNames, targetElement, param=null ) {
        var foundMskinInstanz = null;
        for( var iName=0; iName < classTypNames.length && foundMskinInstanz == null; iName ) {
            var returnInstanz = null;

            switch( classTypName.toLowerCase() ) {
                "mskin-textbox":
                    returnInstanz = new mskinInput( targetElement );
                    break;
                "mskin-button":
                    returnInstanz = new mskinButton( targetElement );
                    break;
                "mskin-checkbox":
                    returnInstanz = new mskinCheckbox( targetElement );
                    break;
                "mskin-radio":
                    returnInstanz = new mskinCheckbox( mskinRadiobox );
                    break;
                "mskin-datepicker":
                    if( param !== null )
                        if( typeof param.getYear == "function" )
                            returnInstanz = new mskinCalendar( targetElement, new Date( ) );
                        else
                            console.log( "Parameter ist nicht für einen Datepacker Element vorgesehen!" );
                    else
                        console.log( "Keine für eine Datepicker vorgesehene Datums Parameter übergeben!" );
                    break;
            }

			if( $( targetElement ).is( "[mskin-object-id]") ) {
				var mskinObjectId = $( this ).attr( "mskin-object-id" );

				foundMskinInstanz = {
                    "object": {
    					"init": returnInstanz,
    					"mainElement": $( targetElement ).find( ".mskin-object-input:first-child" )[0],
    					"containerElement": targetElement
                    },
                    "id": mskinObjectId
				};
            }
            foundMskinInstanz = ( returnInstanz !== null )
                ? returnInstanz
                : null;
        }

        return foundMskinInstanz;
    }
};

if( !mskinObjectConfig.webpackMode ) {
    $( document ).ready( function() {
    	$( ".mskin-object" ).each( function( roundIndex, targetElement ) {
    		var elementClasses = $( this ).attr( "class" ).split( " " );
    		var mskinObjectCheckerIndex = null;
    		for(
    		  var elementClassIndex = 0;
    		  elementClassIndex < elementClasses.length && mskinObjectCheckerIndex == null;
    		  elementClassIndex++ ) {
    			  var currentElementClass = elementClasses[elementClassIndex];

    			  if( mskinObjectsInfos.cssClassTyps.indexOf( currentElementClass ) ) {
    				  mskinObjectCheckerIndex = elementClassIndex;
    			  }
    		}

    		if( mskinObjectCheckerIndex !== null ) {

    			if( $( targetElement ).is( "[mskin-object-id]") ) {

    				var mskinObjectId = $( this ).attr( "mskin-object-id" );

    				mskinObjects[mskinObjectId] = {
    					"init": new mskinInput( targetElement ),
    					"mainElement": $( targetElement ).find( ".mskin-object-input:first-child" )[0],
    					"containerElement": targetElement
    				};
    			}
    			else {
    				$( targetElement ).attr( "mskin-object-noInitialed", "true" );
    			}
    		}
    		else {
    			console.error( "Modern Skin - Error: Es wurde keine Valide MSkin Css Klasse gefunden!" );
    		}
    	});
    });
}
