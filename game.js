//Constructor for the game

function Game() {
  this.smugglers=new Smugglers();
  this.player = new Player();
}

/*
Game.prototype.checkAll =() {
if this.checkwin --> método game finished o playerwon

}*/ 

//The game checks if you arrived to your camp
Game.prototype.checkWin = function(){
  if(this.player.milesTravelled >=200 && this.player.thirst <= 6 && this.player.heatShip <= this.player.maxHeatShip){
    console.log("YOU ESCAPED FROM THE DESERT AND ARRIVED TO YOUR CAMP!! CONGRATULATIONS!!!");
    return true;
  }

}
//The game checks if you're alive, and how thirsty
Game.prototype.checkAlive = function(){
  if(this.player.thirst>=5 && this.player.thirst <7){
    console.log("You're thirsty!");
  } else if (this.player.thirst>6){
    console.log("You died of thirst! :(\n\nGAME OVER");
    return "THE END";
  }
}
//The game checks if the ship is working
Game.prototype.checkShip = function(){
   
  if(this.player.heatShip>4 && this.player.heatShip<=8){
    console.log("Your ship is overheating, stopping to rest would be a good idea.")
  } else if (this.player.heatShip>8){
    console.log("Your ship overheats so much it explodes in mid-flight. You're dead :(\n\nGAME OVER");
    return "THE END";
  }

}
//The game checks if the smugglers have caught you
Game.prototype.checkCaught = function(){
  if (this.player.followed===true && this.player.milesTravelled-smugglers.milesTravelled <=0){
    console.log("The smugglers arrive at your position, board your ship and shoot you to death.\n\nGAME OVER");
    return "THE END"
  }
}
//The game checks if the smugglers noticed you escaped
Game.prototype.checkNoticed = function(){
  if(this.player.followed === false && this.player.milesTravelled <20){
    console.log("So far, your escape hasn't been detected.");
  } else if (this.player.followed === false && this.player.milesTravelled >=20){
      this.player.followed = true;
      console.log("Suddenly, you get a radio message from the smugglers!\n\n\n 'PRISONER, WE NOTICED YOU HAVE ESCAPED. STAY WHERE YOU ARE.'\n\n\nFrom now on, the smugglers are following your ship, hoping to catch you.");
      smugglers.milesTravelled=0;
    }
}

//The generates (or not) a random event
Game.prototype.randomEvent = function(){
  result=Math.floor(Math.random()*20)+1;
 
  if(result==1){
    console.log("[SANDSTORM()]")
  }  else if (result == 10){
    this.player.getsToVillage();
  } else if (result==20) {
    console.log("[WANDERER()]")
  }

}

Game.prototype.checkAll = function(){
  this.checkWin();
  this.checkAlive();
  this.checkShip();
  this.checkCaught();
  this.checkNoticed();
  this.randomEvent()
}

 function start(){
   console.log("ESCAPE FROM KARASIR\n\n\nYou were kidnapped three days ago by smugglers during a space mission to Karasir, a desertic planet. You have managed to escape from their prison, steal some food and a very small, half-broken spaceship. You're trying to get back to your camp, but for that you have to cross the desert aboard the spaceship.\n\n\nDon't run out of water or you'll die of thirst.\nDon't let the smugglers catch you or they will kill you on the spot.\nDon't forget to let your ship cool down once in a while or it will overheat and explode and you'll die in the middle of nowhere.");
 }
   

 
   //Game.prototype.ask
 Game.prototype.ask = function (){
   this.player.status();
   
   var answer = prompt("This are your options:\n\nA. Drink from your canteen (your water reserve will diminish).\nB. Ahead moderate speed (you'll get thirstier,  your ship will heat a little and advance a little).\nC. Ahead full speed (you'll get thirstier, your ship will heat some more and advance some more).\nD. Stop to rest (your ship will cool down).\nR. Restart the game\nQ. Quit the game")
   if (answer=="a"||answer=="A"){
     this.player.drinks();
     ask();
   } else if (answer=="b"||answer=="B") {
     this.player.moderate();
     ask();
   } else if (answer=="c"||answer=="C") {
     this.player.fullSpeed();
     ask();
   } else if (answer=="d"||answer=="D") {
     this.player.stop();
     ask();
   } else if (answer=="r"||answer=="R") {
     this.player.restart();
   }  else if (answer=="q"||answer=="Q") {
     this.player.quit();
   } else {
     alert("Sorry, I don't understand.");
     ask();
     
   } 
   
   
 }
 
 Game.prototype.tellStory = function (){
   start();
   this.ask();
   
 }
 Game();