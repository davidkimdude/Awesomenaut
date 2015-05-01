//throws spear
game.SpearThrow = me.Entity.extend({
    //geets the image of the spear
    init: function(x, y, settings, facing) {
        this._super(me.Entity, "init", [x, y, {
                image: "spear",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function() {
                    return(new me.Rect(0, 0, 48, 48)).toPolygon();
                }
            }]);

        this.alwaysUpdate = true;
        this.body.setVelocity(8, 0);
        //sets the damage of the spear
        this.attack = game.data.ability3 * 3;
        this.type = "spear";
        this.facing = facing;
    },
    //sets where the spear is going
    update: function(delta) {
        if (this.facing === 'left') {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(true);
        } else {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        //checks the collision
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep') {
            //calls the loseHealth function and give damage to the tower
            response.b.loseHealth(this.attack);
            me.game.world.removeChild(this);
        }
    }
});