
var activeTurn = false,
    currMove.domNodes = [];

// makes sure 1st square gets selected
$ui.grid.square.on('mousedown', squareSelector );

// start turn when user starts dragging
$(window).on('mousedown', function(){
    //console.log("turn started!");
    activeTurn = true;
    turnManager();

// end turn when user stops dragging
}).on('mouseup', function(){
    //console.log("turn ended!");
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
    var $theSquare = $(this),
        squareAlreadySelected = $theSquare.hasClass('selected');

    //run checks, and if everything checks out
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
    
    //console.log(currMove.domNodes);
    //console.log(currMove.domNodes.length);
};

function checkSquaresAreAdjacent($ui.grid.square, currMove.domNodes){

    if ( currMove.domNodes.length < 1 ){
        console.log('first square');
        squareAddSuccess($ui.grid.square, currMove.domNodes);

    } else if( isAdjacent($ui.grid.square, currMove.domNodes) ){
        //console.log('Success: SAME ROW OR COLUMN!');
        squareAddSuccess($ui.grid.square, currMove.domNodes);
        
    } else {
        console.log('Error: diff row and col');
    }

    function isAdjacent( $ui.grid.square, currMove.domNodes ){
        var isItAdjacent = false,
            // create copy of last dom node added to compare to (slice creates copy of an array)
            $prevSquare = $( currMove.domNodes.slice(0).pop() );

        function checkDirectNeighbor(set){
            if ( ($prevSquare.data(set) === ($ui.grid.square.data(set) +1)) || ($prevSquare.data(set) === ($ui.grid.square.data(set) -1)) ) {
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
function squareAddSuccess($ui.grid.square, currMove.domNodes){
    $ui.grid.square.addClass('selected');
    $ui.grid.square.data('arrayIndex', currMove.domNodes.length);
    currMove.domNodes.push( $ui.grid.square );
}
