//start(cover) page
var MenuLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();
		this.createAll();  
	},

	createAll: function(){
		this.createBackground();
		this.playSound();
		this.setTouch();
	},

	setTouch: function(){
		this.setTouchEnabled(true);
        this.setTouchMode(1);
	},

	createBackground: function(){
		var background = cc.Sprite.create("images/startscene.png");
        background.setPosition( cc.p( 400, 300 ) );
        this.addChild( background );
	},

	playSound: function(){
		cc.AudioEngine.getInstance().playMusic( 'effects/start_background_sound.mp3', true );
	},

	onTouchBegan:function( touch, event ) {
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create(1.5, new SelectScene()));
    }
});

var MenuScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild( layer );
	}
});