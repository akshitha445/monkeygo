var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var invisibleground;
var END;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80, 215, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350, 900, 10);
  ground.velocityX= -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(400,350,900,10);
  //invisibleGround.visible = false;
  
  FoodGroup = new Group();
  ObstaclesGroup = new Group();

  score = 0;
}


function draw() {
background(2250);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
     
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
    if(ObstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        ObstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        ObstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      text("Game Over", 150, 150);
  }
  
if (FoodGroup.isTouching(monkey)) {
            FoodGroup.destroyEach();
  }
if (ObstaclesGroup.isTouching(monkey)) {
            gameState = END;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " +score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime= Math.ceil(World.frameCount/World.frameRate);
  text("Survival Time: "+survivaltime,100,50);
  
  drawSprites();
  
  spawnObstacles();
  spawnFood();
}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale=0.05;
    FoodGroup.add(banana);
    
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
