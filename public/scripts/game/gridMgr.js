/**
 * GRID MANAGER
 * generates, adds, REMOVES (need to add this) tiles, and drops new ones down from the top at the end of every turn
 */

var numberOfAnimals = variables.numberOfAnimals;
var gridMgr = {};
	gridMgr.getRandom = {};
	
gridMgr.getRandom.animal = function() {
	return (Math.floor(Math.random() * (numberOfAnimals)) + 1).toString();
}; // gridMgr.getRandom.animal()

gridMgr.getRandom.part = function() {
	var part = "",
		possibleParts = Math.floor(Math.random() * (3)) + 1;

	switch (possibleParts) {
		case 1:
			part = "a";
			break;
		case 2:
			part = "b";
			break;
		case 3:
			part = "c";
			break;
		default:
			alert("ERROR: can't get random part");
	};
	//logger.debug("Part selected: " + part);
	return part;
}; // gridMgr.getRandom.part()

gridMgr.generatePart = function( gridPos ){
	var animal = "1",
		part = "b";

	animal = gridMgr.getRandom.animal();
	part = gridMgr.getRandom.part();
	//logger.debug(animal);

	var imageName = animal + part;

	$( gridPos ).html(
		'<img class="part" src="img/' + imageName + 
		'.png" data-animal="'+ animal +
		'" data-part="'+ part +
		'" />');
}; // gridMgr.generatePart()

gridMgr.updateGrid = function( gridTile ){
	$.each( gridTile, function( key, value ){
		//logger.output("gridTile", value);

		var tile = {};
        tile.node = $(value);
        tile.rowNum = parseInt( $(value).data("row") );
        tile.colNum = parseInt( $(value).data("column") );
    
        //alert(JSON.stringify(tileObj));
    
        $(value).children(".part").remove();
    
        // if it's not the top tile, drop the ones above it down 1
        if ( tile.rowNum > 1 ){
            gridMgr.dropTilesAbove( tile );
        }; // if
        gridMgr.dropNewTile( tile );
	}); // each part
}; // gridMgr.updateGrid()


gridMgr.dropTilesAbove = function( tileObj ){
    var prevRows = tileObj.rowNum - 1;
    for(var i=1; i<prevRows+1; i++){
        var fallingPart = $(".tile[data-row='" + i + "'][data-column='" + tileObj.colNum + "']")
                            .children(".part:first-child")
                            .detach(),
            targetTile = ".tile[data-row='" + (i + 1) + "'][data-column='" + tileObj.colNum + "']";

        $( targetTile ).append( fallingPart );
    } // for
}; // gridMgr.dropTilesAbove()

gridMgr.dropNewTile = function( tileObj ){
    var newTile = ".tile[data-row='1'][data-column='" + tileObj.colNum + "']";
    gridMgr.generatePart( newTile );
}; // gridMgr.dropNewTile()


gridMgr.resetAfterMove = function(){
    //console.log("tileMgr.reset");
    $( ui.tile ).removeClass('selected');
    ANIMIX.currDomNodes = [];
    ANIMIX.currParts = {};
}; // gridMgr.resetAfterMove()