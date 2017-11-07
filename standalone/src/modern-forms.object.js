class mskinObject {
    constructor( targetElement ) {
        this.htmlElement = {
			container: targetElement
		};
		this.value = null;
        this.config = mskinObjectConfig;

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

var mskinObjects = {};

$( document ).ready( function() {
	$( ".mskin-object" ).each( function( roundIndex, targetElement ) {
		var elementClasses = $( this ).attr( "class" ).split( " " );
		var mskinObjectCheckerIndex = null;
		for(
		  var elementClassIndex = 0;
		  elementClassIndex < elementClasses.length && mskinObjectCheckerIndex == null;
		  elementClassIndex++ ) {
			  var currentElementClass = elementClasses[elementClassIndex];

			  if( mskinObjectConfig.cssClassTyps.indexOf( currentElementClass ) ) {
				  mskinObjectCheckerIndex = elementClassIndex;
			  }
		}

		if( mskinObjectCheckerIndex !== null ) {
            var getInstantFromObjectName = function( classTypName, targetElement, param=null ) {
                var returnInstanz = null;

                switch( classTypName.toLowerCase() ) {
                    case "mskin-textbox":
                        returnInstanz = new mskinInput( targetElement );
                        break;
                    case "mskin-button":
                        returnInstanz = new mskinButton( targetElement );
                        break;
                    case "mskin-checkbox":
                        returnInstanz = new mskinCheckbox( targetElement );
                        break;
                    case "mskin-radio":
                        returnInstanz = new mskinCheckbox( mskinRadiobox );
                        break;
                    case "mskin-datepicker":
                        if( param !== null )
                            if( typeof param.getYear == "function" )
                                returnInstanz = new mskinCalendar( targetElement, new Date( ) );
                            else
                                console.log( "Parameter ist nicht für einen Datepacker Element vorgesehen!" );
                        else
                            console.log( "Keine für eine Datepicker vorgesehene Datums Parameter übergeben!" );
                        break;
                }

                return ( returnInstanz !== null )
                    ? returnInstanz
                    : false;
            };

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
