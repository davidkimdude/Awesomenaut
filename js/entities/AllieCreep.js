game.AllieCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
            image:"creep2",
            width:64,
            height:64,
            spritewidth:"64",
            spriteheight:"64",
            getShape: function() {
                return(new me.Rect(0, 0, 64, 64)).toPolygon();
            }
        }]);
        
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //lets us know if enemy is attacking
        this.attacking = false;
        //keeps track of when our creep attacked
        this.lastAttacking = new Date().getTime();
        //keeps track of if our creep is hitting anything
        this.lastHit  = new Date().getTime();
        this.body.setVelocity(3, 20);
        
        this.type = "AllieCreep";
        
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    
    update: function(delta) {
        if(this.health <= 0) {
            me.game.world.removeChild(this);
        }
            
        this.now = new Date().getTime();
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response) {
        if(response.b.type === 'EnemyBase') {
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            //checks that it has been at least 1 second after creep hit hte base
            if((this.now-this.lastHit >= 1000)) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //calls the loseHealth function and give damage to the tower
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }else if(response.b.type === 'EnemyCreep') {
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking = true;
            this.lastAttacking = this.now;
            
            if(xdif>0) {
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            this.body.vel.x = 0;
            }
            //checks that it has been at least 1 second after creep hit something
            if((this.now-this.lastHit >= 1000) && xdif>0) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //calls the loseHealth function and give damage to the tower
                response.b.loseHealth(game.data.enemyCreepAttack);
        }
    }
}
});
