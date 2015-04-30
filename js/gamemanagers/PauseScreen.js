game.PauseScreen = me.ScreenObject.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastPaused = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
    },
    
    update: function() {
        this.now = new Date().getTime();
        if(me.input.isKeyPressed("pause") && this.now-this.lastPaused >=1000){
            this.lastPaused = this.now;
            if(!this.buying){
                this.startBuying();
            }else{
                this.stopBuying();
            }
        }
        
        return true;
    },
    
    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
    },
    
    stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
    }
});