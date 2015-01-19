var statsMgr = {};
	statsMgr.check = {};

statsMgr.updateOnCompleteMove = function( round ){
	var multipliers = {
		base		: 1,
		original 	: 3
	},
	statsToInsert = [
		"score",
		"moves",
		"originals",
		"duplicates",
		"combos",
		"solids"
	];

	// if the combo has already been made this round
	if ( statsMgr.check.isDuplicate( ANIMIX.currParts, round.animalsCreated ) ){
		//logger.status("this combo is a duplicate");
		round.stats.duplicates += 1;
		round.stats.combos = 0;
		round.stats.score += multipliers.base;
		// add: reset combo counter

	// else it's original
	} else {
		//logger.status("this combo is original");
		round.stats.originals += 1;
		round.stats.combos += 1;
		round.stats.score += multipliers.original;
	}; // updateOnCompleteMove()

	statsMgr.check.isSolid( ANIMIX.currParts );

	// combo multipliers

	// add new animal to party
	round.animalsCreated.push( ANIMIX.currParts );

	round.stats.moves += 1;

	// update stats on scoreboard
	function addToDom(stat){
		$( ui.log[stat] ).text( round.stats[stat] );
	};
	_.each( statsToInsert, addToDom);

	//logger.status("updateStats() completed!");

}; // statsMgr.updateOnCompleteMove()


statsMgr.check.isDuplicate = function( newAnimal, animalsCreated ){
	var isDup = false;

	_.each(animalsCreated, function(prevAnimal){
		if( _.isEqual(prevAnimal, newAnimal) ){
			isDup = true;
		} else {
			// not a duplicate
		};
	});
	return isDup;
}; // check.isDuplicate()

// WIP
statsMgr.check.longestCombo = function(){

}; // statsMgr.check.longestCombo()

// WIP
statsMgr.check.isSolid = function( newAnimal ){
	if( newAnimal.a == newAnimal.b && newAnimal.b == newAnimal.c ){
		//round.stats.solids += 1;
	} else {
		// not solid
	}
}; // statsMgr.check.isSolid()