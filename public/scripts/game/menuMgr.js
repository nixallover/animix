/**
 * MENU MANAGER
 * deals with all menu interactions, inside and outside the game (works closely with game state)
 */

var menuMgr = {};

menuMgr.pauseGame = function(){
	//console.log("pausing!");
	$( ui.buttons.roundPause ).on("click", function(){
		console.log("pausing!");
	});
};

//console.log("pausing!");