// Move class

function Move(round){
	var self = this;

	// methods
	self.started = function(){
		//console.log("move start");
		//console.log(self);
	    ANIMIX.activeMove = true;
	    $( ui.grid ).on( "mousedown", ui.tile, { round: round }, tileMgr.validate );  

	}; // Move.started()

	self.ended = function(){
		ANIMIX.activeMove = false;
		//logger.status("move ended!");

	    //if move is complete
	    if ( ANIMIX.currDomNodes.length === 3 ){

	    	// update stats
	        statsMgr.updateOnCompleteMove( round );

	        floorMgr.addPartyAnimal( round );
		    
		    // drop tiles above. drop new tiles from the top
			gridMgr.updateGrid( ANIMIX.currDomNodes );

		} else {
			logger.status("Move not completed, not enough tiles");
		}

	    gridMgr.resetAfterMove();

	}; // Move.ended()
}; // Move()