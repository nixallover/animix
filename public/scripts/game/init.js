// game init

var ANIMIX = {
	activeMove: false,
	currDomNodes: [],
	currParts: {}
};

$(function(){
	//eventually this will deal with game states
	logger.status("Starting game!");
	roundInit();

});