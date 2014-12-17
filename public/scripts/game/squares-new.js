var square = {};
    //activeTurn = activeTurn || true;

square.validate = function(event){
    //console.log(gameName);
    var self = {};
        //activeTurn = false;
        //candidate = $(this);
    //round = event.data.round;
    turn = event.data.turn;
    theDomNodes = turn.domNodes || [];
    console.log("validate starting");
    console.log(theDomNodes);
    //console.log(event.data.round.activeTurn);

    self.isActiveTurn = function( candidate ){
        //console.log("isActiveTurn");
        //console.log(candidate);
        if( round.activeTurn ){
            self.backtracking( candidate );
        } else {
            console.log("not activeTurn");
            //don't select anything, not dragging
        };
    };

    self.backtracking = function( candidate ){
        //console.log(candidate);
        if ( candidate.hasClass('selected') ){
            console.log("backtracking!");
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
        if ( theDomNodes.length > 1 ){
            theDomNodes.pop().removeClass('selected');
        } else {
            // don't remove the first square
        };
    };

    self.lessThanMax = function( candidate ){
        console.log("lessThanMax");
        if ( theDomNodes.length < 3 ){
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
        console.log(theDomNodes.length < 1);
        var isAdjacent,
            lastActive = $( theDomNodes.slice(0).pop() );

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
        if ( theDomNodes.length < 1 ){
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
            //candidate.data('arrayIndex', theDomNodes.length);
            console.log("round is" + round)
            turn.domNodes.push( candidate );

            // update ui
            // add to array
        }
    };

    // init
    self.isActiveTurn( $(this) );
};

square.reset = function(){
    console.log("done.reset");
    $ui.grid.square.removeClass('selected');
    //theDomNodes = [];
};