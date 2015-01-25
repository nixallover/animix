/**
 * Animations
 * pops up all the game dialogs
 */

var animate = {};

animate.popup = function( message ){
    var element = ui.popups.bg;

    function openPopup(){
        $( ui.popups.container ).show();
        $( message ).show();
        $( element )
            .addClass( "animated zoomInLeft" )
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
                    window.setTimeout( closePopup, seconds(1) );
            });
    }; // openPopup()

    function closePopup(){
        $( element )
            .addClass( "zoomOutRight" )
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
                    $( element ).attr("class", "");
                    $( message ).hide();
                    $( ui.popups.container ).hide();
        }); 
    }; // closePopup()

    openPopup();
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

}; // animate.gameboard()

