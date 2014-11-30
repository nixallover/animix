var numberOfAnimals = 4;
var grid = {};

grid.getRandomAnimal = function() {
	return (Math.floor(Math.random() * (numberOfAnimals)) + 1).toString();
}; // getRandomAnimal()

grid.getRandomPart = function() {
	var part = "",
		bleh = Math.floor(Math.random() * (3)) + 1;

	switch (bleh) {
		case 1:
			part = "a";
			break;
		case 2:
			part = "b";
			break;
		case 3:
			part = "c";
			break;
		default:
			alert("ERROR: can't get random part");
	};
	//console.log("Part selected: " + part);
	return part;
}; // getRandomPart()

grid.generatePart = function(gridPos){
	var animal = "1",
		part = "b";

	animal = grid.getRandomAnimal();
	part = grid.getRandomPart();
	//debugLog(animal);

	var imageName = animal + part;

	$( gridPos ).html(
		'<img src="img/' + imageName + 
		'.jpg" data-animal="'+ animal +
		'" data-part="'+ part +
		'" />');
}; // generatePart