var stats = {};

stats.update = function(round,move){
	var score = {
		base: 1,
		original: 3
	};
	console.log(round.animalsCreated);

	// compare to previous stats - FIXME object value equality
	function isDuplicate(newAnimal, animalsCreated){
		//console.log(round.animalsCreated);m
		//console.log(move.values);
		// console.log(round.animalsCreated.indexOf(move.values));
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
	};

	debugLog("isDuplicate?");
	debugLog(isDuplicate(move.values, round.animalsCreated));

	if ( isDuplicate(move.values, round.animalsCreated) ){
		round.stats.duplicates += 1;
		round.stats.score += score.base;
	} else {
		//alert("original");
		round.stats.originals += 1;
		round.stats.score += score.original;
	};

	//combo multipliers

	// add new stat
	round.animalsCreated.push(move.values);

	//temp
	round.stats.dumbScore += 1;
	round.stats.turns += 1;
	$("#debug-status").text(JSON.stringify(round))
	debugLog("updateStats() completed!");
};