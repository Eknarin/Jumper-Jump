var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        // this.vy = 15;
        // this.started = false;
        // this.movingAction = this.createAnimationAction();
    },

    jump: function() {

    },

    is_on_stand: function( stand ) {
    	if(stand.getPositionY() == this.getPositionY() && stand.getPositionX() == this.getPositionX()){
    		this.status = Jumper.STATUS.STAND_ON_CLOUD;
    	}
    	else{
    		this.status = Jumper.STATUS.STILL;
    	}
    },

    update: function() {
    	if(this.status == Jumper.STATUS.STAND_ON_CLOUD){
    		this.setPositionY( this.getPositionY()+2);
    	}
    },

});

Jumper.STATUS = {
	STAND_ON_CLOUD : 1,
	STILL : 0
};