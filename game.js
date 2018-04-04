//Constructor for the game

function Game() {
  this.smugglers=new Smugglers();
  this.player = new Player(this,this.smugglers);
  this.nomad = new Nomad(this,this.player);
  this.tellStory();
}

Game.prototype.start = function(){
  $("#console").empty(); 
  $("#console").append("ESCAPE FROM KARASIR<br>You were kidnapped three days ago by smugglers during a space mission to Karasir, a desertic planet. You have managed to escape from their prison, steal some food and a very small, half-broken spaceship. You're trying to get back to your camp, but for that you have to cross the desert aboard the spaceship.<br>Don't run out of water or you'll die of thirst. Don't let the smugglers catch you or they will kill you on the spot. Don't forget to let your ship cool down once in a while or it will overheat and explode and you'll die in the middle of nowhere.<br>");

}



//The game checks if you arrived to your camp
Game.prototype.checkWin = function(){
  if(this.player.milesTravelled >=200 && this.player.thirst <= 6 && this.player.heatShip <= this.player.maxHeatShip){
    $("#console").empty(); 
    $("#console").append("YOU ESCAPED FROM THE DESERT AND ARRIVED TO YOUR CAMP!! CONGRATULATIONS!!!");
    return true;
  }

}
//The game checks if you're alive, and how thirsty are you
Game.prototype.checkAlive = function(){


  if(this.player.thirst>=5 && this.player.thirst <7){
    $("#console").append("You're thirsty!");
    return true;
  } else if (this.player.thirst>6){
    $("#console").append("You died of thirst! :(\n\nGAME OVER");
    return false;
  } else if (this.player.thirst<5){
    return true;
  }
}
//The game checks if the ship is working
Game.prototype.checkShip = function(){
  
   
  if(this.player.heatShip>4 && this.player.heatShip<=8){
    $("#console").append("Your ship is overheating, stopping to rest would be a good idea.")
    return true;
  } else if (this.player.heatShip>8){
    $("#console").append("Your ship overheats so much it explodes in mid-flight. You're dead :(\n\nGAME OVER");
    return false;
  } else if (this.player.heatShip<=4){
    return true;
  }

}
//The game checks if the smugglers have caught you

var cazado;
Game.prototype.checkCaught = function(){
  
  if (this.player.followed===true && (this.player.milesTravelled-this.smugglers.milesTravelled) <=0){
    $("#console").append("The smugglers arrive at your position, board your ship and shoot you to death.\n\nGAME OVER");
    cazado=true;
    return true;
  } else {
    cazado = false;
    return false;
  }
}
//The game checks if the smugglers noticed you escaped
Game.prototype.checkNoticed = function(){

  if(this.player.followed === false && this.player.milesTravelled <20){
    $("#console").append("So far, your escape hasn't been detected.");
  } else if (this.player.followed === false && this.player.milesTravelled >=20){
      this.player.followed = true;
      $("#console").append("Suddenly, you get a radio message from the smugglers!\n\n\n 'PRISONER, WE NOTICED YOU HAVE ESCAPED. STAY WHERE YOU ARE.'\n\n\nFrom now on, the smugglers are following your ship, hoping to catch you.");
      this.smugglers.milesTravelled=0;
    }
}

//The game generates (or not) a random event
Game.prototype.randomEvent = function(){
  result=Math.floor(Math.random()*20)+1;
 
  if(result==1){
    this.player.sandstorm();
  }  else if (result ==20){
    this.player.getsToVillage();
  } else if (result ==10){
    this.nomad.bet();
  }

}

Game.prototype.checkAll = function(){
  this.checkWin();
  this.checkAlive();

  if(this.checkAlive){
    this.checkShip();

    if(this.checkShip){
      this.randomEvent();
      this.checkCaught();
    }
        if(cazado==false){

        }
  this.checkNoticed();
    }
  }
  

   //Game.prototype.ask
 Game.prototype.ask = function (){
  this.player.status();
   
  $("#console").append("These are your options:<br><br>1. Drink from your canteen (your water reserve will diminish).<br>2. Ahead moderate speed (you'll get thirstier,  your ship will heat a little and advance a little).<br>3. Ahead full speed (you'll get thirstier, your ship will heat some more and advance some more).<br>4. Stop to rest (your ship will cool down).<br>5. Restart the game<br>6. Quit the game")
  
  $("#drink").click(function() {
    $("#console").empty()
    this.player.drinks();
    this.ask();
  }.bind(this));


  $("#moderate").click(function() {
    $("#console").empty()
    this.player.moderate();
    this.ask();
  }.bind(this));

  $("#full").click(function() {
    $("#console").empty()
    this.player.fullSpeed();
    this.ask();
  }.bind(this));

  $("#stop").click(function() {
   $("#console").empty()
   this.player.stop();
   this.ask();
  }.bind(this));

  $("#restart").click(function() {
    $("#console").empty()
    this.player.restart();
  this.ask();
  }.bind(this));

$("#quit").click(function() {
  $("#console").empty()
  this.player.quit();
}.bind(this));
  
   
 }
 
 Game.prototype.tellStory = function (){
   this.start();
   this.ask();
   
 }
