class MskinWebpackInitor {
    constructor( ) {
        this.allObjects = [];
        $( ".mskin-object" ).each( function( el, index ) {
            var curEl = $( el );
            var curElmentClasses = curEl.attr( "class" ).split( " " );
            var validInstanzReturn = mskinObjectsInfos.getInstantFromObjectName( curElmentClasses );

            if( validInstanzReturn !== null ) {
                
            }
        });
    }
}

var mskinObjects = {};
