function roundInit(){
	round = new Round();

	// generate initial grid
	_.each( $( ui.tile ), gridMgr.generatePart);


    //animation
    $( ui.containers.game ).addClass( 'animated bounceInDown' );

	// start round!
	round.init();

}; // roundInit()