// Timer class

function Timer( roundTime ){
    var self = this,
        counter  = {
            total     : 0,
            seconds   : 0,
            minutes   : 0
        };

    // properties
    self.endTime = seconds( roundTime );
    self.round;
        
    // state
    self.isStarted = false;
    self.isPaused = false;

    // timeout
    self.ticking = 0;
    self.setEndTime = 0;



    // methods
    self.start = function( round ){
        self.isStarted = true;
        self.round = round;
        console.log("round timer started");
        console.log(round);
        self.ticking = window.setInterval( self.update, seconds(1) );
        self.setEndTime = window.setTimeout( self.end, self.endTime );
    }; // Timer.start()

    self.update = function(){
        counter.total      += 1;
        counter.seconds     = counter.total % 60;
        counter.minutes     = Math.floor(counter.total / 60);    
        self.endTime        = self.endTime - seconds(1);
        
        //$( "#endTime" ).text( self.endTime );
        $( ".seconds" ).text( counter.seconds );
        $( ".minutes" ).text( counter.minutes );
    }; // Timer.update()

    self.pause = function( round ){
        if ( self.isStarted ){
            // pause
            if ( !self.isPaused ){
                console.log("round timer paused");
                
                window.clearInterval( self.ticking );
                window.clearTimeout( self.setEndTime );
                
                $( ui.buttons.roundPause ).text( "Unpause" );
                self.isPaused = true;
                
            // unpause
            } else {
                console.log("round timer unpaused");
                self.ticking = window.setInterval(self.update, seconds(1));
                self.setEndTime = window.setTimeout( self.end, self.endTime );
                $( ui.buttons.roundPause ).text( "pause" );
                self.isPaused = false;
            }; // if(paused)
            
        } else {
            // there's nothing to pause or unpause
        }; // if(started)
    }; // Timer.pause()


    self.end = function(){
        if ( self.isStarted ){
            console.log("round timer ended");
            self.isStarted = false;
            window.clearInterval( self.ticking );
            window.clearTimeout( self.setEndTime );
            self.round.end();
            
        } else {
            // there's nothing to end
        }; // if(started)
    }; // Timer.end()

}; // Timer()