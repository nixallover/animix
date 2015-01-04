// game init

var ANIMIX = {
	activeMove: false,
	currDomNodes: [],
	currParts: {}
}; // ANIMIX

$(function(){
	var round = new Round();

	logger.status("Starting game!");

	// generate initial grid
	_.each( $( ui.tile ), gridMgr.generatePart);

	// start round!
	round.init();

});