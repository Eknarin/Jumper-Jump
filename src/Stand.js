//cloud class
var Stand = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/cloud.png' );
        this.way_to_go = [130, 390, 650];
        this.speed = 3;
    },

    update: function( ){
        this.speedUp();
        this.soarUp();
    },

    soarUp: function( ){
        this.setPositionY( this.getPositionY() + this.speed);
        if(this.getPositionY() >= screenHeight){
            this.randomPositionX();
        }
    },

    stopSoar: function(){
        this.setPositionY( this.getPositionY());
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

    randomPositionX: function(){
    	var index = Math.floor(Math.random() * 3);
        var colorArr = this.randomColor();
        if( this.tintAction ) this.stopAction( this.tintAction );
            this.tintAction = this.runAction ( cc.TintTo.create( 0, colorArr[0] , colorArr[1] , colorArr[2] ) );
    	this.setPosition( cc.p( this.way_to_go[index] , -30) );
    },

    randomColor: function(){
        return STAND_COLOR[ Math.floor(Math.random() * 3) ];
    }

});

var STAND_COLOR = [
    [ 255, 255, 0],
    [ 255, 64, 64],
    [ 0, 255, 0]
    // [ 200 , 255 ,100 ],
    // [ 0, 191, 255],
    // [ 255, 20, 147]
]
