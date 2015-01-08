var Stars = function(game) {
  this.group = game.add.group();
  this.group.enableBody = true;
  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 12; i++)
  {
      //  Create a star inside of the 'stars' group
      var star = this.group.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 6;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }
};

module.exports = Stars;

Stars.prototype = {
};
