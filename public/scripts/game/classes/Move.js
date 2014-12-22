// round class

function Move(round){
	var self = this;

	// methods
	self.started = function(){
		//console.log("move start");
		//console.log(self);
	    ANIMIX.activeMove = true;
	    $( ui.grid ).on( "mousedown", ".tile", { round: round }, tileMgr.validate );  

	}; //end started

	self.ended = function(){
		ANIMIX.activeMove = false;
		//logger.status("move ended!");

	    //if move is complete
	    if ( ANIMIX.currDomNodes.length === 3 ){

	    	// update stats
	        statsMgr.updateOnCompleteMove( round, self );
		    
		    // drop new tiles from the top
			gridMgr.updateGrid( ANIMIX.currDomNodes );

			// TEMP add to dom for debug
			$( ui.score ).text( round.stats.score );
			$( ui.moves ).text( round.stats.moves );

		} else {
			logger.status("Move not completed, not enough tiles");
		}

	    gridMgr.resetAfterMove();

	}; // end ended
}; // end move