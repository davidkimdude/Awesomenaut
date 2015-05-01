//draws enemy base
game.EnemyBaseEntity = me.Entity.extend({
    //gets base image from the folder
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
        //it is not broken
        this.broken = false;
        //health is equal to the var
        this.health = game.data.enemyBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "EnemyBaseEntity";
        //animations when destroyed
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    //set it to destroyed when health is lower than 0
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            game.data.win = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    },
    //lose health  when attacked
    loseHealth: function() {
        this.health--;
    }
});