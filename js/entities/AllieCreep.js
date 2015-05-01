//Makes a creep for you
game.AllieCreep = me.Entity.extend({
    //draws the image of allie creep
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "creep2",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        //check if the creep hits something
        console.log("hit");
        //the health is equal to this certain variable
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //lets us know if enemy is attacking
        this.attacking = false;
        //keeps track of when our creep attacked
        this.lastAttacking = new Date().getTime();
        //keeps track of if our creep is hitting anything
        this.lastHit = new Date().getTime();
        this.body.setVelocity(3, 20);
        //name for the creep
        this.type = "AllieCreep";
        //adds animation and sets current animation
        this.addAnimation();
        this.renderable.setCurrentAnimation("walk");
    },
    //lose health whhen attacked
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    update: function(delta) {
        //remove the creep when its health is lower than 0
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }
        this.walk();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //always update
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //check when creep collides with other
    collideHandler: function(response) {
        //attack enemybase when collided
        if (response.b.type === 'EnemyBase') {
            //set animation to attack when collide
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
            //check when collided with enemycreep
        } else if (response.b.type === 'EnemyCreep') {
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
        }
    },
    //refactored walking 
    walk: function() {
        this.facing = "right";
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.flipX(true);
    },
    //gathered animations
    addAnimation: function() {
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    }
});
