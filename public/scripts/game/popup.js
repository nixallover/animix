/**
 * POP UPS
 * pops up all the game dialogs
 */

var popup = {};

popup.standard = function( message ){
    // WIP
    //modal animation (temp placement)
    $( ui.popups.container ).show();
    $( message ).show();
    $( ui.popups.bg ).addClass( 'animated zoomInUp' );
    window.setTimeout( closeModal, seconds(2) );

    function closeModal(){

        //not working?
        $( ui.popups.bg )
            .addClass("zoomInUp")
            .addClass( 'zoomOutDown' );
        $( ui.popups.container ).hide();
        $( message ).hide();

        //reset classes
        $( ui.popups.bg ).attr('class', '');
    };
};