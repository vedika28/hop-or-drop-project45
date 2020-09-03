//declaring all variables:
var block1Img, block2Img, block1, block2, blockGroup;
var bgImg, bg, block = [], plank;
var player, playerAnm, player_jump,player_die;
var enemy1, enemy2, enemy = [];
var gameState;
var blockX;
var booster_enemy, booster_score, boosterScore = [], boosterEnemy = [];
var score = 0;
var resetButton;
var player_shield, shieldImg = 0;
var booster;

//all images
function preload() {
  block1Img = loadImage("imgs/block1.jpg");
  block2Img = loadImage("imgs/block2.jpg");
  bgImg = loadImage("imgs/bg.jpg");
  enemy1 = loadImage("imgs/rock1.png");
  enemy2 = loadImage("imgs/rock2.png");
  playerAnm = loadAnimation("imgs/c1.png", "imgs/c2.png", "imgs/c3.png",
    "imgs/c4.png", "imgs/c5.png", "imgs/c6.png", "imgs/c7.png", "imgs/c8.png");
  player_jump = loadImage("imgs/c8.png");
  booster_enemy = loadImage("imgs/booster_enemy.png");
  booster_score = loadImage("imgs/booster_score.png");
  player_die = loadImage("imgs/cat_die.png");
  player_shield = loadImage("imgs/player_shield.png");
  player_shield = loadAnimation("imgs/cs1.png", "imgs/cs2.png", "imgs/cs3.png",
    "imgs/cs4.png", "imgs/cs5.png", "imgs/cs6.png", "imgs/cs7.png", "imgs/cs8.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 145);
  gameState = "play";

  //creating the objects for the classes:
  player = new Player(130, 120, 20, 20);
  plank = new Block(130, 270, 100, 10);

  block1 = new Block((width / 2) - 100, 300, 100, 10)
  blockGroup = new Group();
  booster = new Booster(150, 300);
  booster.body.visible = false;

  blockX = (width / 2) - 400;
  boosterX = (width / 2) - 400;
  resetButton = new Button();
}

function draw() {
  background(bgImg);

  camera.position.x = player.body.position.x;

  if (gameState === "play") {
    //creating planks for player to jump in them:
    if (frameCount % 50 === 0) {
      var rand = Math.round(random(75, 170))
      blockX = blockX + 300;
      block.push(new Block(blockX, 300, rand, 10));
    }

    /*creating boosters:
    if (frameCount % 600 === 0) {
      boosterEnemy.push(new Booster((player.body.position.x) + 700, 150));
    }
    //adding shield:
    for (var i=0; i<boosterEnemy.length; i++) {
      if (player.body.isTouching(boosterEnemy[i].body)) {
        booster.shield();
      }
    }*/

    //creating enemy:
    var rand3 = random((player.body.x)-30, (player.body.x)+150)
    if (frameCount % 300 === 0) {
      enemy = new Enemy(rand3, -20);
    }

    //adding behaviour to player.
    player.behaviour();

    //adding shield to player when "s" key is pressed:
    player.shield();

    //to make reset button position outside canvas
    resetButton.hide();

    //adding behaviour to block and making player collide with it.
    if (block.length > 0) {
      for (var i = 0; i < block.length; i++) {
        block[i].behaviour();
        blockGroup.add(block[i].body);
      }
    }
    for (var i = 0; i < block.length; i++) {
      player.body.collide(block[i].body);
    }
    player.body.collide(plank.body);
    player.body.collide(block1.body);

    //scoring system:
    if (frameCount % 4 === 0 && frameCount > 150) {
      score += 1;
    }

    //to end game once the enemy(rock) touches the player:
    if (enemy.body) {
      player.die();
    }
  }
  console.log(gameState);

  //calling gameOver and reset function once game ends:
  if (gameState === "end") {
    player.body.velocityX = 0;
    player.body.changeImage("die",player_die);
    resetButton.display();
  }

  drawSprites();
  //instructions when gameState=play:
  if (gameState === "play") {
    textSize(18);
    text("press 's' to create shield to save yourself from the enemies", player.body.x - 215, 50);
  }
  // when gameState=end: 
  if (gameState === "end") {
    textSize(34);
    textFont("BOLD")
    text("Game Over", player.body.x - 50, 200);
  }

  textSize(18);
  textFont("BOLD")
  text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY);
  text("score: " + score, (player.body.position.x) - 400, 100);
}