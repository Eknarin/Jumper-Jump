var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.game_speed = 1;
        this.startX = this.randomStartPositionX();

        this.createJumper();

        this.stands = [ new Stand(), new Stand(), new Stand() ];
        this.createMap();

        this.createBackground();        
        this.createScoreLabel();
        this.playSound();

        this.setKeyboardEnabled( true );
        this.scheduleUpdate();

        return true;
    },

    createJumper: function(){
        this.jumper = new Jumper();  
        this.jumper.setPosition( new cc.Point( this.startX, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.jumper , 2 ); 
        this.jumper.scheduleUpdate();
    },

    createBackground: function(){
        var background = cc.Sprite.create('images/background.png');
        background.setPosition(400, 300);
        this.addChild(background , 0);
    },

    createScoreLabel: function(){
        this.scoreLabel = cc.LabelTTF.create( this.jumper.get_score, 'Arial', 32 );
        this.scoreLabel.setPosition( cc.p( 15 * 40, 14 * 40 + 15 ) );
        this.addChild( this.scoreLabel );
    },

    playSound: function(){
         cc.AudioEngine.getInstance().playMusic( 'effects/background_sound.mp3', true );
         if(this.game_speed >= 2){
            concole.log("yeah");
             cc.AudioEngine.getInstance().playMusic( 'effects/background_speedUp_sound.mp3', true );
         }
    },

    randomStartPositionX: function(){
        var way_to_go = [130, 390, 650];
        var index = Math.floor(Math.random() * 3);
        return way_to_go[index];

    },

    createMap: function(){
        for(var i = 0; i < 3; i++){

            if(i == 0){
                var color = this.stands[i].randomColor();
                this.stands[i].runAction ( cc.TintTo.create( 0, color[0] , color[1] , color[2] ) );
                this.stands[i].setPositionX( this.startX );
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
