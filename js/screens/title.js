//sets the title screen
game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10);
        //plays the music
        me.audio.play("jcole");
        //sets the text
        game.data.option1 = (new (me.Renderable.extend({
            //for the new users
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Shadows Into Light", 46, "white");
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "START A NEW JOURNEY", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.input.releasePointerEvent('pointerdown', game.data.option2);
                me.state.change(me.state.NEW);
            }
        })));

        me.game.world.addChild(game.data.option1);

        game.data.option2 = (new (me.Renderable.extend({
            //for the existing users
            init: function() {
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Shadows Into Light", 46, "white");
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            newGame: function() {
                me.input.releasePointerEvent("pointerdown", this);
                me.input.releasePointerEvent("pointerdown", game.data.option1);
                me.state.change(me.state.LOAD);
            }
        })));
        me.game.world.addChild(game.data.option2);
   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
