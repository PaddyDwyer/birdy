var Player = require('../entities/player');
var Stars = require('../entities/stars');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;
var score = 0;
var scoreText;

Game.prototype = {

  create: function () {
    this.game.world.setBounds(0, 0, 1171, 600);
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //  A simple background for our game
    this.game.add.sprite(0, 0, 'bg');
 
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();
 
    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;
 
    // Here we create the ground.
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
 
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(3, 2);
 
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
 
    // The player and its settings
    this.player = new Player(this.game, 32, this.game.world.height - 150);

    this.game.camera.follow(this.player);

  },

  update: function () {
    //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(this.player, this.platforms);
  }
};
