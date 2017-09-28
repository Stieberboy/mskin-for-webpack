$( document ).ready( function() {
	$( ".mskin-textbox2, .mskin-datepicker" ).on( 'input', function( e ) {
		if( $( "input", this).val() !== "" )
			$(this).addClass( "has-value" );
		else
			$(this).removeClass( "has-value" );
	});
});