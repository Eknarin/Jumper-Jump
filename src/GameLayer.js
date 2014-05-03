var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.changeSong = false;
        this.startX = this.randomStartPositionX();
        this.createAll();
        this.scheduleUpdate();

        return true;
    },

    createAll: function(){
        this.createJumper();
        this.createMap();
        this.createBackground();        
        this.createScoreLabel();
        this.playSound();
        this.setKeyboardEnabled( true );
    },

    createJumper: function(){
        this.jumper = new Jumper();  
        this.jumper.setPosition( new cc.Point( this.startX, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.jumper , 2 ); 
        this.jumper.scheduleUpdate();

        this.black_jumper = new BlackJumper();
        this.black_jumper.setPosition( new cc.Point( this.startX, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.black_jumper , 2 ); 
        this.black_jumper.scheduleUpdate();
    },

    createBackground: function(){
        var background = cc.Sprite.create('images/background.png');
        background.setPosition(400, 300);
        this.addChild(background , 0);
    },

    createScoreLabel: function(){
        this.scoreLabel = cc.LabelTTF.create( this.jumper.get_score, 'Arial', 50 );
        // this.scoreLabel.setPosition( cc.p( 15 * 40, 14 * 40 + 15 ) );
        this.scoreLabel.setPosition( cc.p( screenWidth - 70, screenHeight - 50 ) );
        this.addChild( this.scoreLabel, 3 );

        this.black_scoreLabel = cc.LabelTTF.create( this.black_jumper.get_score, 'Arial', 50 );
        this.black_scoreLabel.setPosition( cc.p( 70, screenHeight - 50 ) );
        this.addChild( this.black_scoreLabel, 3 );
    },

    playSound: function(){
         cc.AudioEngine.getInstance().playMusic( 'effects/background_sound.mp3', true );
    },

    speedSong: function(){
        if(this.changeSong == false){
            cc.AudioEngine.getInstance().stopMusic();
            cc.AudioEngine.getInstance().playMusic( 'effects/background_speedUp_sound.mp3', true );
            this.changeSong = true;
        }  
    },

    randomStartPositionX: function(){
        var way_to_go = [130, 390, 650];
        var index = Math.floor(Math.random() * 3);
        return way_to_go[index];

    },

    createMap: function(){
        this.stands = [ new Stand(), new Stand(), new Stand() ];
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

            case cc.KEY.left :
                    this.black_jumper.moveLeft();
                    break;
            case cc.KEY.down :
                    this.black_jumper.moveDown();
                    break;
            case cc.KEY.right :
                    this.black_jumper.moveRight();
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
        this.black_scoreLabel.setString( this.black_jumper.getScore() );
    },

    update: function(){
        for(var i = 0; i < 3; i++){
            this.jumper.isOnStand(this.stands[i]);
            this.black_jumper.isOnStand(this.stands[i]);
            
            this.jumper.scheduleUpdate();
            this.black_jumper.scheduleUpdate();
        }

        if(this.jumper.status == Jumper.STATUS.DEAD || this.black_jumper.status == BlackJumper.STATUS.DEAD){
            this.freezeScreen();
        }else{
            if(this.jumper.getSpeed() >= 7){
                console.log("change!!");
                this.speedSong();
            }
        }
        

        this.updateScoreLabel();
    },

    freezeScreen: function(){
        for(var i = 0; i < 3; i++){
                this.stands[i].cleanup();
            }
        this.jumper.cleanup();
        this.black_jumper.cleanup();
        cc.AudioEngine.getInstance().stopMusic();
        this.setKeyboardEnabled( false );
    },
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
