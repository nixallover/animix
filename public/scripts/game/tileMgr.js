var tileMgr = {};

tileMgr.validate = function(event){
    var self = {};

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
            self.firstTile();
        } else {
            self.lessThanMax( candidate );
        };
    };

    self.firstTile = function(){
        //console.log("firstTile");
        if ( ANIMIX.currDomNodes.length > 1 ){
            ANIMIX.currDomNodes.pop().removeClass('selected');
            ANIMIX.currParts.pop();
        } else {
            // don't remove the first tile
        };
    };

    self.lessThanMax = function( candidate ){
        //console.log("lessThanMax");
        if ( ANIMIX.currDomNodes.length < 3 ){
            self.partNotYetSelected( candidate );
        } else {
            // don't select any more
        };
    };

    self.partNotYetSelected = function( candidate ){
        if( !ANIMIX.currParts[candidate.children("img").attr("data-part")] ){
            self.adjacency( candidate );

        } else {
            // part already selected, don't select another
            logger.status("Not adding tile.. this part was already selected for this move");
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
            }

            return isAdjacent;
        }

        // if this is the first tile
        if ( ANIMIX.currDomNodes.length < 1 ){
            self.done.success( candidate );
            
        // if tile is directly adjacent in either direction
        } else if (directNeighbor("row", "column") || directNeighbor("column", "row")){
            self.done.success( candidate );
            
        } else {
            //don't add!
        }
    };

    // successfully add tile
    self.done = {
        success: function( candidate ){
            candidate.addClass('selected');

            //assign animal to parts object
            ANIMIX.currParts[candidate.children("img").attr("data-part")] = candidate.children("img").attr("data-animal");

            //add to DOM stack
            ANIMIX.currDomNodes.push( candidate );
            //console.log(ANIMIX.currDomNodes);

        }
    };

    // init
    self.isActiveTurn( $(this) );
};

// tileMgr.reset = function(){
//     //console.log("tileMgr.reset");
//     $( ui.tile ).removeClass('selected');
//     ANIMIX.currDomNodes = [];
//     ANIMIX.currParts = {};
// };