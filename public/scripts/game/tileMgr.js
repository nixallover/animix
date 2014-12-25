var tileMgr = {};

tileMgr.validate = function(event){
    var self = {};

    self.isActiveMove = function( candidate ){
        //console.log("isActiveMove");
        //console.log(candidate);
        if( ANIMIX.activeMove ){
            console.log("isActiveMove");
            self.backtracking( candidate );
        } else {
            console.log("not active move");
            //don't select anything, not dragging
        }
    }; // tileMgr.validate

    self.backtracking = function( candidate ){
        //console.log(candidate);
        if ( candidate.hasClass('selected') ){
            //console.log("backtracking!");
            self.firstTile();
        } else {
            self.lessThanMax( candidate );
        }
    }; // tileMgr.validate

    self.firstTile = function(){
        //console.log("firstTile");

        // if more than 1 tiles selected
        if ( ANIMIX.currDomNodes.length > 1 ){
            // get the part name of the last selected node
            var partToRemove = ANIMIX.currDomNodes.slice().pop().children(".part").attr("data-part");

            // remove last dom node and remove active classes
            ANIMIX.currDomNodes.pop().removeClass('selected');
            ANIMIX.currParts[ partToRemove ] = "";
        } else {
            // don't remove the first tile
        }
    }; // tileMgr.validate

    self.lessThanMax = function( candidate ){
        //console.log("lessThanMax");
        if ( ANIMIX.currDomNodes.length < 3 ){
            self.partNotYetSelected( candidate );
        } else {
            // don't select any more
        }
    }; // tileMgr.validate

    self.partNotYetSelected = function( candidate ){
        if( !ANIMIX.currParts[candidate.children("img").attr("data-part")] ){
            self.adjacency( candidate );

        } else {
            // part already selected, don't select another
            logger.status("Not adding tile.. this part was already selected for this move");
        }
    }; // tileMgr.validate.partNotYetSelected()

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
    }; // tileMgr.validate.adjacency()

    // successfully add tile
    self.done = {
        success: function( candidate ){
            candidate.addClass('selected');

            //assign animal to parts object
            ANIMIX.currParts[candidate.children("img").attr("data-part")] = candidate.children("img").attr("data-animal");

            //add to DOM stack
            ANIMIX.currDomNodes.push( candidate );

        } // tileMgr.validate.done.success()
    }; // tileMgr.validate.done

    // init
    self.isActiveMove( $(this) );
}; // tileMgr.validate()