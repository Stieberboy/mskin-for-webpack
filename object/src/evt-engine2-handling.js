class CoEvent {
    constructor( targetFunction, targetScope=null, costumParam=null ) {
        this.fn = targetFunction;
        this.scope = targetScope;
        this.param = costumParam;
    }

    fire( paramArray=null ) {
        this.fn( this.scope, this.param, paramArray );
    }
}