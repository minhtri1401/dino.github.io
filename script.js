let background;
let bgSpeed;
let floor;
let player;
let canJump;
let rock;
let rockSpeed;
let distance;
let distanceText;
let gameOver;
let blackBG;
let restartButton;
let scene;
let flag = false;


function init() {
  // speed of moving background image
  bgSpeed = 5;
  //initial speed of rock obstacle
  rockSpeed = -5;
  canJump = true;
  distance = 0;
  gameOver = false;
}

function preload() {
  scene = this;
  // preload background image
  scene.load.image("bg", "resources/forest_BG.png");
  scene.load.image("floor", "resources/forest_floor.png");
  scene.load.spritesheet("dino_run", "resources/Dino_RunAnim.png", {
    frameWidth: 442,
    frameHeight: 455,
  });
  scene.load.spritesheet("dino_fall", "resources/Dino_FallAnim.png", {
    frameWidth: 632,
    frameHeight: 402,
  });
  // preload rock image
  scene.load.image("rock", "resources/rock.png");
  scene.load.image("restartButton", "resources/restart_btn.png");
}

function create() {
  // display background image
  background = scene.add.tileSprite(
    config.width / 2,
    config.height / 2,
    1000,
    750,
    "bg"
  );
  background.setScale(0.76);
  floor = scene.add.tileSprite(0, 420, 1024, 128, "floor");
  floor.setOrigin(0, 0);
  scene.physics.add.existing(floor, true);
  floor.setSize(1500, 128);

  // create player animations
  scene.anims.create({
    key: "run",
    frames: scene.anims.generateFrameNumbers("dino_run", { start: 0, end: 7 }),
    frameRate: 13,
    repeat: -1,
  });

  scene.anims.create({
    key: "fall",
    frames: scene.anims.generateFrameNumbers("dino_fall", { start: 0, end: 7 }),
    frameRate: 13,
    repeat: 0,
  });

  // create player
  player = scene.physics.add.sprite(256, 380, "dino");
  player.setScale(0.28);
  player.anims.play("run");
  player.setSize(150, 340).setOffset(120, 30);
  player.depth = 1;

  // display rock sprite
  rock = scene.physics.add.sprite(650, 390, "rock");
  rock.setSize(40, 43).setOffset(25, 0);

  // distance text
  distanceText = scene.add.text(10, 10, "Distance: 0", { color: "#2d2d2d" });

  // check for collision
  scene.physics.add.collider(player, floor, onTheFloor);
  scene.physics.add.collider(rock, floor);
  scene.physics.add.collider(player, rock, onGameOver);

  // touch event
  scene.input.on("pointerdown", dinoJump);

  // black bg
  blackBG = scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });
  blackBG.fillRect(0, 0, config.width, config.height);
  blackBG.depth = 10;
  blackBG.visible = false;

  // restart button
  restartButton = scene.add.sprite(
    config.width / 2,
    config.height / 2,
    "restartButton"
  );
  restartButton.setInteractive({ useHandCursor: true });
  restartButton.setScale(0.5);
  restartButton.depth = 11;
  restartButton.on("pointerdown", restartGame);
  restartButton.visible = false;

}

function update() {
  if (!gameOver) {
    // animate background image
    background.tilePositionX += bgSpeed;
    floor.tilePositionX += bgSpeed;
    //update rock position every frame
    rock.x += rockSpeed;

    if (rock.x < -45) {
      rock.x = 800;
      rock.y = 390;
      rockSpeed -= 1;

      //check the rock speed
      if (rockSpeed < -13) {
        rockSpeed = -13;
      }
    }
    // update distance
    distance += 0.01;
    distanceText.text = "Distance: " + distance.toFixed(2) + " meters";

    // If distance > 10 call quadric equations event
    // Flag make sure call function once
    if (distance > 10.0 && !flag) bindEvent();
  }

}

// check if player is on the floor then set canJump to true
function onTheFloor() {
  canJump = true;
}

// make the dino jumps
function dinoJump() {
  if (canJump) {
    player.setVelocityY(-500);
    canJump = false;
  }
}

// game over
function onGameOver() {
  gameOver = true;
  player.setVelocityX(0);
  player.anims.play("fall");
  player.body.setEnable(false);
  blackBG.visible = true;
  restartButton.visible = true;
}

// restart game
function restartGame() {
  distance = 0;
  rock.x = 800;
  rockSpeed = -5;
  player.anims.play("run");

  blackBG.visible = false;
  restartButton.visible = false;

  player.body.setEnable(true);
  gameOver = false;
  flag = false;
}

// game config
var config = {
  type: Phaser.AUTO,
  width: 710,
  height: 500,
  parent: "gameContainer",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 980 },
      debug: false,
    },
  },
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

let game = new Phaser.Game(config);

/**
 * This function helps you solve quadratic equation Ax^2 + Bx + C
 * @param {Number} a is numerical coefficients of X^2
 * @param {Number} b is numerical coefficients of X
 * @param {Number} c is constant
 * @returns list of solutions from smallest to largest if no solution found return empty list
 */
function solveChallenge(param) {
  let a = param[0];
  let b = param[1];
  let c = param[2];

  if (a == 0) {
    // In case a = 0 this is not a quadratic equations.
    if (b == 0) {
      return [];
    } else {
      return [-c / b];
    }
  } else {
    //Find delta
    var delta = b ** 2 - 4 * a * c;

    if (delta > 0) {
      // Equation have 2 distinct solutions
      sol1 = (-b - Math.sqrt(delta)) / (2 * a);
      sol2 = (-b + Math.sqrt(delta)) / (2 * a);

      // Sort solutions from smallest to largest
      if (sol1 < sol2) return [sol1, sol2];
      else return [sol2, sol1];
    } else if (delta == 0) {
      // Equation have 1 solution
      return [-b / (2 * a)];
    } else {
      // Impossible equation
      return [];
    }
  }
}


