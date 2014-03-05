var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.jumper = new Jumper();  
        this.jumper.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.jumper , 1);
     
        return true;
    }

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
