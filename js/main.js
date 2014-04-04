require.config({
  baseUrl:"jam/",
});

var p;

require(["jam", "../lib/sylvester", "../js/proto", "../js/player", "../js/level", "../js/util"], function(jam, syl, proto, player, level, util){
  jam.config({dataDir:"data/"});

  var main = function() {
	var g = new jam.Game(640, 480, document.body);
    g.started = false;
    g.score = new proto.text(200, 40, "hi");
    g.score.font = "monospace";
    g.score.color = "rgb(255, 255, 255)";
    g.score.visible = false;

    g.tdt = 0.0;
	var s = g.root.scene;

    s.add(g.score);

    g.bgColor = "rgb(55, 55, 55)";

    p = new player(20, 200);
    p.velocity.y = -20;
    var l = new level(g, p);

    s.add(p);

    p.on("update", function(dt) {
      if (jam.Rect.collide(p, l.ciel) ||
         jam.Rect.collide(p, l.grass)){
      }

      if (g.started){
        g.tdt += dt;
        if (l.curr.x <= (p.x + 320)){
          l.gen_pipe();
        }
      } else {
		if(jam.Input.justPressed("UP") || jam.Input.justPressed("SPACE")) {
          g.started = true;
          g.score.visible = true;
	      p.acceleration.y = 250;

          l.curr = {
            x: Math.floor(p.x + 280),
            g: 5
          };

        } else {
          // Fly bird in a sine wave.
          // Around 240.
          if (p.y >= (240 + 10)) {
            p.velocity.y = -20;
          } else if (p.y <= (240 - 10)) {
            p.velocity.y = 20;
          }
        }
      }
      g.score.x = p.x + 300;
      g.score.text = Math.floor(g.tdt/3);
    });

    g.camera.follow = p.camera;

	g.run();
  };

  var preload = function() {
	jam.showPreloader(main);
  };

  preload();

  /** /
  window.setTimeout(function(){
    window.console.log = function(){
    };
  }, 3000);
  /**/
});
