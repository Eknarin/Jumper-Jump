var GameLayerSinglePlayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.setTouchEnabled(true);
        this.setTouchMode(1);
        this.isChangeSong = false;
        this.isCreateEnd = false;
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

    createScoreLabel: function(){
         this.scoreLabel = cc.LabelTTF.create( this.jumper.getScore(), 'Arial', 50 );
         this.scoreLabel.setPosition( cc.p( screenWidth - 70, screenHeight - 50 ) );
         this.addChild( this.scoreLabel, 3 );
    },

    createJumper: function(){
        this.jumper = new Jumper( "single" );  
        this.jumper.setPosition( new cc.Point( this.startX, 2 * Math.floor(( screenHeight / 3 )) ));
        this.addChild( this.jumper , 2 ); 
        this.jumper.scheduleUpdate();
    },

    createBackground: function(){
        var background = cc.Sprite.create('images/background.png');
        background.setPosition(400, 300);
        this.addChild(background , 0);
    },

    createGameOver: function(){
        var winBackground = cc.Sprite.create('images/gameOver.png');
        winBackground.setPosition( 400, 300);
        this.addChild(winBackground , 3);

        this.scoreLabelEnd = cc.LabelTTF.create( this.jumper.getScore(), 'Arial', 34 );
        this.scoreLabelEnd.setString(this.jumper.getScore());
        this.scoreLabelEnd.setPosition( cc.p( 400, 330 ) );
        this.addChild( this.scoreLabelEnd, 3);


    },

    playSound: function(){      
         
        if( this.jumper.status == Jumper.STATUS.DEAD ){
            cc.AudioEngine.getInstance().playMusic( 'effects/never_walk_alone.mp3' );           
        }else{
            cc.AudioEngine.getInstance().playMusic( 'effects/background_sound.mp3', true );
        }
    },

    speedSong: function(){
        if(this.isChangeSong == false){
            cc.AudioEngine.getInstance().stopMusic();
            cc.AudioEngine.getInstance().playMusic( 'effects/background_speedUp_sound.mp3', true );
            this.isChangeSong = true;
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
        }
    },

    update: function(){
        for(var i = 0; i < 3; i++){
            this.jumper.isOnStand(this.stands[i]);
            this.jumper.scheduleUpdate();
        }
        this.checkDead();
        if(this.jumper.getSpeed() >= 7){
                this.speedSong();
        }

        this.updateScoreLabel();
    },

    updateScoreLabel: function(){
        this.scoreLabel.setString(this.jumper.getScore());
    },

    checkDead: function(){
        if( this.jumper.status == Jumper.STATUS.DEAD ){
            this.freezeScreen();
            if( this.isCreateEnd == false ){
                this.createGameOver();
                this.playSound();
                this.isCreateEnd = true;
            }
        }
    },

    freezeScreen: function(){
        this.freezeStand();
        this.jumper.cleanup();
        this.setKeyboardEnabled( false );
    },

    freezeStand: function(){
        for(var i = 0; i < 3; i++){
            this.stands[i].cleanup();
        }
    },

    onTouchBegan:function( touch, event ) {
        if(this.jumper.status == Jumper.STATUS.DEAD){
            var director = cc.Director.getInstance();
            cc.AudioEngine.getInstance().playMusic( 'effects/start_background_sound.mp3', true );
            director.replaceScene(cc.TransitionFade.create(1.5, new SelectScene()));
        }
    }
});

var SingleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayerSinglePlayer();
        layer.init();
        this.addChild( layer );
    }
});
