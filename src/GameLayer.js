var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.game_speed = 1;

        this.jumper = new Jumper();  
        this.jumper.setPosition( new cc.Point( 390, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.jumper , 2 ); 
        this.jumper.scheduleUpdate();

        this.stand_array = [ new Stand(), new Stand(), new Stand() ];
        this.create_map();

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

    create_map: function(){
        for(var i = 0; i < 3; i++){

            if(i == 0){
    
                var color = this.stand_array[i].randomColor();
                this.stand_array[i].runAction ( cc.TintTo.create( 0, color[0] , color[1] , color[2] ) );
                this.stand_array[i].setPositionX( 390 );
            }else{
                this.stand_array[i].randomPositionX();
            }

            this.addChild( this.stand_array[i], 1);
            this.stand_array[i].setPositionY( -1 *i * Math.floor( (screenHeight / 3) ));
            this.stand_array[i].scheduleUpdate();
            // this.schedule( this.stand_array[i].soar( this.game_speed ) ,1 );
        }
    },

    onKeyDown: function( e ) {

        switch ( e ){
            case cc.KEY.a :
                    this.jumper.move_left();
                    break;
            case cc.KEY.s :
                    this.jumper.move_down();
                    break;
            case cc.KEY.d :
                    this.jumper.move_right();
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
        this.scoreLabel.setString( this.jumper.get_score() );
    },

    update: function(){
        for(var i = 0; i < 3; i++){
            this.jumper.is_on_stand(this.stand_array[i]);
            this.jumper.scheduleUpdate();
        }

        this.updateScoreLabel();
       // console.log(this.jumper.get_score());
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
