// game init

var ANIMIX = {
	activeTurn: false,
	currDomNodes: [],
	currParts: {}
};

$(function(){
	//eventually this will deal with game states
	logger.status("Starting game!");
	//roundInit();

	//ameName = "animix";
//temporarily moving round init here
	round = new Round();
	//activeTurn 	= false;

	// generate initial grid
	$.each( $ui.grid.square, function(key, value){
		grid.generatePart(value);
	});

	// start round!
	round.init();

});