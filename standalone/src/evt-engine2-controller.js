class eventController {
    constructor( ) {
		var oldScope = this;
		
        this.events = [];
		this.eventTyps = [];
		this.functionFire = function( e ) {
            // Entnimm dem Event seinen Typ
            var eventType = e.type;

            // Laufe alle eigenen coEvents durch
            for( var iEvent = 0; iEvent < oldScope.events.length; iEvent++ ) {

                // Prüfe ob das aktuelle coEvent auf den Eventtyp reagieren soll
                if( eventType == oldScope.events[iEvent].eventTyp ) {

                    // Prüfe ob die Aktion in dem highestEl ausgeführt wurde
					var highestEl = (( $( e.target ).is( oldScope.events[iEvent].highestEl ) )
									  ? $( e.target )
									  : $( e.target ).closest( oldScope.events[iEvent].highestEl ));
					
                    if( highestEl !== null ) {

						// Prüfe ob die Aktion in dem highestEl ausgeführt wurde
						if( highestEl.length > 0 ) {

							// Füre das event aus
							oldScope.events[iEvent].eventObj.fire( e );
						}
                    }
                }
            }
        };
    }

    linkEventController() {
        this.eventTyps = [];

        // Laufe alle generierten Events durch
        for( var iEvent = 0; iEvent < this.events.length; iEvent++ ) {
            // Hole den Event Typ
            var eventType = this.events[iEvent].eventTyp.toLowerCase();

            // Und Sammel diese Typen in einem Array
            // Alle redundanzen werden überschrieben und exestieren nur einmalig in diesem Array
            this.eventTyps[eventType] = true;
        }

        var oldScope = this;

        for( var iReqEvtTyps in this.eventTyps ) {
            document.addEventListener( iReqEvtTyps, this.functionFire )
        }
    }

    removeLink() {
		for( var iEventType in this.eventTyps ) {
			document.removeEventListener( iEventType, this.functionFire, true );
		}
    }

    addEvent( coEvent, eventTyp, closestHighestEl ) {
        // Speichert das zur Ausführung übergebene Event
        this.events.push( {
            eventTyp: eventTyp,
            eventObj: coEvent,
            highestEl: closestHighestEl
        } );
    }
}

/*
    // Definiere den EventController
    var evtController = new eventController( );

    // Setze das Event...
    evtController.addEvent(
        new coEvent( targetFunction, targetScope=null, costumParam=null ),
        "click",
        "tree" );

    // Verlinke und setze somit den EventController inkraft
    evtController.linkEventController();
 */