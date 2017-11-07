class eventHost {
    constructor( ) {
		var oldScope = this;
		
        this.memory.eventCtrl = [];
		this.eventTyps = {
			"onblur", 					"onerror", 				"onfocus", 				"onload",
			"onresize", 				"onscroll", 			"onbeforeunload", 		"onhashchange",
			"onlanguagechange", 		"onmessage", 			"onmessageerror", 		"onoffline",
			"ononline", 				"onpagehide", 			"onpageshow",			"onpopstate",
			"onrejectionhandled", 		"onstorage", 			"onunhandledrejection", "onunload",
			"onabort", 					"oncancel", 			"oncanplay", 			"oncanplaythrough",
			"onchange", 				"onclick", 				"onclose", 				"oncontextmenu",
			"oncuechange", 				"ondblclick", 			"ondrag", 				"ondragend",
			"ondragenter", 				"ondragleave", 			"ondragover", 			"ondragstart",
			"ondrop", 					"ondurationchange", 	"onemptied", 			"onended",
			"oninput", 					"oninvalid", 			"onkeydown", 			"onkeypress",
			"onkeyup",					"onloadeddata", 		"onloadedmetadata", 	"onloadstart",
			"onmousedown",				"onmouseenter",			"onmouseleave", 		"onmousemove",
			"onmouseout", 				"onmouseover", 			"onmouseup", 			"onmousewheel",
			"onpause", 					"onplay", 				"onplaying", 			"onprogress",
			"onratechange",				"onreset", 				"onseeked", 			"onseeking",
			"onselect", 				"onstalled", 			"onsubmit", 			"onsuspend",
			"ontimeupdate", 			"ontoggle", 			"onvolumechange", 		"onwaiting",
			"onwheel", 					"ongotpointercapture", 	"onlostpointercapture", "onpointerdown",
			"onpointermove", 			"onpointerup", 			"onpointercancel", 		"onpointerover",
			"onpointerout", 			"onpointerenter", 		"onpointerleave", 		"onauxclick",
			"onbeforecopy", 			"onbeforecut", 			"onbeforepaste", 		"oncopy",
			"oncut", 					"onpaste", 				"onsearch", 			"onselectstart",
			"onwebkitfullscreenchange", "onwebkitfullscreenerror" };
		
		this.functionFire = function( e ) {
			oldScope
        };
    }

    linkEventController() {
		var oldScope = this;
		for( var eventTyp in this.eventTyps ) {
			document.body.addEventListener( eventTyp, function( evt ) {
				oldScope.functionFire( evt );
			}, false );
		}
    }

    removeLink() {
		for( var iEventType in this.eventTyps ) {
			document.removeEventListener( iEventType, this.functionFire, true );
		}
    }

    addControler( coEvent, eventTyp, closestHighestEl ) {
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