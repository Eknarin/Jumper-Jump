var Jumper = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/b-duck.png' );
        // this.vy = 15;
        // this.started = false;
        // this.movingAction = this.createAnimationAction();
    },
});