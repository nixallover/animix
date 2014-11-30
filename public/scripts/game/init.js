// game init

$(function(){
	debugLog("START GAME!");

	$.each( $(".grid-square"), function(index, value){
		grid.generatePart(value);
	});

	roundInit();

});