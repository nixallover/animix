function roundInit(){
	round = new Round();

	// generate initial grid
	$.each( $( ui.tile ), function( key, value ){
		gridMgr.generatePart( value );
	});
	// _.each( $( ui.tile ), gridMgr.generatePart( value ));

	// start round!
	round.init();

}; // roundInit()