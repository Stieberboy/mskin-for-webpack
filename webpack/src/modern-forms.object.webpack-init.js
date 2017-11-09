import { MskinObjectConfig } from "./modern-forms.object.config";
import { MskinInput } from "./modern-forms.input";
import { MskinButton } from "./modern-forms.button";

export class MskinObjectInitor {
    constructor( targetContainer=document ) {
        this.cssClassTyps = MskinObjectConfig.cssClassTyps;
        this.allNamedInits = [];

        var oldScope = this;

        $( ".mskin-object[mskin-object-id]" ).each( function( index, mskinElement ) {
            var getMskinId = $( mskinElement ).attr( "mskin-object-id" );
            if( typeof getMskinId !== "undefined" ) {
                var returnInit = oldScope.getInstanzFromObjecClasses( mskinElement );
                oldScope.allNamedInits[getMskinId] = returnInit;
            }
        });
    }

    getInstanzFromObjecClasses( targetElement, param=null ) {
        var classTypNames = $( targetElement ).attr( "class" ).split( " " );

        var foundMskinInstanz = null;
        for( var iName=0; iName < classTypNames.length && foundMskinInstanz == null; iName++ ) {
            var returnInstanz = null;

            switch( classTypNames[iName].toLowerCase() ) {
                case "mskin-textbox":
                    returnInstanz = new MskinInput( targetElement );
                    break;
                case "mskin-button":
                    returnInstanz = new MskinButton( targetElement );
                    break;
                case "mskin-checkbox":
                    returnInstanz = new MskinCheckbox( targetElement );
                    break;
                case "mskin-radio":
                    returnInstanz = new MskinCheckbox( mskinRadiobox );
                    break;
                case "mskin-datepicker":
                    if( param !== null )
                        if( typeof param.getYear == "function" )
                            returnInstanz = new MskinCalendar( targetElement, new Date( ) );
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
}
