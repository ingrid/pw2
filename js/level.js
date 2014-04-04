define(["jam", "../js/proto"], function(jam, proto) {
  // Tile size;
  var s = 48;
  var ps = 100;
  var pipes = [];

  var pipe = function(x, y, l){
	var p = jam.Sprite.call(this, x, y);
    var sprite = new proto.rect(s, s * l, 255, 0, 0).toDataURL();
    this.setImage(sprite, s, s);
  }

  pipe.prototype = new jam.Sprite(0, 0);

  var level = function(g, p){
    this.obs = [];
    this.g = g;
    this.curr = {
      x: 0,
      g: 5
    };

    var scene = g.root.scene;

    this.grass = new jam.Sprite(p.x - 320 - 20, 460);
    var g_img = new proto.rect(680, 20, 0, 255, 0);
    this.grass.setImage(g_img.toDataURL(), 680, 40);
    this.grass.immovable = true;
    var grass = this.grass;

    scene.add(this.grass);

    this.ciel = new jam.Sprite(-20, 0);
    var s_img = new proto.rect(680, 20, 0, 0, 255);
    this.ciel.setImage(s_img.toDataURL(), 680, 40);
    this.ciel.immovable = true;
    var ciel = this.ciel;

    scene.add(this.ciel);

    this.g.on("update", function(dt) {
      var nx = p.x - 320 - 20;
      grass.x = nx;
      ciel.x = nx;
    });
  };

  level.prototype.gen_pipe = function(){
    var d = Math.floor(Math.random()*7) - 3;
    var n = {
      x: this.curr.x + g,
      g: this.curr.g + d
    };
    var top = new pipe(n.x, 0, n.g);
    var top = new pipe(n.x, s * (n.g + 3), 10 - (n.g + 3));
  };

  return level;
});
