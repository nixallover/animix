// Round class

function Round(){
	var self = this;
	self.animalsCreated = [];

	// FIXME separate into new constructor
	//self.stats = new Stats();
	self.stats = {
		score			: 0,
		moves			: 0,
		duplicates		: 0,
		originals		: 0,
		combos			: 0,
		longestCombo	: 0,
		solids			: 0
	}; // Round.stats

	self.init = function(){
		var move = {};
		//logger.status("round.init!");

		// keep images from dragging
		// FIXME doesn't work to reference $ui.part, not sure why
		$( ui.grid ).on("dragstart", ui.part, function(e) {
			e.preventDefault();
		});

		$( ui.grid ).on( "mousedown", ui.tile, { round: self }, tileMgr.success);
		$( ui.grid ).on( "mouseenter", ui.tile, { round: self }, tileMgr.validate);

		//console.log(tileMgr.validate.done);

		// start move when user clicks any tile
		$( ui.grid ).on("mousedown", ui.tile, function(){
			move = new Move(self);
		    move.started();
		});

		// attach pause button handler
		menuMgr.pauseGame();

		// end move when player stops dragging anywhere on screen
		$( window ).on("mouseup", function(){
			if( ANIMIX.activeMove === true ){
				move.ended();
			} else {
				//logger.status("no move currently active");
			}
		});

		window.setTimeout();
	}; // Round.init();
}; // Round()