// game init

$(function(){
	logger.status("Booting up a game!");

	$.each( $(".grid-square"), function(index, value){
		grid.generatePart(value);
	});

	roundInit();

});