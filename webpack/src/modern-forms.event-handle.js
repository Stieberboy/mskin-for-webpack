class msEvent {
    constructor( eventId, paramEvFn, paramCreatorInstanz, paramRunPassObject=[] ) {
        this.id = eventId;
        this.fn = paramEvFn;
        this.instanz = paramCreatorInstanz;
        this.staticParam = paramRunPassObject;
    }
    
    getId() {
        return this.id;
    }
    
    addPassParam( paramId, paramValue ) {
        this.staticParam[paramId] = paramValue;
    }
    
    fire( fireParameter=[] ) {
        this.fn( this.instanz, this.staticParam, fireParameter );
    }
}