/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MskinObjectConfig = {
    "webpackMode": true,
    "cssClassTyps": [ "mskin-textbox", "mskin-button", "mskin-checkbox", "mskin-radio", "mskin-datepicker" ],
    "defaultCssRequier": true
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MskinObjectConfig;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MskinMode {
	constructor( msg=null ) {
		this.modeName = null;
		this.modeMsg = msg;

		this.events = {
			eventHandle: {
				onModeChange: []
			},
			eventFunctions: {

			}
		};
	}

	triggerOnValueChange( newValue ) {
		for( var iEvent = 0; iEvent < this.events.eventHandle.onModeChange.length; iEvent ) {
			this.events.eventHandle.onModeChange[iEvent].fire( newValue );
		}
	}

	setText( modeMessage ) {
		this.modeMsg = modeMessage;
	}

	getMode( ) {
		return this.modeName;
	}

	setMode( newModeKey ) {
		if( newModeKey === "warn" || newModeKey === "error" || newModeKey === "none" ) {
            this.modeName = newModeKey;
			this.triggerOnValueChange( newModeKey );
        }
        else {
            console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine String oder valide! Als Parameter sind nur folgende Strings zugelassen > none, warn, error <" );
        }
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MskinMode;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__ = __webpack_require__(0);


class MskinObject {
    constructor( targetElement ) {

        this.htmlElement = {
			container: targetElement
		};
		this.value = null;
        this.config = __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__["a" /* MskinObjectConfig */];

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
/* harmony export (immutable) */ __webpack_exports__["a"] = MskinObject;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_modern_forms_object_webpack_init__ = __webpack_require__(4);


var mskinElementInitor = new __WEBPACK_IMPORTED_MODULE_0__src_modern_forms_object_webpack_init__["a" /* MskinObjectInitor */]();
console.log( mskinElementInitor );


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modern_forms_input__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modern_forms_button__ = __webpack_require__(6);




class MskinObjectInitor {
    constructor( targetContainer=document ) {
        this.cssClassTyps = __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__["a" /* MskinObjectConfig */].cssClassTyps;
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
                    returnInstanz = new __WEBPACK_IMPORTED_MODULE_1__modern_forms_input__["a" /* MskinInput */]( targetElement );
                    break;
                case "mskin-button":
                    returnInstanz = new __WEBPACK_IMPORTED_MODULE_2__modern_forms_button__["a" /* MskinButton */]( targetElement );
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MskinObjectInitor;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modern_forms_mode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modern_forms_object_webpack_base__ = __webpack_require__(2);




class MskinInput extends __WEBPACK_IMPORTED_MODULE_2__modern_forms_object_webpack_base__["a" /* MskinObject */] {
    constructor( targetElement, isAsso=false )  {
        /* Source Check */
        var styleLinks = false;
        if( __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__["a" /* MskinObjectConfig */].defaultCssRequier ) {
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
        ( !__WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__["a" /* MskinObjectConfig */].defaultCssRequier
          || __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__["a" /* MskinObjectConfig */].defaultCssRequier && styleLinks.length > 0 ) &&

        /* JS Checkout */
        jsSourceComplete ) {

    		super( targetElement );

            this.htmlElement["input"]  = $( "input", this.htmlElement.container )[0];
            this.htmlElement["header"] = $( ".mskin-object-header", this.htmlElement.container )[0];
            this.htmlElement["clear"]  = $( ".mskin-textbox-cancle", this.htmlElement.container )[0];

    		this.mode = new __WEBPACK_IMPORTED_MODULE_1__modern_forms_mode__["a" /* MskinMode */]( );

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

    		this.events.eventController.linkEventController( );

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
/* harmony export (immutable) */ __webpack_exports__["a"] = MskinInput;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modern_forms_object_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modern_forms_mode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modern_forms_object_webpack_base__ = __webpack_require__(2);




class MskinButton extends __WEBPACK_IMPORTED_MODULE_2__modern_forms_object_webpack_base__["a" /* MskinObject */] {
    constructor( targetElement, isAsso=false ) {
		super( targetElement, true );

		// Setze das Event...

/* /Child Event Verbindungen */
		var oldScope = this;

		this.events.eventHandle["onMouseOver"] = [];
		this.events.eventHandle["onClick"] = [];

/* Child Event Verbindungen */
		var oldScope = this;
		this.events.eventController.addEvent(
			new CoEvent( oldScope.triggerOnMouseOver, this, { type: "onMouseOver", controller: "evtE2controller" } ),
			"mouseover",
			".mskin-object"
		);

		this.events.eventController.addEvent(
			new CoEvent( oldScope.triggerOnClick, this, { type: "onClick", controller: "evtE2controller" } ),
			"click",
			".mskin-object"
		);

		this.events.eventHandle.onMouseOver.push(
			new CoEvent( function( a, evt ) { console.log( "mouseOver:", evt ); }, oldScope, { type: "onMouseOver" } )
		);

		this.events.eventHandle.onClick.push(
			new CoEvent( function( a, evt ) { console.log( "click:", evt ); }, oldScope, { type: "onClick" } )
		);

		if( !isAsso )
			this.events.eventController.linkEventController( );

/* ---- defaultEventFunction ---- */

		this.events.eventFunctions["fnOnClick"] = function( evt ) {
			console.log( "- OnClick", evt );

			oldScope.triggerOnClick( oldScope, { type: "onClick", controller: "evtE2controller",  },  );
		};

		this.events.eventFunctions["fnOnMouseOver"] = function( evt ) {
			console.log( "- OnMouseOver", evt );

			/*oldScope.triggerOnMouseOver( oldScope, { type: "onMouseOver", controller: "evtE2controller",  },  );*/
		};
    }

/* Eigene Event trigger Methoden */

	triggerOnMouseOver( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onMouseOver.length; iEvent++ ) {
			oldScope.events.eventHandle.onMouseOver[iEvent].fire( newValue );
		}
	}

	triggerOnClick( oldScope, evtInfo, newValue ) {
		for( var iEvent = 0; iEvent < oldScope.events.eventHandle.onClick.length; iEvent++ ) {
			oldScope.events.eventHandle.onClick[iEvent].fire( newValue );
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MskinButton;



/***/ })
/******/ ]);