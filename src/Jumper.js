var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        this.status = Jumper.STATUS.STILL;
        this.vy = 2;
        this.g = -0.5;
    },

    jump: function() {
    	this.vy = Jumper.JUMPING_VELOCITY;
    	this.vx = Jumper.JUMPING_VELOCITY;
    },
    is_on_stand: function( stand ) {
    	// if(stand.getPositionY() == this.getPositionY()-60 && (Math.abs(stand.getPositionX() - this.getPositionX()) <= 50 ) )
        if((Math.abs(stand.getPositionY() - this.getPositionY()) <= 60 ) && (Math.abs(stand.getPositionX() - this.getPositionX()) <= 50 )){	 
            this.status = Jumper.STATUS.STAND_ON_CLOUD;
    	}
    },
    update: function() {
    	this.update_MovementY();
    	this.updatePosition();

    	// console.log(this.status);

    },

    updatePosition: function(){
    	 this.setPosition( cc.p( Math.round( this.getPositionX() ),
                                Math.round( this.getPositionY() ) ) );
    },

    update_MovementY: function(){

    	if ( this.getPositionY >= screenHeight ){
    		//Game End
    	}


    	if(this.status == Jumper.STATUS.STAND_ON_CLOUD){
    		
            this.setPositionY( this.getPositionY()+2);
    		this.vy = 0;
    	}
    	else{
    		this.vy += this.g;
            this.setPositionY( this.getPositionY() + this.vy ) ;
    	}

    },

});

Jumper.G = -10;
Jumper.JUMPING_VELOCITY = 15;

Jumper.STATUS = {
	STILL : 0,
    STAND_ON_CLOUD : 1
	
};