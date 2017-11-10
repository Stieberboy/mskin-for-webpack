class CoEvent {
    constructor( targetFunction, targetScope=null, costumParam=null ) {
        this.fn = targetFunction;
        this.scope = targetScope;
        this.param = costumParam;
        this.enabled = true;
    }

    fire( paramArray=null ) {
        if( this.enabled )
            this.fn( this.scope, this.param, paramArray );
    }

    disable() {
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
    }
}
