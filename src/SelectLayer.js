var SelectLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();

		this.background = cc.Sprite.create("images/selectMode.png");
        this.background.setPosition( 400, 300 );
        this.addChild( this.background );
        
        this.single = cc.Sprite.create("images/single.png");
     	this.single.setPosition( 245, 277 );
     	this.single.setOpacity(100);
        this.addChild( this.single );
        
        this.vs = cc.Sprite.create("images/vs.png");
        this.vs.setPosition( 550, 283);
        this.vs.setOpacity(100);
        this.addChild( this.vs );

        this.setMouseEnabled( true );

	},
	onMouseMoved: function(event){
		var location = event.getLocation();
		var go_single= this.single.getBoundingBoxToWorld();
		var go_vs = this.vs.getBoundingBoxToWorld();

		if(cc.rectContainsPoint(go_single,location)){
			this.single.setOpacity(1000);
		}else{
			this.single.setOpacity(80);
		}

		if(cc.rectContainsPoint(go_vs,location)){
			this.vs.setOpacity(1000);
		}else{
			this.vs.setOpacity(80);
		}

	},

	onMouseDown: function( event ){
		var location = event.getLocation();
		var go_single= this.single.getBoundingBoxToWorld();
		var go_vs = this.vs.getBoundingBoxToWorld();

		if(cc.rectContainsPoint(go_single,location)){
			var director = cc.Director.getInstance();
        	director.replaceScene(cc.TransitionFade.create(1.5, new SingleScene()));
		}

		if(cc.rectContainsPoint(go_vs,location)){
			var director = cc.Director.getInstance();
        	director.replaceScene(cc.TransitionFade.create(1.5, new MultiScene()));
		}
	}
});

var SelectScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		var layer = new SelectLayer();
		layer.init();
		this.addChild( layer );
	}
});