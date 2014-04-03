var Stand = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/blue_cloud.png' );


        this.way_to_go = [130, 390, 650];

    },

    update: function(){
    	this.setPositionY( this.getPositionY() + 7);
    	if(this.getPositionY() >= screenHeight){
        	this.randomPositionX();
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
    [ 200 , 100 , 255 ],
    [ 0 , 0 , 0 ]
]
