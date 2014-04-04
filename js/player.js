define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var player = function(x, y){
	jam.Sprite.call(this, x, y);
    var p_img = new proto.sq(10, 255, 0, 0);

    this.setImage(p_img.toDataURL(), 10, 10);

    this.velocity.x = 100;
    this.speed = 100;

    this.camera = new jam.Sprite(0, 240);

    this.on("update", function(dt) {
      this.camera.x = this.x;
      /**/
	  if(jam.Input.justPressed("UP") || jam.Input.justPressed("SPACE")) {
		this.velocity.y = -100;
	  }
      /**/
    });
  };

  player.prototype = new jam.Sprite(0, 0);

  return player;
});
