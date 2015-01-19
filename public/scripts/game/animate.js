/**
 * Animations
 * pops up all the game dialogs
 */

var animate = {};

animate.popup = function( message ){
    // WIP - this works but it's ugly..
    $( ui.popups.container ).show();
    $( message ).show();
    $( ui.popups.bg ).addClass( "animated zoomInUp" );

    $( ui.popups.bg ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
            $( this ).addClass( "zoomOutUp" );

            $( ui.popups.bg ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
                $( this ).attr("class", "");
                $( message ).hide();
                $( ui.popups.container ).hide();
            });
        });

    // window.setTimeout( closeModal, seconds(2) );

    // function closeModal(){

    //     //not working?
    //     $( ui.popups.bg )
    //         .addClass("zoomInUp")
    //         .addClass( "zoomOutDown" );
    //     $( ui.popups.container ).hide();
    //     $( message ).hide();

    //     //reset classes
    //     $( ui.popups.bg ).attr("class", "");
    // };
}; //animate.popup()


animate.panel = function( panelId, state, callback ){
    if (state == "start"){
        $( panelId )
            .removeClass( "hide" )
            .addClass( "animated bounceInDown" );

    } else if (state == "end"){
        $( panelId )
            .addClass( "animated bounceOutUp" );

        $( panelId ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
            $( this ).addClass( "hide" );

            if( callback ){
                callback();
            }
        });

    } else {
        console.log("please specify state");
    }

}; //animate.gameboard()