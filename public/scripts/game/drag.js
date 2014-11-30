
var $square = $(".grid-square"),
    activeTurn = false,
    selectedDomNodes = [];

// makes sure 1st square gets selected
$square.on('mousedown', squareSelector );

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
    $square.removeClass('selected');
    //console.log(selectedDomNodes);
    selectedDomNodes = [];
});

function turnManager(){
    if (activeTurn){
        // add event handler to all squares
        $square.on('mouseenter', squareSelector );

    } else {
        // remove event handler to all squares
        $square.off('mouseenter', squareSelector );

    }
}

function squareSelector(){
    var $theSquare = $(this),
        squareAlreadySelected = $theSquare.hasClass('selected');

    //run checks, and if everything checks out
    if ( squareAlreadySelected ){
        //pop the last one off the stack and un-select it
        //if there's more than 1 thing in the stack
        if ( selectedDomNodes.length > 1 ){
            selectedDomNodes.pop().removeClass('selected');
        } else {
            // don't remove anything
        };

    } else {
        if (selectedDomNodes.length < 3){
            checkSquaresAreAdjacent($theSquare, selectedDomNodes);
            
        } else {
            // max squares selected, don't select any more
        };
    };
    
    //console.log(selectedDomNodes);
    //console.log(selectedDomNodes.length);
};

function checkSquaresAreAdjacent($square, selectedDomNodes){

    if ( selectedDomNodes.length < 1 ){
        console.log('first square');
        squareAddSuccess($square, selectedDomNodes);

    } else if( isAdjacent($square, selectedDomNodes) ){
        //console.log('Success: SAME ROW OR COLUMN!');
        squareAddSuccess($square, selectedDomNodes);
        
    } else {
        console.log('Error: diff row and col');
    }

    function isAdjacent( $square, selectedDomNodes ){
        var isItAdjacent = false,
            // create copy of last dom node added to compare to (slice creates copy of an array)
            $prevSquare = $( selectedDomNodes.slice(0).pop() );

        function checkDirectNeighbor(set){
            if ( ($prevSquare.data(set) === ($square.data(set) +1)) || ($prevSquare.data(set) === ($square.data(set) -1)) ) {
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
function squareAddSuccess($square, selectedDomNodes){
    $square.addClass('selected');
    $square.data('arrayIndex', selectedDomNodes.length);
    selectedDomNodes.push( $square );
}
