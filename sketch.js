var dino, dinoAni;

var ground;

var monster, monsterAni;

var boss1, bossAni;
   
var mb, mbImg;

var fb, fbImg; 

var monstersGroup, fbsGroup, mbsGroup, bossesGroup;

var gameOver;

var bg, bgImg;

//var restart, restartImg;

var score = 0;

var PLAY = 1;
var END = 0;

var gameState =  PLAY;

function preload(){
    mbImg = loadImage("magical_ball.png");

    fbImg = loadImage("fire_ball.png");

    dinoAni = loadImage("Dino_standing.png");

    bossAni = loadAnimation("dragon_up.png", "dragon_down.png");

    monsterAni = loadAnimation("MONSTER 1.png", "MONSTER 2.png");

    bgImg = loadImage("BgImg.jpg");

  // restartImg = loadImage("restart.png")

}





function setup(){
 createCanvas(1000, 500);

    dino = createSprite(100, 450, 20, 50);
    dino.addImage(dinoAni);
    dino.setCollider("rectangle", 0, 0, 10, 20);
    dino.scale = 0.4
  
   
    ground = createSprite(500, 490, 2000, 15);
    ground.shapeColor = ("brown");

   /* restart = createSprite(400, 350);
    restart.addImage(restartImg)
    restart.visible = false;*/

    monstersGroup = new Group(); 
    fbsGroup = new Group();
    mbsGroup = new Group();
    bossesGroup = new Group();

    textSize(20);
    text("SCORE: ", score, 800, 100);

}

function draw(){
    background(bgImg)

dino.collide(ground);

ground.velocityX = -3;

    if(ground.x <0){
    ground.x = ground.width/2;
    }

    if(gameState === PLAY){

spawnMonster();
spawnBosses();
spawnMagicalBall();

   

   

  if(keyDown("space")){
      shootFireBall();
  }

  if(fbsGroup.isTouching(monstersGroup)){
    score = score + 5;  
    monstersGroup.destroyEach();
     fbsGroup.destroyEach();
     
  }

  if(mbsGroup.isTouching(dino)){
    score = score+20;
    mbsGroup.destroyEach();
  }

  if(keyDown("F")){
    shootFireBall2();
   }

   if(fbsGroup.isTouching(bossesGroup)){
       bossesGroup.destroyEach();
       fbsGroup.destroyEach();
       score = score+40;
   }

   

  if(monstersGroup.isTouching(dino)){
    gameState = END;
    score = 0;
}
 }
  else if(gameState === END){
   //restart.visible = true;

    stroke("white");
    textSize(50);
    fill("black");
    text("GAME OVER",400, 250);
    text("Press 'R' to restart", 350, 300)
    
    mbsGroup.setVelocityXEach(0);
      monstersGroup.setVelocityXEach(0);
      bossesGroup.setVelocityXEach(0);

      

      mbsGroup.setLifetimeEach(-1);
      monstersGroup.setLifetimeEach(-1);
      bossesGroup.setLifetimeEach(-1);

      if(keyDown("R")){
        reset();
    }

     

  }
  

drawSprites();


    

stroke("red");
  textSize(30);
  fill("white");
  text("score: " + score, 800, 50);
 
}


function spawnMonster(){
    if(frameCount%80 === 0){
        monster = createSprite(1000, 460, 30, 50);
        monster.addAnimation("monster", monsterAni);
        monster.scale = 0.2;
        monster.velocityX = -5  ;
        monster.lifetime = 500; 

        monstersGroup.add(monster);
 }

}

function spawnBosses(){
    if(frameCount%2000 === 0){
        boss1 = createSprite(1000, 250, 40, 30);
        boss1.addAnimation("boss", bossAni)
        boss1.scale = 0.5
        boss1.velocityX = -5;
        boss1.lifetime = 200;

        bossesGroup.add(boss1);
    }
}

function spawnMagicalBall(){
    if(frameCount%600 === 0 ){
        mb = createSprite(1000, 450, 30, 30);
        mb.addImage(mbImg);
        mb.scale = 0.3
        mb.velocityX = -5;
        mb.lifetime = 200;
        mbsGroup.add(mb);
    }
}

function shootFireBall(){
    fb = createSprite(150, 450, 10, 10);
    fb.addImage(fbImg);
    fb.scale = 0.2
    fb.velocityX = 10;

    fbsGroup.add(fb);
}
function shootFireBall2(){
    fb = createSprite(150, 450, 10, 10);
    fb.addImage(fbImg);
    fb.scale = 0.5
    fb.velocityY = -4;

    fbsGroup.add(fb);
}

function reset(){
    gameState = PLAY;
    
   

   monstersGroup.destroyEach();
   bossesGroup.destroyEach();
   mbsGroup.destroyEach();
}

    
