// Constructor for Player (and the ship)

function Player() {
  this.thirst = 0,          //Your thirst over 6
  this.heatShip = 0,        //Current heat of the ship
  this.maxHeatShip= 8,      //Maximum heat the ship can take
  this.water = 3,           //Water available
  this.maxWater = 3,        //Maximum water the canteen can hold
  this.milesTravelled = 0,  //Miles travelled
  this.milesToCamp = 200,   //Miles to arrive to camp
  this.distFromSmugglers= 0,//How far away you are from the smugglers
  this.followed= false;     //Have the smugglers noticed you escaped?
}

//The player gets to village and is healed.
Player.prototype.getsToVillage = function(){
  console.log("***You found a village inhabited by friendly people.*** \nThey give you water, refill your canteen and help you cool your ship.");
  this.thirst=0;
  this.water = this.maxWater;
  this.heatShip=0;
}

//The player drinks water from the canteen

Player.prototype.drinks = function(){
  if (this.water > 1){
    this.water -=1;
    this.thirst=0;
    console.log("You drink from your canteen. You're not thirsty anymore.");
    } else if (this.water == 1){
    this.water -=1;
    this.thirst=0;
    console.log("You drink from your canteen.  You're not thirsty anymore.\nYour canteen is empty!");
    } else {
      console.log("You can't drink! The canteen is empty!");
    }
}

//The player's ship flies at moderate speed

Player.prototype.moderate = function() {

}

//The player's ship flies at full speed

//The player stops to rest

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
  story();
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
  console.log("Bye!");
  return "The End";

}