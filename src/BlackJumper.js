//another player called Black Jumper
var BlackJumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck-black.png' );
        this.status = BlackJumper.STATUS.FALL_DOWN;
        this.g = -10;
        this.score = 0;
        this.is_add_score = false;
        this.speed = 3;
        this.started = false;

        this.movingAction = this.blink();
        this.runAction( this.movingAction );
    },

    blink: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'images/b-duck-black.png' );
        animation.addSpriteFrameWithFile( 'images/b-duck-black-blink.png' );
        animation.setDelayPerUnit( 0.2 );
        return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

    moveDown: function(){  
        this.setPositionX(390);
        this.setPositionY(this.getPositionY() - 20);
        this.status = BlackJumper.STATUS.FALL_DOWN;
        this.playJumpSound();
    },

    moveLeft: function(){
        this.setPositionX(130);
        this.setPositionY(this.getPositionY() - 20);
        this.status = BlackJumper.STATUS.FALL_DOWN;
        this.playJumpSound();
    },

    moveRight: function(){  
        this.setPositionX(650);
        this.setPositionY(this.getPositionY() - 20);
        this.status = BlackJumper.STATUS.FALL_DOWN;
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
            this.status = BlackJumper.STATUS.STAND_ON_CLOUD;
            this.walk();
    	}
    },

    walk: function(){
        this.setPositionX( this.getPositionX()+0.5 );
    },

    update: function() {
    	this.updateMovementY();
        this.speedUp();
    },

    updateMovementY: function(){
    	if(this.isDead()){
            this.status = BlackJumper.STATUS.DEAD;
            this.is_add_score = true; 
            console.log("dead");
                //Game End
        }

    	if(this.status == BlackJumper.STATUS.STAND_ON_CLOUD){
            this.is_add_score = true;
            this.setPositionY(this.getPositionY() + this.speed);
            
    	}
        else if(this.status == BlackJumper.STATUS.FALL_DOWN){    
            this.is_add_score = false;  
            this.setPositionY( this.getPositionY() + this.g ) ;
        }

    },

    isDead: function(){
        if(this.getPositionY() >= screenHeight + 45 || this.getPositionY() <= -45)
            return  true;
        return false;
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
                this.speed += 0.000002;
            });
        }
    },

    getScore: function(){
        return this.score;
    },

    getSpeed: function(){
        return this.speed;
    }

});


BlackJumper.STATUS = {
	FALL_DOWN : 0,
    STAND_ON_CLOUD : 1,
    DEAD : 2
	
};