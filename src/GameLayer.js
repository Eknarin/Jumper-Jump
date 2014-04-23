var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.game_speed = 1;

        this.jumper = new Jumper();  
        this.jumper.setPosition( new cc.Point( 390, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.jumper , 2 ); 
        this.jumper.scheduleUpdate();

        this.stands = [ new Stand(), new Stand(), new Stand() ];
        this.createMap();

        this.setKeyboardEnabled( true );
        this.scheduleUpdate();

        var background = cc.Sprite.create('images/background.png');
        background.setPosition(400, 300);
        this.addChild(background , 0);

        this.scoreLabel = cc.LabelTTF.create( this.jumper.get_score, 'Arial', 32 );
        this.scoreLabel.setPosition( cc.p( 15 * 40, 14 * 40 + 15 ) );
        this.addChild( this.scoreLabel );

        return true;
    },

    createMap: function(){
        for(var i = 0; i < 3; i++){

            if(i == 0){
    
                var color = this.stands[i].randomColor();
                this.stands[i].runAction ( cc.TintTo.create( 0, color[0] , color[1] , color[2] ) );
                this.stands[i].setPositionX( 390 );
            }else{
                this.stands[i].randomPositionX();
            }

            this.addChild( this.stands[i], 1);
            this.stands[i].setPositionY( -1 *i * Math.floor( (screenHeight / 3) ));
            this.stands[i].scheduleUpdate();
        }
    },

    onKeyDown: function( e ) {

        switch ( e ){
            case cc.KEY.a :
                    this.jumper.moveLeft();
                    break;
            case cc.KEY.s :
                    this.jumper.moveDown();
                    break;
            case cc.KEY.d :
                    this.jumper.moveRight();
                    break;        

        }

        // if ( this.state == GameLayer.STATES.FRONT ) {
        //     this.startGame();
        //     this.state = GameLayer.STATES.STARTED;
        // }
        // else if ( this.state == GameLayer.STATES.STARTED ) {
            // this.jumper.jump();
        // }
    },

    updateScoreLabel: function() {       
        this.scoreLabel.setString( this.jumper.getScore() );
        // this.scoreLabel.setString( '1000' );
    },

    update: function(){
        for(var i = 0; i < 3; i++){
            this.jumper.isOnStand(this.stands[i]);
            this.jumper.scheduleUpdate();
        }

        this.updateScoreLabel();
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
