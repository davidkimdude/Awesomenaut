//makes the allie creep
game.AllieManager = Object.extend({
    //gets the image
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        console.log("acreep");
    },
    //updates the creep
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    //gets gold
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1 + 1);
        }
    },
    //sets when the creep is coming out
    creepTimerCheck: function() {
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("AllieCreep", 10, 200, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});