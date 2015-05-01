//draws minimap
game.MiniMap = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width: 682,
                height: 101,
                spritewidth: "682",
                spriteheight: "101",
                getShape: function() {
                    return(new me.Rect(0, 0, 682, 101)).toPolygon();
                }

            }]);
        //makes it floats on the map
        this.floating = true;
    }
});