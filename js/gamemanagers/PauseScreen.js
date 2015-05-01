//pauses the game
game.PauseScreen = me.ScreenObject.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastPaused = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
    },
    //set a delay
    update: function() {
        this.now = new Date().getTime();
        if (me.input.isKeyPressed("pause") && this.now - this.lastPaused >= 1000) {
            this.lastPaused = this.now;
            if (!this.buying) {
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }

        return true;
    },
    startBuying: function() {
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
        this.Direction();
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
    },
    stopBuying: function() {
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
    },
    //draws the letters
    Direction: function() {
        game.data.option1 = (new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Shadows Into Light", 46, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "GAME PAUSED", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            }
        })));

        me.game.world.addChild(game.data.option1);

        game.data.option2 = (new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Shadows Into Light", 46, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "TO CONTINUE, PRESS P AGAIN", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            }
        })));
        me.game.world.addChild(game.data.option2);
    }
});