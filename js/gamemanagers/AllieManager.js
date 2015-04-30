game.AllieManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        console.log("acreep");
    },
    
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        
        return true;
    },
    
    goldTimerCheck: function() {
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1+1);
        }
    },
    
    creepTimerCheck: function() {
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("AllieCreep", 10, 200, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});