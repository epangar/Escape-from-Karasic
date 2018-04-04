// Constructor for Player (and the ship)

function Player(game, smugglers, nomad) {
  this.thirst = 0,          //Your thirst over 6
  this.heatShip = 0,        //Current heat of the ship
  this.maxHeatShip= 8,      //Maximum heat the ship can take
  this.water = 3,           //Water available
  this.maxWater = 3,        //Maximum water the canteen can hold
  this.milesTravelled = 0,  //Miles travelled
  this.milesToCamp = 200,   //Miles to arrive to camp
  this.distFromSmugglers= 0,//How far away you are from the smugglers
  this.followed= false;     //Have the smugglers noticed you escaped?
  this.game= game;
  this.smugglers=smugglers;

}

//The player gets to village and is healed.
Player.prototype.getsToVillage = function(){
   
  $("#console").append("***You found a village inhabited by friendly people.*** \nThey give you water, refill your canteen and help you cool your ship.");
  this.thirst=0;
  this.water = this.maxWater;
  this.heatShip=0;
}

//The player finds a sandstorm and is hurt.
Player.prototype.sandstorm = function(){
   

  if (this.milesTravelled > 10){
    this.milesTravelled-=10;
    $("#console").append("***You are trapped in a sandstorm! Your ship shakes back and forth***");
    $("#console").append("You're sent back 10 miles. ");
    if(this.water>0){
      $("#console").append("You lose some water!");
        this.water-=1;
      }
  } else {
    $("#console").append("You see a sandstorm roaring in the horizon...")
  }


  
}

//The player's status
Player.prototype.status = function(){
  $("#status").empty();
  $("#status").append("YOUR STATUS:<br><br>Miles travelled so far: "+ this.milesTravelled +"<br>Miles to get to your camp: " +(this.milesToCamp-this.milesTravelled)+"<br>Your thirst: "+this.thirst+"/6<br>Water in your canteen: "+this.water +"/"+this.maxWater+"<br>Your ship's heat: "+this.heatShip+"/"+this.maxHeatShip);

  if(this.followed===true && (this.milesTravelled-this.smugglers.milesTravelled)>0){
  $("#status").append("<br>The smugglers are "+(this.milesTravelled-this.smugglers.milesTravelled)+" miles behind you.\n"); 
  } else {
  $("#status").append("");
  }

  
}

  //The player drinks water from the canteen
Player.prototype.drinks = function(){
  

  if (this.water > 1){
    this.water -=1;
    this.thirst=0;
    $("#console").append("*****You drink from your canteen. You're not thirsty anymore.*****<br><br>")
    } else if (this.water == 1){
    this.water -=1;
    this.thirst=0;
    $("#console").append("<br><br>*****You drink from your canteen. You're not thirsty anymore.<br>Your canteen is empty!*****<br>")
    } else {
      $("#console").append("You can't drink! The canteen is empty!");
    }
}

//The player's ship flies at moderate speed

Player.prototype.moderate = function() {
  var result=Math.floor(Math.random()*5)+6;
  console.log(result);
  this.milesTravelled+= result
  this.thirst+=1;
  this.heatShip+=1
  this.smugglers.milesTravelled+=Math.floor(Math.random()*4)+10;
  this.distFromSmugglers+= (this.milesTravelled-this.smugglers.milesTravelled)
    
  $("#console").append("Moderate speed...\n...\n...\nYou traveled "+result+" miles.");
  this.game.checkAll();

}

//The player's ship flies at full speed
Player.prototype.fullSpeed = function(){
  var result = Math.floor(Math.random()*6)+10;
  console.log(result)
   this.milesTravelled+= result;
   this.thirst+=1;
   this.heatShip+=  Math.floor(Math.random()*3)+1;
   this.smugglers.milesTravelled+=Math.floor(Math.random()*4)+10;
   this.distFromSmugglers+= (this.milesTravelled-this.smugglers.milesTravelled)
    
   $("#console").append(">>>>FULL SPEED!<<<<<br>...<br>...<br>You traveled "+result+" miles.");
   this.game.checkAll();
}


//The player stops to rest

Player.prototype.stop = function(){
  this.heatShip =0;
   
  $("#console").append("You stop to rest.\n\n\n");
  $("#console").append("You cooled your ship.")
  this.smugglers.milesTravelled+=Math.floor(Math.random()*4)+10;
  this.distFromSmugglers+= (this.milesTravelled-this.smugglers.milesTravelled)
  
  this.game.checkAll();
}

//The player restarts the game

Player.prototype.restart = function () {
   
  this.thirst = 0
  this.heatShip = 0     
  this.maxHeatShip= 8
  this.water = 3
  this.maxWater = 3
  this.milesTravelled = 0
  this.milesToCamp = 200
  this.distFromSmugglers= 0 
  this.followed= false
  this.game.tellStory();
}

//The player quits the game

Player.prototype.quit = function () {
  this.thirst = 0
  this.heatShip = 0     
  this.maxHeatShip= 8
  this.water = 3
  this.maxWater = 3
  this.milesTravelled = 0
  this.milesToCamp = 200
  this.distFromSmugglers= 0
  this.followed= false
   
  $("#console").append("Bye!");
  return "The End";
  }

