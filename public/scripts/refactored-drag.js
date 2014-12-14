/*square.validate


	validate.activeTurn: if active turn

	validate.backtracking: if backtracking (square selected)


	validate.adjacency
		var isAdjacent, last, new

		if new is same row as last
			if new == last col +/-1
				true

		if new is same col as last
			if new == last row +/-1
				true

	validate.success
		update ui
		add to array

*/

var square = square || {};
var activeTurn = false,
	selectedDomNodes = [];

//FIX ME
square.current = $(".grid-square");
square.validate = {
	activeTurn: function(){

		// if active
			// this.lessThanMax();
		// else
			// 

	},
	lessThanMax: function(){
		if ( selectedDomNodes.length < 3 ){
			this.backtracking();
		} else {
			// don't select any more
		};
		// if active nodes < 3
			// this.backtracking();
		// else
			// don't select anymore

	},
	backtracking: function(){
		if ( $theSquare.hasClass('selected') ){

		} else {

		};
		// if square already selected
			// this.firstSquare();
		// else
			// this.adjacency();

	},
	firstSquare: function(){
		if ( selectedDomNodes.length > 1 ){
			selectedDomNodes.pop().removeClass('selected');
        } else {
            // don't remove anything
        };
        
	},
	adjacency: function(){
		var isAdjacent,
			last,
			new;

		if (  ){

		} else {

		};
		// if new is same row as last
			// if new == last col +/-1
				// true


		if (  ){

		} else {

		};
		// if new is same col as last
			// if new == last row +/-1
				// true

		// if isAdjacent
			// this.success();
	},
	results: {
		success: function(){
			// update ui
			// add to array
		}
	}
};

square.current.validate();