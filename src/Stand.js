var Stand = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/blue_cloud.png' );


        this.way_to_go = [130, 390, 650];
    },

    update: function(){
    	this.setPositionY( this.getPositionY() + 1);
    	if(this.getPositionY() >= screenHeight){
        	this.randomPositionX();
        }
    },

    randomPositionX: function(){
    	var index = Math.floor(Math.random()*3);
    	this.setPosition( cc.p( this.way_to_go[index] , -30) );
    },

});
