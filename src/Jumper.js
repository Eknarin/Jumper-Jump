var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        this.status = Jumper.STATUS.FALL_DOWN;
        this.vy = 2;
        this.vx = 0;
        this.g = -10;
    },

    jump: function() {

        this.vy = Jumper.JUMPING_VELOCITY;
        this.status = Jumper.STATUS.STILL;

    },

    move_down: function(){  

        this.setPositionX(390);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;
    },

    move_left: function(){

        // this.vx = -3;
         // this.setPositionX(this.getPositionX() - 260);
         this.setPositionX(130);
         this.setPositionY(this.getPositionY() - 20);
         this.status = Jumper.STATUS.FALL_DOWN;

    },

    move_right: function(){

        // this.vx = 3;
        // this.setPositionX(this.getPositionX() + 260);
        this.setPositionX(650);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;


    },

    checkStand: function(stand){


    },

    is_on_stand: function( stand ) {
        if((( this.getPositionY() - stand.getPositionY() ) <= 60) && 
            (( this.getPositionY() - stand.getPositionY() ) >= 30) && 
            (Math.abs(stand.getPositionX() - this.getPositionX()) <= 30 )){	 
            
            this.status = Jumper.STATUS.STAND_ON_CLOUD;
    	}
        // else{
        //     this.status = Jumper.STATUS.FALL_DOWN;
        // }
    },
    update: function() {
    	this.update_MovementY();
        // this.update_MovementX();
    	this.updatePosition();

    	// console.log(this.status);

    },

    updatePosition: function(){
    	 this.setPosition( cc.p( Math.round( this.getPositionX() ),
                                Math.round( this.getPositionY() ) ) );
    },

    update_MovementX: function(){
        if(this.status == Jumper.STATUS.FALL_DOWN){

            this.setPositionX( this.getPositionX() + this.vx ) ;
        }

    },

    update_MovementY: function(){

    	if ( this.getPositionY >= screenHeight ){
    		this.status = Jumper.STATUS.DEAD;
            //Game End
    	}


    	if(this.status == Jumper.STATUS.STAND_ON_CLOUD){
    		
            this.setPositionY(this.getPositionY() + 7);

    		this.vy = 0;
            this.vx = 0;
    	}
        else if(this.status == Jumper.STATUS.FALL_DOWN){ 
            this.setPositionY( this.getPositionY() + this.g ) ;
        }
    	else{

    		this.vy += this.g;
            this.setPositionY( this.getPositionY() + this.vy ) ;

    	}

    },

});

Jumper.JUMPING_VELOCITY = 10;

Jumper.STATUS = {
	FALL_DOWN : 0,
    STAND_ON_CLOUD : 1,
    JUMPING : 2,
    DEAD : 3
	
};