// game init

$(function(){
	debugLog("START GAME!");

	$.each( $(".grid-square"), function(index, value){
		generatePart(value);
	});

	roundInit();

});