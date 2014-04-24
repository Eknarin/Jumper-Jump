var Stand = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/cloud.png' );
        this.way_to_go = [130, 390, 650];
        this.speed = 2;
    },

    update: function( ){
        this.speedUp();
    	this.setPositionY( this.getPositionY() + this.speed);
    	if(this.getPositionY() >= screenHeight){
        	this.randomPositionX();
        }
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

    randomPositionX: function(){
    	var index = Math.floor(Math.random() * 3);
        var colorArr = this.randomColor();
        this.runAction ( cc.TintTo.create( 0, colorArr[0] , colorArr[1] , colorArr[2] ) );
    	this.setPosition( cc.p( this.way_to_go[index] , -30) );
    },

    randomColor: function(){
        return STAND_COLOR[ Math.floor(Math.random() * 3) ];
    }

});

var STAND_COLOR = [
    [ 200 , 255 ,100 ],
    [ 0 , 191 , 255 ],
    [ 255, 20, 147]
]
