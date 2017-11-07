class CalendarInfoTermin extends Calendar {
    constructor( targetElement, startDate=null ) {
        super( targetElement, startDate );
        
        this.functions = {
            updateInfoTerminElement: function( newDate, targetTerminElement, calendarInstanz ) {
                
            }
        };

        this.events = {
            onNewSelectedDay: [],
            onDayTerminSelected: []
        };
    }
    
}