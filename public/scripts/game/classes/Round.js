// round class

// SUGGESTION FROM JUDE: separate out all the vars that I need to exchange between round and move etc, and put them in a globally accessible game var

function Round(){
	var self = this;
	self.animalsCreated = [];

	// separate into new constructor
	//self.stats = new Stats();
	self.stats = {
		dumbScore: 0,
		score: 0,
		moves:0,
		duplicates: 0,
		originals: 0,
		combos: 0,
		longestCombo: 0
	};
	self.activeMove = false;


	self.init = function(){
		var move = {};
		//logger.status("round.init!");

		// keep images from dragging
		// FIXME doesn't work to reference $ui.part, not sure why
		$( ui.grid ).on("dragstart", ".part", function(e) {
			e.preventDefault();
			// console.log("dragging");
		});

		// have to reset handler over and over to get not-static round object
		// FIXME not picking up first mousedown .. this doesn't work
		// $( ui.grid ).on( "mousedown", ".tile", { round: self }, tileMgr.validate);
		$( ui.grid ).on( "mouseenter", ".tile", { round: self }, tileMgr.validate);

		// start move when user clicks any tile
		$( ui.grid ).on("mousedown", ".tile", function(){
			move = new Move(self);
		    move.started();
		});

		// end move when player stops dragging anywhere on screen
		$( window ).on("mouseup", function(){
			if( ANIMIX.activeMove === true ){
				move.ended();
			} else {
				logger.status("no move currently active");
			}
		});
	}; // end init
}; // end round