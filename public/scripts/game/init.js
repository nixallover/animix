// game init

$(function(){
	//eventually this will deal with game states
	logger.status("Starting game!");
	//roundInit();

//temporarily moving round init here
	var round = new Round();
	//activeTurn 	= false;

	// generate initial grid
	$.each( $ui.grid.square, function(key, value){
		grid.generatePart(value);
	});

	// start round!
	round.init();

});