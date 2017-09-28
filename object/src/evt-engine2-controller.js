class eventController {
    constructor( ) {
        this.events = [];
    }

    linkEventController() {
        var requiredEventTyps = [];

        // Laufe alle generierten Events durch
        for( var iEvent = 0; iEvent < this.events.length; iEvent++ ) {
            // Hole den Event Typ
            var eventType = this.events[iEvent].eventTyp.toLowerCase();

            // Und Sammel diese Typen in einem Array
            // Alle redundanzen werden überschrieben und exestieren nur einmalig in diesem Array
            requiredEventTyps[eventType] = true;
        }

        var oldscope = this;

        var fireEvent = function ( e ) {
            // Entnimm dem Event seinen Typ
            var eventType = e.type;

            // Laufe alle eigenen coEvents durch
            for( var iEvent = 0; iEvent < oldscope.events.length; iEvent++ ) {

                // Prüfe ob das aktuelle coEvent auf den Eventtyp reagieren soll
                if( eventType == oldscope.events[iEvent].eventTyp ) {

                    // Prüfe ob die Aktion in dem highestEl ausgeführt wurde
                    if( $( e.target ).closest( oldscope.events[iEvent].highestEl ) !== null ) {

                        // Füre das event aus
                        oldscope.events[iEvent].eventObj.fire( e );
                    }
                }
            }
        };

        for( var iReqEvtTyps in requiredEventTyps ) {
            document.addEventListener( iReqEvtTyps, fireEvent )
        }
    }

    removeLink() {

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