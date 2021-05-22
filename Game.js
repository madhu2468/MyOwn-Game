class Game{
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

   
      form = new Form()
      form.display();
    
    }

    ground = createSprite(690,770,1800,displayHeight);
    ground.addImage("debg",Bg);
   ground.sclae = 0.12;
   ground.y=ground.height/2;  
   ground.velocityY=-4;

    guardian1 = createSprite(100,700);
    guardian2 = createSprite(300,700);
    guardian3 = createSprite(500,700);
    guardian4 = createSprite(700,700);
    guardians = [guardian1, guardian2, guardian3, guardian4];

    aliensGroup = createGroup();

    
  }

  level1(){
    form.hide();
    Player.getPlayerInfo();
 
    if(allPlayers !== undefined){
    background(220);
     
    


      var index = 0;

   
      var x = 175 ;
      var y;

      for(var plr in allPlayers){

        index = index + 1 ;

     
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        guardians[index-1].x = x;
        guardians[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
        guardians[index - 1].shapeColor = "red";
   if(ground.y<100){
   ground.y=ground.height/2;
    }
        }
        
        

        if(keyIsDown(UP_ARROW)&& player.index !== null ){
          player.distance +=  20;
           player.update();
       }
 
         if(keyIsDown(DOWN_ARROW)&& player.index !== null ){
          player.distance  -=20;
          player.update();
         }



         if(frameCount % 100 === 0){
          alien = createSprite(random(200,1000),0,40,40);
          alien.addImage("alien",alienImg);
          alien.scale = 0.2;
          alien.shapeColor = "green"
          alien.y = Math.round(random(1,5));
          alien.lifetime = 100;  
            alien.velocityY= 6;
            aliensGroup.add(alien);
             }

             
            
    if(guardian1.isTouching(aliensGroup)){
      guardian1.lifetime -= 5;
      }

    if(player.lifetime === 0){
     gameState = 2;
    }
             
           if(player.distance > 720){
          player.distance = 200    
                }

       if(player.distance < -600){
        player.distance = 200    
      }



        }
        drawSprites();

        textSize(25);
        stroke("red")
        fill("blue");
    text("LIFETIME:- " + lifetime,displayWidth/9 -80, displayHeight/2 -340);
  
      }
      
    }

  
      end(){
       background(0);
       image(GameOver,displayWidth/2-300,displayHeight/4,600,100);
       image(TryAgain,displayWidth/2-70,displayHeight/4+100,150,150);
       console.log("Game Over");
    }
  }

