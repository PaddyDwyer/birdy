var Player = require('../entities/player');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    // var x = (this.game.width / 2) - 100;
    // var y = (this.game.height / 2) - 50;

    // this.testentity = new Player(this.game, x, y);
    // this.testentity.anchor.setTo(0.5, 0.5);

    // this.input.onDown.add(this.onInputDown, this);

    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //  A simple background for our game
    this.game.add.sprite(0, 0, 'sky');
 
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();
 
    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;
 
    // Here we create the ground.
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
 
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
 
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
 
    //  Now let's create two ledges
    var ledge = this.platforms.create(400, 400, 'ground');
 
    ledge.body.immovable = true;
 
    ledge = this.platforms.create(-150, 250, 'ground');
 
    ledge.body.immovable = true;

    // The player and its settings
    this.player = new Player(this.game, 32, this.game.world.height - 150);

    this.stars = this.game.add.group();
 
    this.stars.enableBody = true;
 
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');
 
        //  Let gravity do its thing
        star.body.gravity.y = 6;
 
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
  },

  update: function () {
    //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(this.player, this.platforms);

    this.game.physics.arcade.collide(this.stars, this.platforms);

    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    // var x, y, cx, cy, dx, dy, angle, scale;

    // x = this.input.position.x;
    // y = this.input.position.y;
    // cx = this.world.centerX;
    // cy = this.world.centerY;

    // angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    // this.testentity.angle = angle;

    // dx = x - cx;
    // dy = y - cy;
    // scale = Math.sqrt(dx * dx + dy * dy) / 100;

    // this.testentity.scale.x = scale * 0.6;
    // this.testentity.scale.y = scale * 0.6;

  },

  collectStar: function (player, star) {
    star.kill();
    // this.game.state.start('Menu');
  }
};
