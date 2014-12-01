function roundInit(){

	var round 	= {
					animalsCreated: [],
					stats: {
						dumbScore: 0,
						score: 0,
						turns:0,
						duplicates: 0,
						originals: 0,
						combos: 0,
						longestCombo: 0
					}
				};
	var currMove = {
					values: {},
					domNodes: []
				};
	var activeTurn = false;
	var $ui = {
			grid: {
				square: $(".grid-square")
			},
			status: $("#status"),
			score: $("#score"),
			turns: $("#turns")
		};

	// makes sure 1st square gets selected
	$ui.grid.square.on('mousedown', squareSelector );

	// keep image from dragging
	$('img').on('dragstart', function(e) {
		e.preventDefault();
	});

	// start turn when user starts dragging
	$(window).on('mousedown', function(){
	    logger.status("turn started!");
	    activeTurn = true;
	    turnManager();

	// end turn when user stops dragging
	}).on('mouseup', function(){
	    logger.status("turn ended!");
	    activeTurn = false;
	    turnManager();

	    //if move is complete
	    if ( currMove.domNodes.length === 3 ){
	        stats.update(round, currMove);
		    $ui.score.text(round.stats.score);
			$ui.turns.text(round.stats.turns);
		} else {
			logger.status("Turn not recorded, not enough squares");
		}

	    //reset everything
	    $ui.grid.square.removeClass('selected');
	    //logger.debug(currMove.domNodes);
	    currMove.domNodes = [];
	    currMove.values = {};

	});

	function turnManager(){
	    if (activeTurn){
	        // add event handler to all squares
	        $ui.grid.square.on('mouseenter', squareSelector );

	    } else {
	        // remove event handler to all squares
	        $ui.grid.square.off('mouseenter', squareSelector );

	    }
	}

	function squareSelector(){
		/* before successfully selecting the square, check that:
	    	- it's not already selected (for backtracking)
	    	- the selected parts isn't more than 3
	    	- the squares are next to each other
	    	- that type of part hasn't been selected yet
	    */

	    var $theSquare 				= $(this),
	        squareAlreadySelected 	= $theSquare.hasClass('selected'),
	        $img 					= $theSquare.children("img"),
	        valuesLength 			= Object.keys(currMove.values).length,
			selected 				= {
										animal : $img.attr("data-animal"),
										part : $img.attr("data-part")
									};

	    if ( squareAlreadySelected ){
	        //pop the last one off the stack and un-select it
	        //if there's more than 1 thing in the stack
	        if ( currMove.domNodes.length > 1 ){
	            currMove.domNodes.pop().removeClass('selected');
	        } else {
	            // don't remove anything
	        };

	    } else {
	        if (currMove.domNodes.length < 3){
				//check that part type hasn't been picked in this turn yet
				if( !currMove.values[selected.part] ){
					currMove.values[selected.part] = selected.animal;
					checkSquaresAreAdjacent($theSquare, currMove.domNodes);

				} else {
					// part already selected, don't select another
					logger.status("Not adding square.. this part was already selected for this move");
				}
	            
	        } else {
	            // max squares selected, don't select any more
	        }
	    }
	    
	    logger.status(currMove.domNodes);
	    //logger.status(currMove.domNodes.length);
	}

	// function checkPartIsAvailable(){
	// 	//check that part type hasn't been picked in this turn yet
	// 	if( !currMove.values[selected.part] ){
	// 		currMove.values[selected.part] = selected.animal;

	// 		};

	// 	} else {
	// 		logger.status("Not adding square.. this part was already selected for this move");
	// 	};

	// }

	function checkSquaresAreAdjacent($theSquare, theDomNodes){

	    if ( theDomNodes.length < 1 ){
	        //logger.status('first square');
	        squareAddSuccess($theSquare, theDomNodes);

	    } else if( isAdjacent($theSquare, theDomNodes) ){
	        //logger.status('Success: SAME ROW OR COLUMN!');
	        squareAddSuccess($theSquare, theDomNodes);
	        
	    } else {
	        logger.status('Error: diff row and col');
	    }

	    function isAdjacent( $theSquare, theDomNodes ){
	        var isItAdjacent = false,
	            // create copy of last dom node added to compare to (slice creates copy of an array)
	            $prevSquare = $( theDomNodes.slice(0).pop() );

	        function checkDirectNeighbor(set){
	            if ( ($prevSquare.data(set) === ($theSquare.data(set) +1)) || ($prevSquare.data(set) === ($theSquare.data(set) -1)) ) {
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

	}

	// stuff to run if adding as square is successful
	function squareAddSuccess($theSquare, theDomNodes){
		logger.status("squareAddSuccess starting");
	    $theSquare.addClass('selected');
	    $theSquare.data('arrayIndex', theDomNodes.length);
	    currMove.domNodes.push( $theSquare );
	}


};