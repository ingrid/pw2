require.config({
  baseUrl:"jam/",
});

var p;

require(["jam", "../lib/sylvester", "../js/proto", "../js/player", "../js/level", "../js/util"], function(jam, syl, proto, player, level, util){
  jam.config({dataDir:"data/"});

  var g = new jam.Game(640, 480, document.body);

  var main = function() {
    g.started = false;
    g.score = new proto.text(200, 40, "hi");
    g.score.font = "monospace";
    g.score.color = "rgb(255, 255, 255)";
    g.score.visible = false;

    var start_text = new proto.text(100, 100, "Press SPACE or UP");
    start_text.font = "monospace";
    start_text.color = "rgb(255, 255, 255)";

    g.tdt = 0.0;
	var s = g.root.scene;

    s.add(g.score);
    s.add(start_text);

    g.bgColor = "rgb(55, 55, 55)";

    p = new player(20, 200);
    p.velocity.y = -20;
    var l = new level(g, p);

    s.add(p);

    p.on("update", function(dt) {
      g.tdt += dt;
      if (jam.Rect.collide(p, l.ciel) ||
         jam.Rect.collide(p, l.grass)){
      }

      if (g.started){
        if (l.curr.x <= (p.x + 320)){
          l.gen_pipe();
        }
      } else {
		if(jam.Input.justPressed("UP") || jam.Input.justPressed("SPACE")) {
          g.started = true;
          g.score.visible = true;
	      p.acceleration.y = 250;
          g.tdt = 0.0;

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

          start_text.x = p.x - 20;
          start_text.alpha = g.tdt % 1;
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
