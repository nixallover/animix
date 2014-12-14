/*square.validate


	validate.activeTurn: if active turn

	validate.backtracking: if backtracking (square selected)


	validate.adjacency
		var isAdjacent, lastActive, new

		if new is same row as lastActive
			if new == lastActive col +/-1
				true

		if new is same col as lastActive
			if new == lastActive row +/-1
				true

	validate.success
		update ui
		add to array

*/

var square = square || {};
var activeTurn = false,
	actives = [];

$(window).on('mousedown', function(){
        activeTurn = true;
        
    }).on('mouseup', function(){
        activeTurn = false;
    });
});

square.current.validate.start(actives);

//FIX ME
square.current = $(".grid-square");
square.validate = {
    start: function( actives ){
        console.log("validating");
        this.activeTurn( this, actives );
    },
	activeTurn: function( candidate, actives ){
		console.log("activeTurn");
		if( activeTurn ){
			this.lessThanMax( candidate, actives );
		} else {
			//don't continue
		};

	},
	lessThanMax: function( candidate, actives ){
		console.log("lessThanMax");
		if ( actives.length < 3 ){
			this.backtracking( candidate, actives );
		} else {
			// don't select any more
		};
		// if active nodes < 3
			// this.backtracking();
		// else
			// don't select anymore

	},
	backtracking: function( candidate, actives ){
		console.log("backtracking");
		if ( candidate.hasClass('selected') ){
			this.firstSquare( actives );
		} else {
			this.adjacency( candidate, actives );
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
	adjacency: function( candidate, actives ){
		console.log("adjacency");
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

		// if isAdjacent is true in either case
		if (directNeighbor("row", "column") || directNeighbor("column", "row")){
			this.results.success();
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
		success: function( candidate, actives ){
			console.log("results.success");
			candidate.addClass('selected');
	        //candidate.data('arrayIndex', actives.length);
	        actives.push( candidate );

			// update ui
			// add to array
		};
	};
};