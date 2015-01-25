/**
 * FLOOR MANAGER
 * populates the dance floor
 */

var floorMgr = {};

floorMgr.addPartyAnimal = function(){
	// for testing
	//$( ui.floor ).text( JSON.stringify(round.animalsCreated) );
	//$( ui.floor ).append( JSON.stringify(ANIMIX.currParts) + "<br>" );
	//console.log( ANIMIX.currParts );

	var newAnimal = {};
		newAnimal.head 		= "<div class='partier-head animal-" + ANIMIX.currParts.a + "'></div>";
		newAnimal.torso 	= "<div class='partier-torso animal-" + ANIMIX.currParts.b + "'></div>";
		newAnimal.butt 		= "<div class='partier-butt animal-" + ANIMIX.currParts.c + "'></div>";

	var wrapper = $( ui.panels.animal ).clone().removeClass( "hide" ).attr("id","");
	wrapper
		.append( newAnimal.head )
		.append( newAnimal.torso )
		.append( newAnimal.butt );
	$( ui.floor ).prepend( wrapper );
};

//console.log("pausing!");