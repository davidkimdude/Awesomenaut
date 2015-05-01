//draws the enemy creep
game.EnemyCreep = me.Entity.extend({
    //gets image from the folder
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "creep1",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        //health for the creep
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //lets us know if enemy is attacking
        this.attacking = false;
        //keeps track of when our creep attacked
        this.lastAttacking = new Date().getTime();
        //keeps track of if our creep is hitting anything
        this.lastHit = new Date().getTime();
        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";
        //gathered animation in here
        this.addAnimation();
        this.renderable.setCurrentAnimation("walk");
    },
    //lose health when attacked
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    update: function(delta) {
        //remove it when its health is lower than 0
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }

        this.now = new Date().getTime();
        //move it to the left
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //checks the collision
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        //tells what to do when collides with playerbase
        if (response.b.type === 'PlayerBase') {
            this.renderable.setCurrentAnimation("attack");
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            //checks that it has been at least 1 second after creep hit hte base
            if ((this.now - this.lastHit >= 1000)) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //calls the loseHealth function and give damage to the tower
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
            //tells what to do when collides with player
        } else if (response.b.type === 'PlayerEntity') {
            this.renderable.setCurrentAnimation("attack");
            var xdif = this.pos.x - response.b.pos.x;

            this.attacking = true;
            this.lastAttacking = this.now;

            if (xdif > 0) {
                //keeps moving the creep to the right to maintain its position
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            //checks that it has been at least 1 second after creep hit something
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //calls the loseHealth function and give damage to the tower
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
            //tells what to do when collides with player's creep
        }
        if (response.b.type === 'AllieCreep') {
            this.renderable.setCurrentAnimation("attack");
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            //checks that it has been at least 1 second after creep hit hte base
            if ((this.now - this.lastHit >= 1000)) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //calls the loseHealth function and give damage to the tower
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    },
    //gathered animations
    addAnimation: function() {
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124], 80);
    }
});

