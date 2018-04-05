//Constructor for the game

function Game() {
  this.smugglers=new Smugglers();
  this.player = new Player(this,this.smugglers);
  this.nomad = new Nomad(this,this.player);
  this.tellStory();
}

Game.prototype.start = function(){
  $("#console").empty()
  $("#console").append("You were kidnapped three days ago by smugglers during a space mission to Karasir, a desertic planet. <br>You have managed to escape from their prison, steal some food and a very small, half-broken spaceship. <br>You're trying to get back to your camp, but for that you have to cross the desert aboard the spaceship.<br>Don't run out of water or you'll die of thirst. <br>Don't let the smugglers catch you or they will kill you on the spot. <br>Don't forget to let your ship cool down once in a while or it will overheat and explode and you'll die in the middle of nowhere.<br>");
  $("#screen").append("These are your options:<br><br>1. Drink from your canteen (your water reserve will diminish). You'll die if your thirst goes over 6. <br>2. Ahead moderate speed (you'll get thirstier, and your ship will advance a little but also heat a little). Your ship will explode if the heat goes over 8.<br>3. Ahead full speed (you'll get thirstier, your ship will advance more but also heat more). Your ship will explode if the heat goes over 8.<br>4. Stop to rest (your ship will cool down).<br>5. Restart the game<br>6. Quit the game")
  $("#status").append("<center><b>YOUR STATUS</b></center><br>Miles travelled so far: "+ this.player.milesTravelled +"<br><br>Miles to get to your camp: " +(this.player.milesToCamp-this.player.milesTravelled)+"<br><br>Your thirst: "+this.player.thirst+"/6<br><br>Water in your canteen: "+this.player.water +"/"+this.player.maxWater+"<br><br>Your ship's heat: "+this.player.heatShip+"/"+this.player.maxHeatShip+"<br>");
}



//The game checks if you arrived to your camp
Game.prototype.checkWin = function(){
  if(this.player.milesTravelled >=200 && this.player.thirst <= 6 && this.player.heatShip <= this.player.maxHeatShip){
    $("#console").empty(); 
    $("#console").append("YOU ESCAPED FROM THE DESERT AND ARRIVED TO YOUR CAMP!! CONGRATULATIONS!!!");
    $(".game-btn").removeClass("red-btn");
    $(".game-btn").addClass("disabled")

    return true;
  }

}
//The game checks if you're alive, and how thirsty are you
Game.prototype.checkAlive = function(){

  if(this.player.thirst>=5 && this.player.thirst <7){
    $("#console").append("<br>You're thirsty!<br>");
    $("#drink").addClass("red-btn");
    return true;
  } else if (this.player.thirst>6){
    $("#console").append("You died of thirst! <br><br>GAME OVER");
    $(".game-btn").removeClass("red-btn");
    $(".game-btn").addClass("disabled")
    return false;
  } else if (this.player.thirst<5){
    return true;
  }
}
//The game checks if the ship is working
Game.prototype.checkShip = function(){
   
  if(this.player.heatShip>4 && this.player.heatShip<=8){
    $("#console").append("<br>Your ship is overheating, stopping to rest would be a good idea.")
    $("#stop").addClass("red-btn");
    return true;
  } else if (this.player.heatShip>8){
    $("#console").append("Your ship overheats so much it explodes in mid-flight. You're dead.<br>GAME OVER");
    $(".game-btn").removeClass("red-btn");
    $(".game-btn").addClass("disabled")
    return false;
  } else if (this.player.heatShip<=4){
    return true;
  }

}
//The game checks if the smugglers have caught you

var cazado;
Game.prototype.checkCaught = function(){
  
  if (this.player.followed
    && (this.player.milesTravelled - this.smugglers.milesTravelled) <=0){
    $("#console").append("<br>*****The smugglers arrive at your position, board your ship and shoot you to death.*****<br>GAME OVER");
    $(".game-btn").addClass("disabled")
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
      $("#console").append("<br>*****Suddenly, you get a radio message from the smugglers!*****<br> 'PRISONER, WE NOTICED YOU HAVE ESCAPED. STAY WHERE YOU ARE.'<br>From now on, the smugglers are following your ship, hoping to catch you. <br>");
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
  } else if (result==10){
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


  $("#drink").click(function() {
    $("#console").empty()
    this.player.drinks();
  }.bind(this));


  $("#moderate").click(function() {
    $("#console").empty()
    this.player.moderate();
  }.bind(this));

  $("#full").click(function() {
    $("#console").empty()
    this.player.fullSpeed();
  }.bind(this));

  $("#stop").click(function() {
   $("#console").empty()
   this.player.stop();
  }.bind(this));

  $("#restart").click(function() {
    $("#console").empty()
    this.player.restart();
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
