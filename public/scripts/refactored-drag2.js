var square = {};
var activeTurn = false,
	actives = [];

$(window).on('mousedown', function(){
    activeTurn = true;
    square.current.on( "mouseenter", square.validate.start);
    
}).on('mouseup', function(){
    activeTurn = false;
    
});

square.current = $(".grid-square");
square.validate = {
    start: function(){
        console.log("validate.start");
        //$( candidate ).on('mouseenter', this.activeTurn());
        this.activeTurn();
    },
	activeTurn: function( candidate ){
		console.log("activeTurn");
		if( activeTurn ){
			this.lessThanMax( this );
		} else {
			//don't continue
		};

	},
	lessThanMax: function( candidate ){
		console.log("lessThanMax");
		if ( actives.length < 3 ){
			this.backtracking( candidate );
		} else {
			// don't select any more
		};
		// if active nodes < 3
			// this.backtracking();
		// else
			// don't select anymore

	},
	backtracking: function( candidate ){
		console.log("backtracking");
		if ( candidate.hasClass('selected') ){
			this.firstSquare( actives );
		} else {
			this.adjacency( candidate );
		};
		// if square already selected
			// this.firstSquare();
		// else
			// this.adjacency();

	},
	firstSquare: function( actives ){
		console.log("firstSquare");
		if ( actives.length > 1 ){
			actives.pop().removeClass('selected');
        } else {
            // don't remove anything
        };
        
	},
	adjacency: function( candidate ){
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
			this.results.success( candidate );
            
        // if square is directly adjacent in either direction
        } else if (directNeighbor("row", "column") || directNeighbor("column", "row")){
			this.results.success( candidate );
            
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
	},
	results: {
		success: function( candidate ){
			console.log("results.success");
			candidate.addClass('selected');
	        //candidate.data('arrayIndex', actives.length);
	        actives.push( candidate );

			// update ui
			// add to array
		}
	}
};