// game init

$(function(){
	logger.status("Booting up a game!");

	$.each( $(".grid-square"), function(key, value){
		grid.generatePart(value);
	});

	roundInit();

});