class Calendar {
    
    /**
     * Erstelle ein neues Kalender-Objekt mit der relation zu einem HTML-Element 
     * @param {DomElement} targetElement HTML-ELement des Kalenders
     * @param {Date} startDate [Optional] - Start / vorkonfiguriertes Datum festlegen
     */
    constructor( targetElement, startDate=null ) {
        var oldScope = this;
        
        startDate = ( ( startDate === null )
                        ? new Date()
                        : startDate );
        
        startDate = new Date( startDate.getFullYear(), startDate.getMonth() +1 );
        
        this.htmlElement = targetElement;
        this.inputTextElement = $( ".mskin-textbox-input", targetElement );
        this.modeName = "none";
        this.modeMsg = null;
        this.isShown = false;
        this.displayDate = startDate;
        this.selectetDate = startDate;
        this.events = {
            /* OnClick Events */
            onClickTextbox: [ ],
            onClickMonthBack: [ ],
            onClickMonthForward: [ ],
            onClickYearBack: [ ],
            onClickYearForward:  [ ],
            onClickDay: [ ],
            onClickTermin: [ ],
            onClickCloseDatepicker: [ ],
            
            /* OnChange Events */
            onChangeDisplayedMonth: [ ],
            onChangeDate: [ ],
            onChangeVisibility: [ ],
    
            /* --- GUI Standart Funktionen | Event Prototypen --- */
            defaultFunction: {
                
                /* On Click Functionen */
                fnClickTextbox: function( mainScope ) {
                    mainScope.showDialog( );
                },
                fnClickMonthBack: function( ) {
                    
                    var currDate = oldScope.displayDate;

                    if( currDate.getMonth() === 1 ) 
                        currDate = new Date( currDate.getFullYear() -1, 1 );

                    oldScope.setCalendarMonth( currDate.getFullYear(), currDate.getMonth() -1 );
                },
                fnClickMonthForward: function( ) {
                    
                    var currDate = oldScope.displayDate;

                    if( currDate.getMonth() === 12 ) {
                        currDate = new Date( currDate.getFullYear() +1, 1 );
                    }
                    
                    if( currDate.getMonth() === 0 ) {
                        var getYear = currDate.getFullYear();
                        $( this ).closest( ".mskin-dp-c-head" ).find( ".mskin-dp-year-display" ).text( getYear );
                    }
                    

                    oldScope.setCalendarMonth( currDate.getFullYear(), currDate.getMonth() +1 );
                    
                    var getMonthId = currDate.getMonth();
                    var getMonthName = mskinLangPack.date.month[getMonthId];
                    $( this ).parent().find( ".mskin-dp-month-display" ).text( getMonthName );
                },
                fnClickYearBack: function( ) {
                    
                    var currDate = oldScope.displayDate;
                    oldScope.setCalendarMonth( currDate.getFullYear() -1, currDate.getMonth() );
                },
                fnClickYearForward: function( ) {
                    
                    var currDate = oldScope.displayDate;
                    oldScope.setCalendarMonth( currDate.getFullYear() +1, currDate.getMonth() );
                },
                fnClickDay: function( creatorScope, passedParam, clickedDay ) {
                    clickedDay = $( clickedDay.target );

                    if( clickedDay.is( "[last-month]" ) ) {
                        // Wenn ein Tag von dem vorhärigen Monat angeklickt wurde
                    }
                    else if( clickedDay.is( "[first-month]") ) {
                        // Wenn ein Tag von dem nächsten Monat angeklickt wurde
                    }
                    else {
                        // Wenn ein Tag von dem aktuellen Monat angeklickt wurde
                        var currDisplayDate = creatorScope.displayDate;
                        var strDateOfClickedDay = clickedDay.attr( "date-id" );
                        var dateOfClickedDay = new Date( strDateOfClickedDay );
                        dateOfClickedDay.setDate( dateOfClickedDay.getDate() +1 );

                        creatorScope.selectedDate = dateOfClickedDay;
                        creatorScope.triggerOnChangeDate( dateOfClickedDay );
                    }
                },
                fnClickTermin: function( el ) {
                    
                },
                fnClickCloseDatepicker: function( ) {
                    
                },
                
                /* On Change Functionen */
                fnChangeSelectedDay: function( creatorScope, passedParam, evParam ) {
                    var targetDayContainer = $( ".mskin-dp-c-b-d-container", creatorScope.htmlElement );
                    var newSelectetDateArray = evParam.selectedDate.toISOString().slice(0,10).split( "-" );
                    newSelectetDateArray[1] = ( (newSelectetDateArray[1][0] === "0" ) ? newSelectetDateArray[1][1] : newSelectetDateArray[1] );
                    newSelectetDateArray[2] = ( (newSelectetDateArray[2][0] === "0" ) ? newSelectetDateArray[2][1] : newSelectetDateArray[2] );

                    var newSelectetDateStr = newSelectetDateArray[0] +"."+ newSelectetDateArray[1] +"."+ newSelectetDateArray[2];
                    var newSelectedDay = $( "day[date-id='" +newSelectetDateStr+ "']", targetDayContainer );

                    if( !newSelectedDay.is( ".selected" ) ) {
                        newSelectedDay.closest( ".mskin-dp-c-b-d-container" ).find( ".selected" ).removeClass( "selected" );
                        newSelectedDay.addClass( "selected" );
                    }
                },
                fnChangeDisplayedMonth: function( creatorScope, passedParam, evParam ) {
                    // Aktuallisiere Anzeige des aktuellen Tages
                    var newDate = evParam.selectedMonth;
                    var nowDate = new Date();
                    if( newDate.getFullYear() === nowDate.getFullYear()
                    &&  newDate.getMonth() === nowDate.getMonth() ) {
                        var targetDayContainer = $( ".mskin-dp-c-b-d-container", creatorScope.htmlElement );
                        var todayDateArray = nowDate.toISOString().slice(0,10).split( "-" );
                        todayDateArray[1] = ( (todayDateArray[1][0] === "0" ) ? todayDateArray[1][1] : todaytodayDateArray[1] );
                        todayDateArray[2] = ( (todayDateArray[2][0] === "0" ) ? todayDateArray[2][1] : todayDateArray[2] );

                        var todayDateStr = todayDateArray[0] +"."+ todayDateArray[1] +"."+ todayDateArray[2];
                        var todayDay = $( "day[date-id='" +todayDateStr+ "']", targetDayContainer );
                        todayDay.attr( "today", "" );
                    }
                    
                    // Aktuallisiere Monatsanzeige
                    
                    // Aktuallisiere Jahresanzeige
                },
                onChangeVisibility: function( newState ) {

                }
            }
        };
        
        this.bindTextboxListeners();
        this.defineAllDefaultFunction();
    }
    
    defineAllDefaultFunction() {
        // this.events.defaultFunction.fnChangeSelectedDay
        var fnChangeSelectedDay = this.events.defaultFunction.fnChangeSelectedDay;
        var evChangeSelectedDay = new msEvent( "calendar.default.evChangeSelectedDay", fnChangeSelectedDay, this );
        this.events.onChangeDate.push( evChangeSelectedDay );

        // this.events.defaultFunction.fnClickDay
        var fnClickDay = this.events.defaultFunction.fnClickDay;
        var evClickDay = new msEvent( "calendar.default.evClickDay", fnClickDay, this );
        this.events.onClickDay.push( evClickDay );

        // this.events.defaultFunction.fnChangeDisplayedMonth
        var fnChangeDisplayedMonth = this.events.defaultFunction.fnChangeDisplayedMonth;
        var evChangeDisplayedMonth = new msEvent( "calendar.default.evChangeDisplayedMonth", fnChangeDisplayedMonth, this );
        this.events.onChangeDisplayedMonth.push( evChangeDisplayedMonth );
    }
    
    defineAllExternalDefaultFunction() { }

    triggerOnChangeDate( newDate ) {
        for( var iEvent = 0; iEvent < this.events.onChangeDate.length; iEvent++ ) {
            this.events.onChangeDate[iEvent].fire( {
                selectedDate: newDate
            });
        }
    }

    triggerOnClicketDay( evtClick ) {
        for( var iEvent = 0; iEvent < this.events.onClickDay.length; iEvent++ ) {
            this.events.onClickDay[iEvent].fire( evtClick );
        }
    }

    triggerOnChangeDisplayedMonth( newDate ) {
        for( var iEvent = 0; iEvent < this.events.onChangeDisplayedMonth.length; iEvent++ ) {
            this.events.onChangeDisplayedMonth[iEvent].fire( {
                selectedMonth: newDate
            } );
        }
    }
    
    /* --- Listeners --- */
    
    /**
     * [PRIVATE] - Initialisiere die Textbox Events
     */
    bindTextboxListeners() {
        var fnClickTextbox = this.events.defaultFunction.fnClickTextbox;
        var mainScope = this;
        
        $( "input.mskin-textbox-input", this.htmlElement ).click( function() {
            // Übergebe Prototype als Event-Funktion
            fnClickTextbox( mainScope )
        } );
    }
    
    /**
     * [PRIVATE] - Initialisiere die Events für die Monatsauswahl
     */
    bindMonthChangeListeners() {
        //.mskin-datepicker .mskin-datepicker-container .mskin-dp-calender .mskin-dp-c-head .mskin-dp-month button[job]
        
        $( ".mskin-dp-month button[job=back]", this.htmlElement ).click(
            // Übergebe Prototype als Event-Funktion
            this.events.defaultFunction.fnClickMonthBack
        );
        
        $( ".mskin-dp-month button[job=forward]", this.htmlElement ).click(
            // Übergebe Prototype als Event-Funktion
            this.events.defaultFunction.fnClickMonthForward
        );
    }
    
    /**
     * [PRIVATE] - Initialisiere die Events für die Monatsauswahl
     */
    bindYearChangeListeners() {
        //.mskin-datepicker .mskin-datepicker-container .mskin-dp-calender .mskin-dp-c-head .mskin-dp-year button[job]
        
        $( ".mskin-dp-year button[job=back]", this.htmlElement ).click(
            // Übergebe Prototype als Event-Funktion
            this.events.defaultFunction.fnClickYearBack
        );
        
        $( ".mskin-dp-year button[job=forward]", this.htmlElement ).click(
            // Übergebe Prototype als Event-Funktion
            this.events.defaultFunction.fnClickYearForward
        );
    }

    /* --- Private Methoden --- */
    
        /* GUI Methoden */
    
        /**
         * Füge dem Datepicker Container das dazugehörige Popup hinzu
         * @param {Date} date Setze das Datum zu vorkonfiguration
         */
        draw_popup( date ) {
            var oldScope = this;
            $( this.htmlElement ).append(
                (`<div class="mskin-datepicker-container">
                    <div class="mskin-dp-info">
                        <div class="mskin-dp-i-header">
                            <div class="mskin-dp-currentdate">
                                <p class="mskin-dp-cd-day">%DAYNAME%</p>
                                <p class="mskin-dp-cd-date">
                                    %DAY%
                                    <span class="mskin-dp-th">th</span>
                                    %MONTHNAME% %YEAR%
                                </p>
                            </div>
                        </div>
                        <div class="mskin-dp-i-list">
                            <ul>
                                <!--li class="">
                                    <div class="mskin-dp-i-list-info">
                                        <p class="mskin-dp-i-list-i-title">Freezestyle Party 1.0</p><span class="mskin-dp-i-list-i-clock">
                                            <i class="material-icons">access_time</i>
                                            15:00
                                        </span>
                                    </div>
                                </li-->
                            </ul>
                        </div>
                    </div>
                    <div class="mskin-dp-calender">
                        <div class="mskin-dp-c-head">
                            <div class="mskin-dp-month">
                                <button job="back">
                                    <i class="material-icons">
                                        keyboard_arrow_left
                                    </i>
                                </button>
                                <p class="slide-prepair">
                                    <span class="mskin-dp-month-display">%MONTHNAME%</span>
                                </p>
                                <button job="forward">
                                    <i class="material-icons">
                                        keyboard_arrow_right
                                    </i>
                                </button>
                            </div>
                            <div class="mskin-dp-year">
                                <button job="back">
                                    <i class="material-icons">
                                        keyboard_arrow_left
                                    </i>
                                </button>
                                <p class="slide-prepair">
                                    <span class="mskin-dp-year-display">%YEAR%</span>
                                </p>
                                <button job="forward">
                                    <i class="material-icons">
                                        keyboard_arrow_right
                                    </i>
                                </button>
                            </div>
                        </div>
                        <div class="mskin-dp-c-body">
                            <div class="mskin-dp-c-b-week">
                                <p class="mskin-dp-c-b-week-name">
                                    Mo<span class="mskin-dp-week-name-last">ntag</span>
                                </p>
                                <p class="mskin-dp-c-b-week-name">
                                    Di<span class="mskin-dp-week-name-last">enstag</span>
                                </p>
                                <p class="mskin-dp-c-b-week-name">
                                    Mi<span class="mskin-dp-week-name-last">ttwoch</span>
                                </p>
                                <p class="mskin-dp-c-b-week-name">
                                    Do<span class="mskin-dp-week-name-last">nnerstag</span>
                                </p>
                                <p class="mskin-dp-c-b-week-name">
                                    Fr<span class="mskin-dp-week-name-last">eitag</span>
                                </p>
                                <p class="mskin-dp-c-b-week-name">
                                    Sa<span class="mskin-dp-week-name-last">mstag</span>
                                </p>
                                <p class="mskin-dp-c-b-week-name">
                                    So<span class="mskin-dp-week-name-last">nntag</span>
                                </p>
                            </div>
                            <div class="mskin-dp-c-b-days slide-prepair">
                                <!--div class="mskin-dp-c-b-d-container">
                                    <day today>
                                        <span class="mskin-dp-c-b-d-title">2</span>
                                        <div class="mskin-dp-c-b-d-color part-of-three">
                                            <dot color="turkies"></dot>
                                            <dot color="red"></dot>
                                            <dot color="yellow"></dot>
                                        </div>
                                    </day>
                                </div-->
                            </div>
                        </div>
                    </div>
                </div>`).replace(/%\w+%/g, function(all) {
                   return {
                       "%DAY%": date.getDate( ),
                       "%DAYNAME%": oldScope.convertToDayName( date.getDay() ),
                       "%MONTH%": date.getMonth( ),
                       "%MONTHNAME%": oldScope.convertToMonthName( date.getMonth() ),
                       "%YEAR%": date.getFullYear( )
                   }[all] || all;
                })
            );
            
            this.bindTextboxListeners();
            this.setCalendarMonth( date.getFullYear(), date.getMonth() );
        }
    
    setCalendarMonth( year, month ) {
        var newDate = new Date( year, month -1 );
        var newMonthHtml = this.getCalendarBlock( newDate );
        var direction = newDate.getTime() > this.displayDate.getDate( );
        
        this.displayDate = new Date( year, month );
        
        this.changeCalendarScope( newMonthHtml , direction );

        var oldScope = this;
            
        var dayOnClickRedirectFn = function( evtClicked ) {
            oldScope.triggerOnClicketDay( evtClicked );
        };

        // Trigger changeMonth Event
        this.triggerOnChangeDisplayedMonth( newDate );
        
        // @todo in event einbauen!!!
        $( ".mskin-dp-c-b-days .mskin-dp-c-b-d-container day", this.htmlElement ).click( dayOnClickRedirectFn );
    }
    
    changeCalendarScope( daysHTML, directionNext=true ) {
        var oldScope = this;
        var dayContainerCollection = $( ".mskin-dp-c-b-days", this.htmlElement );
        
        dayContainerCollection.append(
            `<div class="mskin-dp-c-b-d-container">` +
            `   ` + daysHTML +
            `</div>`
        );
        
        if( $( ".mskin-dp-c-b-d-container", dayContainerCollection ).length > 1 ) {
            var oldContainer = null;
            var newContainer = null;
            
            if( directionNext ) {
                oldContainer = $( ".mskin-dp-c-b-d-container:first-child", dayContainerCollection );
                newContainer = $( ".mskin-dp-c-b-d-container:last-child", dayContainerCollection );
            }
            else {
                oldContainer = $( ".mskin-dp-c-b-d-container:last-child", dayContainerCollection );
                newContainer = $( ".mskin-dp-c-b-d-container:first-child", dayContainerCollection );
            }
            
            oldContainer.animate( {
                marginLeft: "-100%",
                opacity: 0
            }, 500, function() {
                $( this ).remove();
            } );
        }
    }
    
    /*
     * [PRIVATE] - Löse ein Event aus
     * @param {Function} eventFnCollection Übergabe der aufzurufenden Funktionen
     */
    fireCallback( eventFnCollection, eventParam=null ) {
        for( var iEvent = 0; iEvent < eventFnCollection.length; iEvent++ ) {
            if( eventParam !== null )
                eventFnCollection[iEvent]( );
            else
                eventFnCollection[iEvent]( eventParam );
        }
    }
    
    /*
     * [PRIVATE] - Zeichne das Datepicker-PopUp
     */
    drawGUI( ) {
        
    }
    
    /*
     * [PRIVATE] - Zeige das Datepicker-PopUp
     */
    showGUI( ) {
        $( ".mskin-datepicker-container", this.htmlElement ).addClass( "show" );
        this.fireCallback( this.events.onChangeVisibility, true );
    }
    
    /*
     * [PRIVATE] - Verstecke das Datepicker-PopUp
     */
    hideGUI( ) {
        this.fireCallback( this.events.onChangeVisibility, false );
    }
    
    /* Datenverarbeitung */
    
        /**
         * Generiert ein für den Kalender-View vorgesehene JSON
         * aus dessen Tagen und deren Informationen
         * @param {Intager} month [optional] - Angeforderter Monat für die Abfrage
         * @param {Intager} year [optional] - Angeforderter Jahr für die Abfrage
         * @param {Boolean} termin [optional] - Hole Termin für den Abgefragten Monat
         * @return {JSON} Gibt den Kalender-View vorgesehene JSON zurück mit den dazugehörigen Infos
         */
        getCalendarBlock( date=null ) {
            var targetDate = date;

            if( date === null )
                targetDate = new Date( );

            // Bereite Daten vor
            var getRequiredMonthIDs = {
                before: {
                    year: targetDate.getFullYear(),
                    month: targetDate.getMonth() -1
                },
                current: {
                    year: targetDate.getFullYear(),
                    month: targetDate.getMonth()
                },
                after: {
                    year: targetDate.getFullYear(),
                    month: targetDate.getMonth() +1
                }
            };

            // Wenn der Monat davor ein anderes Jahr ist dann...
            if( getRequiredMonthIDs.current.month === 0 )
                getRequiredMonthIDs.before = {
                    year: targetDate.getFullYear() -1,
                    month: 11
                };

            // Wenn der Monat danach ein anderes Jahr ist dann...
            if( getRequiredMonthIDs.current.month === 11 )
                getRequiredMonthIDs.after = {
                    year: targetDate.getFullYear() +1,
                    month: 0
                };

            // Hole die benötigten Monatslängen
            var getRequiredMonthLength = {
                "before": this.getLengthOfMonth(
                    getRequiredMonthIDs.before.month,
                    getRequiredMonthIDs.before.year ),

                "current": this.getLengthOfMonth(
                    getRequiredMonthIDs.current.month,
                    getRequiredMonthIDs.current.year ),

                "after": this.getLengthOfMonth(
                    getRequiredMonthIDs.after.month,
                    getRequiredMonthIDs.after.year )
            };

            // Hole den Tages-Index des ersten Tages im Monat
            var firstDayIndex = this.firstDayInMonth(
                getRequiredMonthIDs.current.month,
                getRequiredMonthIDs.current.year );

            /* Aufbereitung der benötigten vorherrigen Tage */
            
            var allDayHTML = ``;

            // Wenn der erste Tag nicht 1 ( 1 = Montag ) ist
            if( firstDayIndex !== 1 ) {
                var lastDaysFromLastMonthLength = 0;
                
                // Wenn Sonntag
                if( firstDayIndex === 0 ) {
                    lastDaysFromLastMonthLength = 7;
                }
                else if( firstDayIndex > 1 ) {
                    lastDaysFromLastMonthLength = firstDayIndex;
                }
                
                for( var iLastMonthLastDays = lastDaysFromLastMonthLength; 0 < iLastMonthLastDays -1; iLastMonthLastDays-- ) {
                    var strDate = getRequiredMonthIDs.before.year +"."+ (getRequiredMonthIDs.before.month +1) +"."+ iDay;
                    allDayHTML += `
                        <day last-month="" date-id="` +strDate+ `">` +(getRequiredMonthLength.before - iLastMonthLastDays +2)+ `</day>`;
                }
                    
            }
            
            for( var iDay = 1; iDay <= getRequiredMonthLength.current; iDay++ ) {
                var todayDate = new Date();
                var strDate = getRequiredMonthIDs.current.year +"."+ (getRequiredMonthIDs.current.month +1) +"."+ iDay;

                /*if( todayDate.getFullYear() == getRequiredMonthIDs.current.year
                &&  todayDate.getMonth() == getRequiredMonthIDs.current.month
                &&  todayDate.getDate() == iDay ) {
                    allDayHTML += `<day today="" date-id="` +strDate+ `">` +iDay+ `</day>`;
                }
                else {*/
                    allDayHTML += `<day date-id="` +strDate+ `">` +iDay+ `</day>`;
                //}
            }

            // Wenn der letzte Tag nicht 1 ( 1 = Montag ) ist
            var firstDayIdInNextMonth = this.daynameOfDate(
                new Date(
                    getRequiredMonthIDs.after.year,
                    getRequiredMonthIDs.after.month,
                    1
                )
            );
            
            // wenn der nächste Tag im Monat nicht der Montag ist dann werden keine Tage mehr benötigt
            if( firstDayIdInNextMonth !== 1 ) {
                var lastDayIdFromNextMonthLength = 6;
                
                // Wenn der erste Tag ein Sonntag ist wird ein Tag noch benötigt
                if( firstDayIdInNextMonth === 0 ) {
                    lastDayIdFromNextMonthLength = 2;
                }
                // Wenn die Tage höher sind muss die Woche noch mit Tagen des nächsten Monats aufgefüllt werden
                else if( firstDayIdInNextMonth > 1 ) {
                    // 7 = Wochenanzahl
                    // firstDayIdInNextMonth ( =6 ) = inventierung
                    // 1 = Indexierung
                    lastDayIdFromNextMonthLength = 7 + 1 + 1 - firstDayIdInNextMonth;
                }
                console.log( lastDayIdFromNextMonthLength );
                
                for( var iNextMonthFirstDays = 1; iNextMonthFirstDays < lastDayIdFromNextMonthLength ; iNextMonthFirstDays++ ) {
                    var strDate = getRequiredMonthIDs.after.year +"."+ (getRequiredMonthIDs.after.month +1) +"."+ iDay;
                    allDayHTML += `
                        <day first-month date-id="` +strDate+ `">` +iNextMonthFirstDays+ `</day>`;
                    console.log( " - " + iNextMonthFirstDays );
                }
                    
            }
            
            return allDayHTML;
        }

        /**
         * Ruft die länge des angeforderten Monats ab
         * @param {Intager} month
         * @param {Intager} year
         * @return {Intager} Gibt die länge des angeforderten Monats zurück
         */
        getLengthOfMonth( month, year ) {
            return new Date( year, month +1, 0 ).getDate();
        }

        /**
         * Ruft den ersten Tag des Monats ab
         * @param {Intager} month
         * @param {Intager} year
         * @param {String} setzt den return Typ -> number, name, shortname
         * @return {Object} Beschreibung des ersten Tages
         */
        firstDayInMonth( month, year, returnInfo="number" ) {
            var targetDate = new Date( year, month );
            var dayIndex = targetDate.getDay();
            var output = null;

            returnInfo = returnInfo.toLowerCase();

            if( returnInfo === "number" ) {
                return dayIndex;
            }
            else if( returnInfo === "name" ) {
                return [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ][dayIndex];
            }
            else if( returnInfo === "shortname" ) {
                return [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ][dayIndex];
            }
        }

        /**
         * Ruft den ersten Tag des Monats ab
         * @param {Intager} month
         * @param {Intager} year
         * @param {String} setzt den return Typ -> number, name, shortname
         * @return {Object} Beschreibung des ersten Tages
         */
        daynameOfDate( targetDate, returnInfo="number" ) {
            var dayIndex = targetDate.getDay();
            var output = null;

            returnInfo = returnInfo.toLowerCase();

            if( returnInfo === "number" ) {
                return dayIndex;
            }
            else if( returnInfo === "name" ) {
                return [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ][dayIndex];
            }
            else if( returnInfo === "shortname" ) {
                return [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ][dayIndex];
            }
        }
    
        /**
         *
         */
        convertToDayName( dateDayID ) {
            var dateDayIdName = [
                "Sonntag",
                "Montag",
                "Dienstag",
                "Mittwoch",
                "Donnerstag",
                "Freitag",
                "Samstag"
            ];
            
            return dateDayIdName[dateDayID];
        }
    
        /**
         *
         */
        convertToMonthName( dateMonthID ) {
            var dateMonthIdName = [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ];
            
            return dateMonthIdName[dateMonthID];
        }

        getEvents() {

        }


    /* --- Öffentliche Event-Callbacks --- */
    
    /**
     * Füge ein Event hinzu oder löse alle Events des Eventtypes aus
     * @param {function} newFn [optional] - Übergebe eine Function um diese zu den Events hinzufügen zu lassen
     */
    onChangeVisibility( newFn=false ) {
        if( newFn ) {
            if( typeof newFN === "function" ) {
                this.events.onShowDatepicker.push( newFn );
            }
            else {
                console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine Funktion! Als Parameter sind nur Objekte des Typs 'function' zugelassen! " );
            }
        }
        else {
            var allOnChangeVisibilityEvents = this.events.onChangeVisibility;
            
            for( var iEvent = 0; iEvent < allOnChangeVisibilityEvents.length; iEvent++ ) {
                allOnChangeVisibilityEvents[iEvent]();
            }
        }
    }
    
    /**
     * Füge ein Event hinzu oder löse alle Events des Eventtypes aus
     * @param {function} newFn [optional] - Übergebe eine Function um diese zu den Events hinzufügen zu lassen
     */
    onChangeDate( newFn=false ) {
        if( newFn ) {
            if( typeof newFN === "function" ) {
                this.events.onChangeDate.push( newFn );
            }
            else {
                console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine Funktion! Als Parameter sind nur Objekte des Typs 'function' zugelassen! " );
            }
        }
        else {
            var allOnChangeDateEvents = this.events.onChangeDate;
            
            for( var iEvent = 0; iEvent < allOnChangeDateEvents.length; iEvent++ ) {
                allOnChangeDateEvents[iEvent]();
            }
        }
    }
    
    /**
     * Füge ein Event hinzu oder löse alle Events des Eventtypes aus
     * @param {function} newFn [optional] - Übergebe eine Function um diese zu den Events hinzufügen zu lassen
     */
    onClickDay( newFn=false ) {
        if( newFn ) {
            if( typeof newFN === "function" ) {
                this.events.onClickDay.push( newFn );
            }
            else {
                console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine Funktion! Als Parameter sind nur Objekte des Typs 'function' zugelassen! " );
            }
        }
        else {
            var allOnClickDayEvents = this.events.onClickDay;
            
            for( var iEvent = 0; iEvent < allOnClickDayEvents.length; iEvent++ ) {
                allOnClickDayEvents[iEvent]();
            }
        }
    }
    
    /**
     * Füge ein Event hinzu oder löse alle Events des Eventtypes aus
     * @param {function} newFn [optional] - Übergebe eine Function um diese zu den Events hinzufügen zu lassen
     */
    onClickTermin( newFn=false ) {
        if( newFn ) {
            if( typeof newFN === "function" ) {
                this.events.onClickTermin.push( newFn );
            }
            else {
                console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine Funktion! Als Parameter sind nur Objekte des Typs 'function' zugelassen! " );
            }
        }
        else {
            var allOnClickTerminEvents = this.events.onClickTermin;
            
            for( var iEvent = 0; iEvent < allOnClickTerminEvents.length; iEvent++ ) {
                allOnClickTerminEvents[iEvent]();
            }
        }
    }
    
    
    /* --- Öffentliche Methoden --- */
    
    /**
     * GET'e oder SET'e das aktuell selectierten Datum
     * @param {Date} setDate [optional] - Übergebe eine Datum zum vorselectieren
     * @return {Date} Gibt das aktuell gewählte Datum zurück
     */
    date( setDate=false ) {
        if( setDate ) {
            this.selectetDate = setDate;
            this.fireCallback( this.events.onChangeDate );
        }
        
        return this.selectetDate;
    }
    
    /**
     * GET'e oder SET'e den aktuellen Modus
     * @param {String} setMode [optional] - Setze Modus, zugelassen ["warn","error","none"]
     * @param {String} msg [optional] - Übergebe eine Nahricht zum Anzeige (ausgeschlossen beim Modus 'none' )
     * @return {String} Gibt den aktuell gesetzten Modus zurück
     */
    mode( setMode="", msg=null ) {
        setMode = setMode.toLowerCase();
		
		if( ( setMode === "info" || setMode === "error" ) && msg !== null ) {
			if( $( this.htmlElement ).find( ".mskin-object-header" ).length === 0 ) {
				var headerHtml = `<div class="mskin-object-header"><div class="mskin-obj-h-notification"><div class="mskin-obj-h-n-item info-icon-container"><i class="material-icons">info_outline</i><div class="mskin-mode-massage"><div class="mskin-mode-m-container"><span class="mskin-m-m-title">Info</span><p class="mskin-m-m-text">Dieses Datum liegt in der Vergangenheit</p></div></div></div><div class="mskin-obj-h-n-item error-icon-container"><i class="material-icons">warning</i><div class="mskin-mode-massage"><div class="mskin-mode-m-container"><span class="mskin-m-m-title">Warnung</span><p class="mskin-m-m-text">Dieses Datum entspicht nicht der Norm!</p></div></div></div></div></div>`;
				
		   		$( this.htmlElement.children[0] ).before( headerHtml );
				$( ".material-icons", this.htmlElement )
					.mouseenter( function( e ) {
						$( ".mskin-mode-massage", e.target.parentElement )
						.animate(
							{ width: "250px", opacity: 1 },
							500, "swing"
						);
					})
					.mouseleave( function( e ) {
						$( ".mskin-mode-massage", e.target.parentElement )
						.animate(
							{ width: "0px", opacity: 0 },
							500, "swing"
						);
				});
			}
	    }
		
        if( setMode === "info" && msg !== null ) {
            this.modeName = setMode;
            $( this.htmlElement ).addClass( "has-info" );
            $( this.htmlElement ).removeClass( "has-error" );
            this.modeMsg = msg;
			
			$( ".mskin-textbox-input", this.htmlElement )
				.attr( "placeholder", "" );
			
			if( txtBox.val( ) == "" ) {
				txtBox.removeClass( "has-value" ) 
			}
        }
        else if( setMode === "error" && msg !== null ) {
            this.modeName = setMode;
            $( this.htmlElement ).addClass( "has-error" );
            $( this.htmlElement ).removeClass( "has-info" );
            this.modeMsg = msg;
			
			$( ".mskin-textbox-input", this.htmlElement )
				.attr( "placeholder", "Bitte eingabe korregieren!" )
				.val( "" );
			
			$( this.htmlElement ).addClass( "has-value" );
        }
        else if( setMode === "none" ) {
            this.modeName = setMode;
            this.modeMsg = null;
			
			var datePickerContainer = $( this.htmlElement );
			var txtBox = $( ".mskin-textbox-input", this.htmlElement );
			
            datePickerContainer.removeClass( "has-error" );
            datePickerContainer.removeClass( "has-info" );
			
			txtBox.attr( "placeholder", "" );
			
			if( txtBox.val( ) == "" ) {
				$( this.htmlElement ).removeClass( "has-value" );
			}
        }
        else if( !( setMode === "none" || setMode === "warn" || setMode === "error" ) && setMode !== "" ) {
            console.error( "Übergebenes Objekt zum hinzufügen der Eventsammlung ist keine String oder valide! Als Parameter sind nur folgende Strings zugelassen > none, info, error <" );
        }
        
        return this.modeName;
    }
    
    /**
     * Öffne das Datepicker-Dialog
     */
    showDialog() {
        if( !this.isShown ) {
            // Zeichne oder zeige Datepicker-PopUp
            this.draw_popup( this.displayDate );

            // Starte alle benötigten Events
            this.bindMonthChangeListeners();
            this.bindYearChangeListeners();

            // Abschließen
            this.isShown = true;
            this.showGUI();
            this.fireCallback( this.events.onChangeVisibility );
        }
    }
    
    /**
     * Schließe das Datepicker-Dialog
     */
    closeDialog() {
        this.isShown = false;
        this.hideGUI( );
    }
}
var calendar = null;

$( document ).ready( function() {
    calendar = new Calendar( date_picker, new Date( ) );
});