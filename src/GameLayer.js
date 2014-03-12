var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.jumper = new Jumper();  
        this.jumper.setPosition( new cc.Point( 130, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.jumper , 1);
        this.jumper.scheduleUpdate();

        this.stand_array = [ new Stand(), new Stand(), new Stand()];
        this.create_map();

        this.scheduleUpdate();
        return true;
    },

    create_map: function(){
        for(var i=0; i<3; i++){
            this.stand_array[i].randomPositionX();
            this.addChild( this.stand_array[i], 0);
            this.stand_array[i].setPositionY(i * Math.floor( (screenHeight / 3) ));
            this.stand_array[i].scheduleUpdate();
        }
    },

    update: function(){
        this.jumper.is_on_stand(this.stand_array[0]);
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
