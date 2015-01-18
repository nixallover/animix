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

	self.start = function(){
		var move 	= {},
			timer 	= {};

		//animation
    	animate.panel( ui.containers.game, "start" );

    	animate.popup( ui.popups.at.roundStart );

    	// WIP
    	//modal animation (temp placement)
    	// $( ui.modals.container ).show();
    	// $( ui.modals.roundStart ).addClass( 'animated zoomInUp' );
    	// //$( ui.modals.roundStart ).addClass( 'zoomOut' );
    	// //$( ui.modals.container ).hide();
    	// window.setTimeout( closeModal, seconds(2) )

    	// function closeModal(){

    	// 	//$( ui.modals.roundStart ).addClass( 'zoomOutDown' );
    	// 	$( ui.modals.container ).hide();
    	// };

		// keep images from dragging
		// FIXME doesn't work to reference $ui.part, not sure why
		$( ui.grid ).on("dragstart", ui.part, function(e) {
			e.preventDefault();
		});

		$( ui.grid ).on( "mousedown", ui.tile, { round: self }, tileMgr.success);
		$( ui.grid ).on( "mouseenter", ui.tile, { round: self }, tileMgr.validate);

		//console.log(tileMgr.validate.done);

		// start timer
		timer = new Timer( variables.roundTime );
		timer.start( self );

		// start move when user clicks any tile
		$( ui.grid ).on("mousedown", ui.tile, function(){
			move = new Move(self);
		    move.started();
		});

		// attach pause button handler
		menuMgr.pauseGame( timer );

		// end move when player stops dragging anywhere on screen
		$( window ).on("mouseup", function(){
			if( ANIMIX.activeMove === true ){
				move.ended();
			} else {
				//logger.status("no move currently active");
			}
		});

	}; // Round.start();

	self.end = function(){
		animate.popup( ui.popups.at.roundEnd );
		console.log( "This round is over!!" );

		//need to figure out how to secure/obscure all of this..
		//turn off ability to move
		//hide game grid
		//move to stats grid

		//FIXME this should actually do more, it's just hiding the container..
		// $( ui.containers.game )
		// 	.addClass( 'animated bounceOutUp' );

		//animation
    	animate.panel( ui.containers.game, "end", getRoundEndStats );

        function getRoundEndStats(){
			$.ajax({
	            url: "/roundEndStats",
	            type: "POST",
	            data: { stats: 100 },
	            error: function(xhr, textStatus, errMsg) {
	                if ( xhr.status !== 0) {
	                    console.log("ERROR: Failed!" + errMsg);
	                }
	            },
	            success: function(data, textStatus, xhr) {
	                $( ui.containers.roundEndStats ).html( data );
	                animate.panel( ui.containers.roundEndStats, "start" );
	            }
	        }); //ajax
        } //getRoundEndStats

	}; // Round.end();
}; // Round()