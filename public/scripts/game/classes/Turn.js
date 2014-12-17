// round class

function Turn(round){
	var self = this;
	self.values = {};
	self.domNodes = [];

	// methods
	self.started = function(){
		console.log("turn start");
		//console.log(round);
	    round.activeTurn = true;
	    $ui.grid.square.on( "mousedown", { round: round, turn: self }, square.validate);  

	}; //end started

	self.ended = function(){
		round.activeTurn = false;
		logger.status("turn ended!");

	    //if move is complete
	    if ( self.domNodes.length === 3 ){
	        stats.updateOnCompleteTurn(round, self);
		    $ui.score.text(round.stats.score);
			$ui.turns.text(round.stats.turns);

			// WIP: remove squares in dom nodes, for each, run grid.whatever
			grid.updateGrid(self.domNodes);
		} else {
			logger.status("Turn not recorded, not enough squares");
		}

	    square.reset();

	}; // end ended
}; // end turn