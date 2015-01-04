// game init


// variables that need to be globally accessible
var ANIMIX = {
	activeMove: false,
	currDomNodes: [],
	currParts: {}
}; // ANIMIX


$(function(){
	var round = new Round();

	// generate initial grid
	_.each( $( ui.tile ), gridMgr.generatePart);

	// start round!
	round.start();

});