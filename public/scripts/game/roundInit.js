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
					//positions: {},
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
	    console.log("turn started!");
	    activeTurn = true;
	    turnManager();

	// end turn when user stops dragging
	}).on('mouseup', function(){
	    console.log("turn ended!");
	    activeTurn = false;
	    turnManager();

	    //reset everything
	    $ui.grid.square.removeClass('selected');
	    //console.log(currMove.domNodes);
	    currMove.domNodes = [];
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
	    
	    var $theSquare = $(this),
	        squareAlreadySelected = $theSquare.hasClass('selected');

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
	            checkSquaresAreAdjacent($theSquare, currMove.domNodes);
	            
	        } else {
	            // max squares selected, don't select any more
	        };
	    };
	    
	    console.log(currMove.domNodes);
	    //console.log(currMove.domNodes.length);
	};

	function checkSquaresAreAdjacent($theSquare, theDomNodes){

	    if ( theDomNodes.length < 1 ){
	        //console.log('first square');
	        squareAddSuccess($theSquare, theDomNodes);

	    } else if( isAdjacent($theSquare, theDomNodes) ){
	        //console.log('Success: SAME ROW OR COLUMN!');
	        squareAddSuccess($theSquare, theDomNodes);
	        
	    } else {
	        console.log('Error: diff row and col');
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
	    $theSquare.addClass('selected');
	    $theSquare.data('arrayIndex', theDomNodes.length);
	    currMove.domNodes.push( $theSquare );
	}


	// $ui.grid.square.on("click", function(){
	// 	var $img = $(this).children("img");
	// 	var selected = {
	// 		animal : $img.attr("data-animal"),
	// 		part : $img.attr("data-part")
	// 	},
	// 	valuesLength = Object.keys(currMove.values).length;

	// 	//check that part type hasn't been picked in this turn yet
	// 	if( !currMove.values[selected.part] ){
	// 		currMove.values[selected.part] = selected.animal;
	// 		$(this).addClass("selected");

	// 		//when currMove.values has 3 properties, its complete
	// 		if( valuesLength == 2 ){
	// 			debugLog("Move completed!");
	// 			debugLog( currMove.values );

	// 			//add to stats
	// 			updateStats(round,move);

	// 			//update ui
	// 			//debugLog(round.animalsCreated);
	// 			$ui.grid.square.removeClass("selected");
	// 			$ui.score.text(round.stats.score);
	// 			$ui.turns.text(round.stats.turns);

	// 			//reset
	// 			currMove.values = {};
	// 		};

	// 	} else {
	// 		debugLog("Not adding square.. this part was already selected for this move");
	// 	};

		//console.log( currMove.values );




};