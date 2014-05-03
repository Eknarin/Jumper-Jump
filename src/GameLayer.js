var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

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

    createDuckBackground: function(){
        var winBackground = cc.Sprite.create('images/b-duck-winner.png');
        winBackground.setPosition( 400, 300);
        this.addChild(winBackground , 3);
    },

    createBlackDuckBackground: function(){
        var winBackground = cc.Sprite.create('images/b-duck-black-winner.png');
        winBackground.setPosition(400, 300);
        this.addChild(winBackground , 3);
    },

    playSound: function(){      
         if( this.black_jumper.status == BlackJumper.STATUS.DEAD ){
            cc.AudioEngine.getInstance().playEffect( 'effects/champ_sound.mp3');
         }
         else if( this.jumper.status == Jumper.STATUS.DEAD ){
            cc.AudioEngine.getInstance().playEffect( 'effects/laugh_sound.mp3' );           
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

            case cc.KEY.j :
                    this.black_jumper.moveLeft();
                    break;
            case cc.KEY.k :
                    this.black_jumper.moveDown();
                    break;
            case cc.KEY.l :
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

    update: function(){
        for(var i = 0; i < 3; i++){
            this.jumper.isOnStand(this.stands[i]);
            this.black_jumper.isOnStand(this.stands[i]);           
            this.jumper.scheduleUpdate();
            this.black_jumper.scheduleUpdate();
        }
        this.checkDead();
        if(this.jumper.getSpeed() >= 7){
                this.speedSong();
        }
    },

    checkDead: function(){
        if( this.jumper.status == Jumper.STATUS.DEAD ){
            this.freezeScreen();
            if( this.isCreateEnd == false ){
                this.createBlackDuckBackground();
                this.playSound();
                this.isCreateEnd = true;
            }
        }
        else if( this.black_jumper.status == BlackJumper.STATUS.DEAD ){
            this.freezeScreen();
            if( this.isCreateEnd == false ){
                this.createDuckBackground();
                this.playSound();
                this.isCreateEnd = true;
            }
        }
    },

    freezeScreen: function(){
        this.freezeStand();
        this.jumper.cleanup();
        this.black_jumper.cleanup();
        cc.AudioEngine.getInstance().stopMusic();
        this.setKeyboardEnabled( false );
    },

    freezeStand: function(){
        for(var i = 0; i < 3; i++){
            this.stands[i].cleanup();
        }
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
