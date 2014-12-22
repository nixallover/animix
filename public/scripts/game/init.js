// game init

var ANIMIX = {
	activeMove: false,
	currDomNodes: [],
	currParts: {}
}; // ANIMIX

$(function(){
	//eventually this will deal with game states
	logger.status("Starting game!");
	roundInit();

});