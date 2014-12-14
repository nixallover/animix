var numberOfAnimals = 4;
var grid = {};

grid.getRandomAnimal = function() {
	return (Math.floor(Math.random() * (numberOfAnimals)) + 1).toString();
}; // getRandomAnimal()

grid.getRandomPart = function() {
	var part = "",
		bleh = Math.floor(Math.random() * (3)) + 1;

	switch (bleh) {
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
}; // getRandomPart()

grid.generatePart = function(gridPos){
	var animal = "1",
		part = "b";

	animal = grid.getRandomAnimal();
	part = grid.getRandomPart();
	//logger.debug(animal);

	var imageName = animal + part;

	$( gridPos ).html(
		'<img class="part" src="img/' + imageName + 
		'.png" data-animal="'+ animal +
		'" data-part="'+ part +
		'" />');
}; // generatePart

grid.updateGrid = function(gridSquare){
	$.each(gridSquare, function( key, value ){
		//logger.output("gridSquare", value);

		var square = {};
        square.node = $(value);
        square.rowNum = parseInt($(value).data("row"));
        square.colNum = parseInt($(value).data("column"));
    
        //alert(JSON.stringify(squareObj));
    
        $(value).children(".part").remove();
    
        // if it's not the top square, drop the ones above it down 1
        if ( square.rowNum > 1 ){
            grid.dropPartsAbove(square);
        }; // if
        grid.dropNewPart(square);
	}); // each part
};

grid.dropPartsAbove = function(squareObj){
    var prevRows = squareObj.rowNum - 1;
    for(var i=1; i<prevRows+1; i++){
        var $fallingPart = $(".grid-square[data-row='" + i + "'][data-column='" + squareObj.colNum + "']")
                            .children(".part:first-child")
                            .detach(),
            $targetSquare = $(".grid-square[data-row='" + (i + 1) + "'][data-column='" + squareObj.colNum + "']");
        
        //alert(".grid-square[data-row='" + (i + 1) + "'][data-column='" + $columnNum + "']");
        $targetSquare.append($fallingPart);
    } // for
} // dropPartsAbove

grid.dropNewPart = function(squareObj){
    var $newSquare = $(".grid-square[data-row='1'][data-column='" + squareObj.colNum + "']");
    grid.generatePart($newSquare);
    //BUG: squareSelector not available here so event handler is not attached
    //$newSquare.on('mouseenter', squareSelector );
}