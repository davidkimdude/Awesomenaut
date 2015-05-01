//set exp
game.ExperienceManager = Object.extend({
    init: function() {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    //when you win, gameover is true
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
        }

        return true;
    },
    //if you won the game, you get 10 exp
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        console.log(game.data.exp);
        this.gameover = true;
        me.save.exp = game.data.exp;
    }
});