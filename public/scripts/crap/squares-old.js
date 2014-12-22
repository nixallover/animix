var tiles = {};
	tiles.check = {};
	tiles.add = {};

tiles.selector = function(tile,turn){
	/* before successfully selecting the tile, check that:
    	- it's not already selected (for backtracking)
    	- the selected parts isn't more than 3
    	- the tiles are next to each other
    	- that type of part hasn't been selected yet
    */

    var valuesLength = Object.keys(turn.values).length;
	var candidate = {};

	candidate.tile 			= $(tile);
	candidate.isAlreadySelected = $(tile).hasClass('selected');
	candidate.selected 			= {
									animal 	: $(tile).children("img").attr("data-animal"),
									part 	: $(tile).children("img").attr("data-part")
								};

    //logger.debug(candidate.tile);


	//to go into alreadySelected
    if ( candidate.isAlreadySelected ){
        //pop the last one off the stack and un-select it
        //if there's more than 1 thing in the stack
        if ( turn.domNodes.length > 1 ){
            turn.domNodes.pop().removeClass('selected');
        } else {
            // don't remove anything
        };

    } else {
        if (turn.domNodes.length < 3){
			//check that part type hasn't been picked in this turn yet
			if( !turn.values[candidate.selected.part] ){
				//assign part
				turn.values[candidate.selected.part] = candidate.selected.animal;
				this.check.areAdjacent(candidate, turn);

			} else {
				// part already selected, don't select another
				logger.status("Not adding tile.. this part was already selected for this move");
			}
            
        } else {
            // max tiles selected, don't select any more
        }
    }
    
    logger.debug(turn.domNodes);
    //logger.status(turn.domNodes.length);
};

tiles.check.alreadySelected = function(){};


tiles.check.areAdjacent = function(candidate, turn){

    // if this is the first tile or it's adjacent from the last one
    if ( turn.domNodes.length < 1 || isAdjacent(candidate, turn.domNodes)){
        tiles.add.success(candidate, turn);
        
    } else {
        logger.status('Error: diff row and col');
    }

    function isAdjacent( candidate, theDomNodes ){
        var isItAdjacent = false,
            // create copy of last dom node added to compare to (slice creates copy of an array)
            $prevTile = $( theDomNodes.slice(0).pop() );

        function checkDirectNeighbor(set){
            if ( (candidate.tile.data(set) === (candidate.tile.data(set) +1)) || (candidate.tile.data(set) === (candidate.tile.data(set) -1)) ) {
                return true;
            } else {
                return false;
            }
        }

        if (checkDirectNeighbor('row') && !checkDirectNeighbor('column') || !checkDirectNeighbor('row') && checkDirectNeighbor('column')){
            isItAdjacent = true;
        } else {
            // if both column and rows are +1 or -1 (makes a diagonal), or it's more than +/-1
            // leave it false
        }
        return isItAdjacent;
    }

};

tiles.check.isAdjacent = function( $theTile, theDomNodes, callback ){

}


// stuff to run if adding as tile is successful
tiles.add.success = function( candidate, turn ){
	logger.status("tileAddSuccess starting");
    logger.debug(candidate);
    candidate.tile.addClass('selected');
    candidate.tile.data('arrayIndex', turn.domNodes.length);
    turn.domNodes.push( candidate.tile );
}