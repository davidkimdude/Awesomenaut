//draws the player base
game.PlayerBaseEntity = me.Entity.extend({
    //gets the image of the base
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = game.data.playerBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "PlayerBase";
        //animmations for the base
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    //destroys it when health is below 0
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            game.data.win = false;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //makes it lose health
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    onCollision: function() {

    }
});
