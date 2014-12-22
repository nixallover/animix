// round class

function Turn(round){
	var self = this;

	// methods
	self.started = function(){
		//console.log("turn start");
		//console.log(self);
	    ANIMIX.activeTurn = true;
	    $( ui.grid.container ).on( "mousedown", ".tile", { round: round }, tileMgr.validate );  

	}; //end started

	self.ended = function(){
		ANIMIX.activeTurn = false;
		//logger.status("turn ended!");

	    //if move is complete
	    if ( ANIMIX.currDomNodes.length === 3 ){

	    	// update stats
	        statsMgr.updateOnCompleteTurn( round, self );
		    
		    // drop new tiles from the top
			gridMgr.updateGrid( ANIMIX.currDomNodes );

			// TEMP add to dom for debug
			$( ui.score ).text( round.stats.score );
			$( ui.turns ).text( round.stats.turns );

		} else {
			logger.status("Turn not completed, not enough tiles");
		}

	    tileMgr.reset();

	}; // end ended
}; // end turn