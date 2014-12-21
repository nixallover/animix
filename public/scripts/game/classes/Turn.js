// round class

function Turn(round){
	var self = this;

	// methods
	self.started = function(){
		console.log("turn start");
		//console.log(self);
	    ANIMIX.activeTurn = true;
	    $ui.grid.container.on( "mousedown", ".grid-square", { round: round }, square.validate);  

	}; //end started

	self.ended = function(){
		ANIMIX.activeTurn = false;
		//logger.status("turn ended!");

	    //if move is complete
	    if ( ANIMIX.currDomNodes.length === 3 ){
	        stats.updateOnCompleteTurn(round, self);
		    $ui.score.text(round.stats.score);
			$ui.turns.text(round.stats.turns);

			// WIP: remove squares in dom nodes, for each, run grid.whatever
			grid.updateGrid(ANIMIX.currDomNodes);
		} else {
			logger.status("Turn not completed, not enough squares");
		}

	    square.reset();

	}; // end ended
}; // end turn