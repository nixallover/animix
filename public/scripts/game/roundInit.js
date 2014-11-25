function roundInit(){

	var round 	= {
					animalsCreated: [],
					stats: {
						dumbScore: 0,
						score: 0,
						turns:0,
						duplicates: 0,
						originals: 0,
						combos: 0,
						longestCombo: 0
					}
				};
	var move 	= {
					values: {},
					positions: {}
				};

	var $ui = {
		grid: {
			square: $(".grid-square")
		},
		status: $("#status"),
		score: $("#score"),
		turns: $("#turns")
	}


	$ui.grid.square.on("click", function(){
		var $img = $(this).children("img");
		var selected = {
			animal : $img.attr("data-animal"),
			part : $img.attr("data-part")
		},
		valuesLength = Object.keys(move.values).length;

		if( !move.values[selected.part] ){
			move.values[selected.part] = selected.animal;
			$(this).addClass("selected");

			//when move.values has 3 properties, its complete
			if( valuesLength == 2 ){
				debugLog("Move completed!");
				debugLog( move.values );

				//add to stats
				updateStats(round,move);

				//update ui
				//debugLog(round.animalsCreated);
				$ui.grid.square.removeClass("selected");
				$ui.score.text(round.stats.score);
				$ui.turns.text(round.stats.turns);

				//reset
				move.values = {};
			};

		} else {
			debugLog("Not adding square.. this part was already selected for this move");
		};

		//console.log( move.values );

	});


};