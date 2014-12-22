function roundInit(){
	round = new Round();

	// generate initial grid
	$.each( $( ui.tile ), function( key, value ){
		gridMgr.generatePart( value );
	});

	// start round!
	round.init();

};