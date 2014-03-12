var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        this.status = Jumper.STATUS.STILL;
        // this.vy = 15;
        // this.started = false;
        // this.movingAction = this.createAnimationAction();
    },

    jump: function() {

    },

    is_on_stand: function( stand ) {
    	if(stand.getPositionY() == this.getPositionY()-60 && (Math.abs(stand.getPositionX() - this.getPositionX()) <= 50 ) ){
    		this.status = Jumper.STATUS.STAND_ON_CLOUD;
    	}
    },

    update: function() {

    	if ( this.getPositionY >= screenHeight ){
    		//Game End
    	}
    	
    	if(this.status == Jumper.STATUS.STAND_ON_CLOUD){
    		this.setPositionY( this.getPositionY()+2);
    	}
    },

});

Jumper.STATUS = {
	STAND_ON_CLOUD : 1,
	STILL : 0
};