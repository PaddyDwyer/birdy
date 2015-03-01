var cursors;
var Player = function (game, x, y) {
    // Phaser.Sprite.call(this, game, x, y, 'testsprite');
    // game.add.existing(this);
    // The player and its settings
    //this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
    Phaser.Sprite.call(this, game, x, y, 'dude');
    game.add.existing(this);
 
    //  We need to enable physics on the player
    game.physics.arcade.enable(this);
 
    //  Player physics properties. Give the little guy a slight bounce.
    this.body.bounce.y = 0.1;
    this.body.gravity.y = 600;
    this.body.collideWorldBounds = true;
 
    //  Our two animations, walking left and right.
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function() {
  // Easy controls
  //
  // While the player is on the ground 
  //  left right walk left right, stopping stops automatically
  //  up jumps up, momentum carries the player
  if (this.body.touching.down) {
    this.body.velocity.x = 0;
    if (cursors.left.isDown) {
      // Move to the left
      this.body.velocity.x = -150;

      this.animations.play('left');
    } else if (cursors.right.isDown) {
      // Move to the right
      this.body.velocity.x = 150;

      this.animations.play('right');
    } else {
      // Stand Still
      this.animations.stop();

      this.frame = 4;
    }
  }
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && this.body.touching.down)
  {
      this.body.velocity.y = -150;
  }
  // Wehn the player is in the air
  //  use wasd, get the facing
  //  -> facing thrust forward
  //  <- facing thrust backward
  //  w thrust up
  //  d drop legs
    // //  Reset the players velocity (movement)    
    // if (this.body.touching.down) {
    //   this.body.drag.x = 300;
    //   //this.body.velocity.x = 0;
 
    //   if (cursors.left.isDown)
    //   {
    //       //  Move to the left
    //       this.body.velocity.x = -150;
   
    //       this.animations.play('left');
    //   }
    //   else if (cursors.right.isDown)
    //   {
    //       //  Move to the right
    //       this.body.velocity.x = 150;
   
    //       this.animations.play('right');
    //   }
    //   else
    //   {
    //       //  Stand still
    //       this.animations.stop();
   
    //       this.frame = 4;
    //   }
    // } else {
    //     this.body.drag.x = 0;
    // }
    // 
    // //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && this.body.touching.down)
    // {
    //     this.body.velocity.y = -150;
    // }
};

module.exports = Player;
