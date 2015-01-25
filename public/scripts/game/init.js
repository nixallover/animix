// game init


// variables that need to be globally accessible
var ANIMIX = {
	activeMove: false, // true when mouse is down
	currDomNodes: [], // dom refs for current move
	currParts: {} // obj of current move
}; // ANIMIX


$(function(){
	var round = new Round();

	// generate initial grid
	_.each( $( ui.tile ), gridMgr.generatePart);

	// start round!
	round.start();

});