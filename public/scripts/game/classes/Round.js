// round class

// SUGGESTION FROM JUDE: separate out all the vars that I need to exchange between round and turn etc, and put them in a globally accessible game var

function Round(){
	var self = this;
	self.animalsCreated = [];

	// separate into new constructor
	//self.stats = new Stats();
	self.stats = {
		dumbScore: 0,
		score: 0,
		turns:0,
		duplicates: 0,
		originals: 0,
		combos: 0,
		longestCombo: 0
	};
	self.activeTurn = false;


	self.init = function(){
		var turn;
		logger.status("round.init!");
		//console.log("self.activeTurn");
		//console.log(self.activeTurn);

		// have to reset handler over and over to get not-static round object
		$ui.grid.square.on( "mouseenter", { round: self, turn: {} }, square.validate);

		// start turn when user clicks any square
		$ui.grid.square.on('mousedown', function(){
			turn = new Turn(self);
		    turn.started();
		});

		// keep images from dragging
		$ui.grid.part.on('dragstart', function(e) {
			e.preventDefault();
			console.log("dragging");
		});


		// end turn when player stops dragging anywhere on screen
		$(window).on('mouseup', function(){
		    turn.ended();
		});
		round = self;
	}; // end init
}; // end round

//crap
		// // makes sure 1st square gets selected
		// $ui.grid.square.on('mousedown', function(){
		// 	squares.selector(this,turn);
		// }); // end mousedown

		// ATTACH HANDLERS

		// start turn when user clicks any square
		// $ui.grid.square.on('mousedown', function(){
		//     console.log("turn start");
		//     activeTurn = true;
		//     $ui.grid.square.on( "mousedown", square.validate);  
		// });

		// end turn when player stops dragging anywhere on screen
		// $(window).on('mouseup', function(){
		//     console.log("turn end");
		//     activeTurn = false;
		//     //allSquares.off( "mouseenter", square.validate);
		//     square.reset();
		    
		// });