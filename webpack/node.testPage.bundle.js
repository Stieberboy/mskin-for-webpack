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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_modern_forms_object_js__ = __webpack_require__(1);


document.write("It works.");


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* unused harmony export default */


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


/***/ })
/******/ ]);
