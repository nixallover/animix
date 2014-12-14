// round class

function Turn(){
	this.values = {};
	this.domNodes = [];

	// methods
	this.started = function(){
		console.log("turn start");
		console.log(round);
	    round.activeTurn = true;
	    $ui.grid.square.bind( "mousedown", {activeTurn: round.activeTurn}, square.validate);  

		// var currTurn = this;
		// logger.status("turn started!");
		// logger.debug(this);

	 //    $ui.grid.square.on('mouseenter', function(){
		// 	//squares.selector(this, currTurn);
		// });
	}; //end started

	this.ended = function(){
		var currTurn = this;
		activeTurn = false;
		logger.status("turn ended!");
	 //    $ui.grid.square.on('mouseenter', function(){
		// 	//squares.selector(this,currTurn);
		// });

	    //if move is complete
	    if ( this.domNodes.length === 3 ){
	        stats.updateOnCompleteTurn(round, this);
		    $ui.score.text(round.stats.score);
			$ui.turns.text(round.stats.turns);

			// WIP: remove squares in dom nodes, for each, run grid.whatever
			grid.updateGrid(this.domNodes);
		} else {
			logger.status("Turn not recorded, not enough squares");
		}

	    //reset everything
	    // $ui.grid.square.removeClass('selected');
	    // logger.debug(this.domNodes);
	    // this.domNodes = [];
	    // this.values = {};
	    square.reset();

	}; // end ended
}; // end turn