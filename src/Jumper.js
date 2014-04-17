var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        this.status = Jumper.STATUS.FALL_DOWN;
        this.g = -10;
        this.score = 0;
        this.is_add_score = false;
    },

    move_down: function(){  
        this.setPositionX(390);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;
    },

    move_left: function(){
         this.setPositionX(130);
         this.setPositionY(this.getPositionY() - 20);
         this.status = Jumper.STATUS.FALL_DOWN;
    },

    move_right: function(){

        this.setPositionX(650);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;
    },

    is_on_stand: function( stand ) {  
        if((( this.getPositionY() - stand.getPositionY() ) <= 60) && 
            (( this.getPositionY() - stand.getPositionY() ) >= 30) && 
             (Math.abs(stand.getPositionX() - this.getPositionX()) <= 30 )){	 
           
           if( this.is_add_score == false ){
                this.score += 1;
            }      
            this.status = Jumper.STATUS.STAND_ON_CLOUD;
    	}
    },
    update: function() {
    	this.update_MovementY();
    },

    update_MovementY: function(){
    	if ( this.getPositionY >= screenHeight ){
    		this.status = Jumper.STATUS.DEAD;
            this.is_add_score = true; 
            //Game End
    	}

    	if(this.status == Jumper.STATUS.STAND_ON_CLOUD){
            this.is_add_score = true;
            this.setPositionY(this.getPositionY() + 30);
    	}
        else if(this.status == Jumper.STATUS.FALL_DOWN){    
            this.is_add_score = false;  
            this.setPositionY( this.getPositionY() + this.g ) ;
        }

    },

    get_score: function(){
        return this.score;
    }

});


Jumper.STATUS = {
	FALL_DOWN : 0,
    STAND_ON_CLOUD : 1,
    DEAD : 2
	
};