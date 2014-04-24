var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        this.status = Jumper.STATUS.FALL_DOWN;
        this.g = -10;
        this.score = 0;
        this.is_add_score = false;
        this.speed = 2;
        this.started = false;

        this.movingAction = this.blink();
        this.runAction( this.movingAction );
    },

    blink: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'images/b-duck.png' );
        animation.addSpriteFrameWithFile( 'images/b-duck-blink.png' );
        animation.setDelayPerUnit( 0.2 );
        return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

    // start: function() {
    //     this.started = true;
    //     this.runAction( this.movingAction );
    // },
   
    // stop: function() {
    //     this.started = false;
    //     this.stopAction( this.movingAction );
    // },

    moveDown: function(){  
        this.setPositionX(390);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;
        this.playJumpSound();
    },

    moveLeft: function(){
        this.setPositionX(130);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;
        this.playJumpSound();
    },

    moveRight: function(){  
        this.setPositionX(650);
        this.setPositionY(this.getPositionY() - 20);
        this.status = Jumper.STATUS.FALL_DOWN;
        this.playJumpSound();
    },

    playJumpSound: function(){
        cc.AudioEngine.getInstance().playEffect( 'effects/jump_sound.mp3');
    },

    isOnStand: function( stand ) {  
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
    	this.updateMovementY();
        this.speedUp();
    },

    updateMovementY: function(){
    	

    	if(this.status == Jumper.STATUS.STAND_ON_CLOUD){
            this.is_add_score = true;
            this.setPositionY(this.getPositionY() + this.speed);
            
            if(this.isDead()){
                this.status = Jumper.STATUS.DEAD;
                this.is_add_score = true; 
                console.log("dead");
                //Game End
            }
    	}
        else if(this.status == Jumper.STATUS.FALL_DOWN){    
            this.is_add_score = false;  
            this.setPositionY( this.getPositionY() + this.g ) ;
        }

    },

    isDead: function(){
        return this.getPositionY() >= screenHeight ;
    },

    speedUp: function(){
        if( this.speed >= 8){
            if( this.speed >= 10){
                this.speed = 10;
            }else{
                this.schedule( function(){
                    this.speed += 0.0000001;
                });
            }
        }else{
            this.schedule( function(){
                this.speed += 0.000001;
            });
        }
    },

    getScore: function(){
        return this.score;
    }

});


Jumper.STATUS = {
	FALL_DOWN : 0,
    STAND_ON_CLOUD : 1,
    DEAD : 2
	
};