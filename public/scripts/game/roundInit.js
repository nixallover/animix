//not being used anymore, refactored into a class

function roundInit(){

	// round.start - resetting the board state 
	// turn object, can start and end turns
	// initiate a new turn object
	// turn is an event emmitter tells the round object when a turn has been successfully completed and returns stats


	var round 		= new Round(),
		activeTurn 	= false;

	// generate initial grid
	$.each( $ui.grid.square, function(key, value){
		grid.generatePart(value);
	});

	// start round!
	//console.log(round.animalsCreated);
	round.init();

	// // makes sure 1st square gets selected
	// $ui.grid.square.on('mousedown', function(){
	// 	squares.selector(this,turn);
	// });

	// // keep image from dragging
	// $(".part").on('dragstart', function(e) {
	// 	e.preventDefault();
	// });

	// // start turn when user starts dragging
	// $(window).on('mousedown', function(){
	// 	//turn = new Turn();
	//     turn.started(round, turn);

	// // end turn when user stops dragging
	// }).on('mouseup', function(){
	//     turn.ended(round, turn)

	// });

	// round.turnManager = function(){
	//     if (round.activeTurn){
	//         // add event handler to all squares
	//         $ui.grid.square.on('mouseenter', squareSelector );

	//     } else {
	//         // remove event handler to all squares
	//         $ui.grid.square.off('mouseenter', squareSelector );

	//     };
	// };

	// function checkPartIsAvailable(){
	// 	//check that part type hasn't been picked in this turn yet
	// 	if( !turn.values[selected.part] ){
	// 		turn.values[selected.part] = selected.animal;

	// 		};

	// 	} else {
	// 		logger.status("Not adding square.. this part was already selected for this move");
	// 	};

	// }

};