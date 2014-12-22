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
		var turn = {};
		//logger.status("round.init!");

		// keep images from dragging
		// FIXME doesn't work to reference $ui.grid.part, not sure why
		$( ui.grid.container ).on("dragstart", ".part", function(e) {
			e.preventDefault();
			// console.log("dragging");
		});

		// have to reset handler over and over to get not-static round object
		// FIXME not picking up first mousedown .. this doesn't work
		// $( ui.grid.container ).on( "mousedown", ".tile", { round: self }, tileMgr.validate);
		$( ui.grid.container ).on( "mouseenter", ".tile", { round: self }, tileMgr.validate);

		// start turn when user clicks any tile
		$( ui.grid.container ).on("mousedown", ".tile", function(){
			turn = new Turn(self);
		    turn.started();
		});

		// end turn when player stops dragging anywhere on screen
		$( window ).on("mouseup", function(){
			if( ANIMIX.activeTurn === true ){
				turn.ended();
			} else {
				logger.status("no turn currently active");
			}
		});
	}; // end init
}; // end round