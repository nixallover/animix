var square = {};
    //activeTurn = activeTurn || true;

    //FIXME change squares to tiles

square.validate = function(event){
    //console.log(gameName);
    var self = {};
        //activeTurn = false;
        //candidate = $(this);
    //round = event.data.round;
    //console.log("validate starting");
    //console.log(ANIMIX.currDomNodes);
    //console.log(event.data.round.activeTurn);

    self.isActiveTurn = function( candidate ){
        //console.log("isActiveTurn");
        //console.log(candidate);
        if( ANIMIX.activeTurn ){
            self.backtracking( candidate );
        } else {
            //console.log("not activeTurn");
            //don't select anything, not dragging
        };
    };

    self.backtracking = function( candidate ){
        //console.log(candidate);
        if ( candidate.hasClass('selected') ){
            //console.log("backtracking!");
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
        //console.log("firstSquare");
        if ( ANIMIX.currDomNodes.length > 1 ){
            ANIMIX.currDomNodes.pop().removeClass('selected');
            ANIMIX.currParts.pop();
        } else {
            // don't remove the first square
        };
    };

    self.lessThanMax = function( candidate ){
        //console.log("lessThanMax");
        if ( ANIMIX.currDomNodes.length < 3 ){
            self.partNotYetSelected( candidate );
        } else {
            // don't select any more
        };
        // if active nodes < 3
            // this.backtracking();
        // else
            // don't select anymore
    };

    self.partNotYetSelected = function( candidate ){
        if( !ANIMIX.currParts[candidate.children("img").attr("data-part")] ){
            self.adjacency( candidate );

        } else {
            // part already selected, don't select another
            logger.status("Not adding square.. this part was already selected for this move");
        }
    }

    self.adjacency = function( candidate ){
        //console.log("adjacency");
        //console.log(ANIMIX.currDomNodes.length < 1);
        var isAdjacent,
            lastActive = $( ANIMIX.currDomNodes.slice(0).pop() );

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
        if ( ANIMIX.currDomNodes.length < 1 ){
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

    // successfully add square
    self.done = {
        success: function( candidate ){
            //console.log("done.success!!!");
            candidate.addClass('selected');
            //candidate.data('arrayIndex', ANIMIX.currDomNodes.length);

            candidate.addClass('selected');

            //assign animal to parts object
            ANIMIX.currParts[candidate.children("img").attr("data-part")] = candidate.children("img").attr("data-animal");

            //add to DOM stack
            ANIMIX.currDomNodes.push( candidate );
            console.log(ANIMIX.currDomNodes);
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
    ANIMIX.currDomNodes = [];
    ANIMIX.currParts = {};
};