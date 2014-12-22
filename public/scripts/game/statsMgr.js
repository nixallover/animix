// separate into new constructor

var statsMgr = {};
	statsMgr.check = {};

statsMgr.updateOnCompleteMove = function( round, move ){
	var score = {
		base: 1,
		original: 3
	};
	//logger.debug(round.animalsCreated);

	//logger.output("isDuplicate", isDuplicate(move.values, round.animalsCreated));
	//logger.debug("isDuplicate?");
	//logger.debug(isDuplicate(move.values, round.animalsCreated));

	// if the combo has already been made this round
	if ( statsMgr.check.isDuplicate(move.values, round.animalsCreated) ){
		logger.status("this combo is a duplicate");
		round.stats.duplicates += 1;
		round.stats.score += score.base;
		// add: reset combo counter

	// else it's original
	} else {
		logger.status("this combo is original");
		round.stats.originals += 1;
		round.stats.score += score.original;
		// add: add to combo counter
	}; // updateOnCompleteMove()

	//combo multipliers

	// add new stat
	round.animalsCreated.push( move.values );

	//temp stats for debugging
	round.stats.dumbScore += 1;
	round.stats.moves += 1;
	$("#debug-status").text(JSON.stringify(round))
	logger.status("updateStats() completed!");
};

// not working right now because it doesn't have proper object comparison
statsMgr.check.isDuplicate = function( newAnimal, animalsCreated ){
	var isDup = false;
	for (i = 0; i < animalsCreated.length; i++){
		console.log("checking");
		console.log(animalsCreated[i]);
		if (animalsCreated[i] == newAnimal){
			isDup = true;
		};
	};
	// TEMP
	return isDup;
}; // check.isDuplicate()