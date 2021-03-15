var climber, climberImg, tower, towerImg, door, doorImg, ghost, ghostImg1, ghostImg2, music, invisblock, invisblockG, gamestate;
var doorG, climberG;

gamestate = "play";

function preload() {
  climberImg = loadImage("climber.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg1 = loadImage("ghost-standing.png");
  ghostImg2 = loadImage("ghost-jumping.png");
  music = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300, 200, 20, 20);
  tower.addImage(towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(300, 100, 20, 20);
  ghost.addImage(ghostImg1);
  ghost.scale = 0.3;
  
  doorG = new Group();
  climberG = new Group();
  invisblockG = new Group();
}

function draw() {
  
  if(gamestate == "play") {
    background("black");
    ghost.velocityY += 0.3;
  
  if(keyDown("right_arrow")) {
    ghost.velocityX = 3;
  }
  if(keyDown("left_arrow")) {
    ghost.velocityX = -3;
  }
  if(keyDown("space")) {
    ghost.velocityY = -4;
  }
  
  if(tower.y > 400) {
    tower.y = 200;
  }
  
  if(frameCount % 60 == 0) {
    doors();
  }
  
  if(invisblockG.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gamestate = "end";
  }
    drawSprites();
  }
  
  if(gamestate == "end") {
    textSize(70);
    fill("yellow");
    text("GAME OVER", 100, 300)
  }
}

function doors() {
  door = createSprite(Math.round(random(100, 500)), 0, 20, 20);
  door.addImage(doorImg);
  door.velocityY = 4;
  door.lifetime = 200;
  doorG.add(door);
  
  climber = createSprite(door.x, door.y + 70, 20, 20);
  climber.addImage(climberImg);
  climber.velocityY = 4;
  climber.lifetime = 200;
  
  invisblock = createSprite(climber.x, climber.y, climber.width, 20)
  invisblock.velocityY = 4;
  invisblock.visible = false;
  invisblockG.add(invisblock);
  
  ghost.depth = door.depth;
  ghost.depth++;
}