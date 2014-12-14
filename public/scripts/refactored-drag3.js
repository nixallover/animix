var activeTurn = false,
	actives = [];

var square = {},
	allSquares = $(".grid-square");

square.validate = function(){
	var self = {};
		//candidate = $(this);
    console.log("validate starting");
    //console.log(this);
    //console.log(square.current);
    //$( candidate ).on('mouseenter', this.activeTurn());

	self.activeTurn = function( candidate ){
		console.log("activeTurn");
		//console.log(candidate);
		if( activeTurn ){
			self.backtracking( candidate );
		} else {
			//don't select anything, not dragging
		};
	};

	self.backtracking = function( candidate ){
		console.log("backtracking");
		console.log(candidate);
		if ( candidate.hasClass('selected') ){
			self.firstSquare();
		} else {
			self.lessThanMax( candidate );
		};
		// if square already selected
			// this.firstSquare();
		// else
			// this.adjacency();
	};

	self.firstSquare = function(){
		console.log("firstSquare");
		if ( actives.length > 1 ){
			actives.pop().removeClass('selected');
        } else {
            // don't remove the first square
        };
	};

	self.lessThanMax = function( candidate ){
		console.log("lessThanMax");
		if ( actives.length < 3 ){
			self.adjacency( candidate );
		} else {
			// don't select any more
		};
		// if active nodes < 3
			// this.backtracking();
		// else
			// don't select anymore
	};

	self.adjacency = function( candidate ){
		console.log("adjacency");
        console.log(actives.length < 1);
		var isAdjacent,
			lastActive = $( actives.slice(0).pop() );

		function directNeighbor(side1, side2){
			if ( lastActive.data(side1) == candidate.data(side1) ){
				if ( lastActive.data(side2) == (candidate.data(side2) + 1) || lastActive.data(side2) == (candidate.data(side2) - 1)  )
				isAdjacent = true;
			} else {
				// not directly adjacent
			};
			return isAdjacent;
		}

		// if this is the first square
		if ( actives.length < 1 ){
			self.done.success( candidate );
            
        // if square is directly adjacent in either direction
        } else if (directNeighbor("row", "column") || directNeighbor("column", "row")){
			self.done.success( candidate );
            
        } else {
            //don't add!
        };

		// if new is same row as lastActive
			// if new == lastActive col +/-1
				// true

		// if new is same col as lastActive
			// if new == lastActive row +/-1
				// true

		// if isAdjacent
			// this.success();
	};

	self.done = {
		success: function( candidate ){
			console.log("done.success!!!");
			candidate.addClass('selected');
	        //candidate.data('arrayIndex', actives.length);
	        actives.push( candidate );

			// update ui
			// add to array
		}
	};

	// init
	self.activeTurn( $(this) );
};

square.reset = function(){
    console.log("done.reset");
    allSquares.removeClass('selected');
    actives = [];
};

// start turn when user clicks any square
allSquares.on('mousedown', function(){
    console.log("turn start");
    activeTurn = true;
    allSquares.on( "mousedown", square.validate);  
});

// end turn when player stops dragging anywhere on screen
$(window).on('mouseup', function(){
    console.log("turn end");
    activeTurn = false;
    //allSquares.off( "mouseenter", square.validate);
    square.reset();
    
});

allSquares.on( "mouseenter", square.validate);
