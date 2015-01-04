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
		newAnimal.head 		= "<img class='partier-head' src='img/dance/" + ANIMIX.currParts.a + "a.png'>";
		newAnimal.torso 	= "<img class='partier-torso' src='img/dance/" + ANIMIX.currParts.b + "b.png'>";
		newAnimal.butt 		= "<img class='partier-butt' src='img/dance/" + ANIMIX.currParts.c + "c.png'>";

	var wrapper = $( ui.containers.animal ).clone().removeClass( "hide" ).attr("id","");
	wrapper
		.append( newAnimal.head )
		.append( newAnimal.torso )
		.append( newAnimal.butt );
	$( ui.floor ).prepend( wrapper );
};

//console.log("pausing!");