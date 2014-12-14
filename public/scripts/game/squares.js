var squares = {};
	squares.check = {};
	squares.add = {};

squares.selector = function(square,turn){
	/* before successfully selecting the square, check that:
    	- it's not already selected (for backtracking)
    	- the selected parts isn't more than 3
    	- the squares are next to each other
    	- that type of part hasn't been selected yet
    */

    var valuesLength = Object.keys(turn.values).length;
	var candidate = {};

	candidate.square 			= $(square);
	candidate.isAlreadySelected = $(square).hasClass('selected');
	candidate.selected 			= {
									animal 	: $(square).children("img").attr("data-animal"),
									part 	: $(square).children("img").attr("data-part")
								};

    //logger.debug(candidate.square);


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
				logger.status("Not adding square.. this part was already selected for this move");
			}
            
        } else {
            // max squares selected, don't select any more
        }
    }
    
    logger.debug(turn.domNodes);
    //logger.status(turn.domNodes.length);
};

squares.check.alreadySelected = function(){};


squares.check.areAdjacent = function(candidate, turn){

    // if this is the first square or it's adjacent from the last one
    if ( turn.domNodes.length < 1 || isAdjacent(candidate, turn.domNodes)){
        squares.add.success(candidate, turn);
        
    } else {
        logger.status('Error: diff row and col');
    }

    function isAdjacent( candidate, theDomNodes ){
        var isItAdjacent = false,
            // create copy of last dom node added to compare to (slice creates copy of an array)
            $prevSquare = $( theDomNodes.slice(0).pop() );

        function checkDirectNeighbor(set){
            if ( (candidate.square.data(set) === (candidate.square.data(set) +1)) || (candidate.square.data(set) === (candidate.square.data(set) -1)) ) {
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

squares.check.isAdjacent = function( $theSquare, theDomNodes, callback ){

}


// stuff to run if adding as square is successful
squares.add.success = function( candidate, turn ){
	logger.status("squareAddSuccess starting");
    logger.debug(candidate);
    candidate.square.addClass('selected');
    candidate.square.data('arrayIndex', turn.domNodes.length);
    turn.domNodes.push( candidate.square );
}