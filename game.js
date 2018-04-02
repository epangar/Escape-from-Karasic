var player = {
  name: "",
  thirst : 0,       //Your thirst over 6
  heatShip : 0,     //Heat of the ship
  maxHeatShip: 8,    //Maximum heat the ship can take
  water : 3,        //water available
  maxWater : 3,     //Maximum water the canteen can hold
  milesTravelled : 0, //Miles travelled
  milesToCamp : 200, //Miles to arrive to camp
  distFromSmugglers: 0//How far away you are from the smugglers
}



player.name =prompt("What's your name?");

alert(player.name +": you were kidnapped three days ago by smugglers during a space mission to Karasir, a desertic planet. You have managed to escape from their prison, steal some food and a very small, half-broken spaceship. You're trying to get back to your camp, but for that you have to cross the dessert aboard the spaceship.");
alert("Don't run out of water or you'll die of thirst.\nDon't let the smugglers catch you or they will kill you on the spot.\nDon't forget to let your ship cool down once in a while or it will overheat and explode and you'll die in the middle of nowhere.");

function status(){
  console.log("*************************\n"+"YOUR STATUS:\nName: "+player.name+"\nMiles travelled: "+ player.milesTravelled +"\nMiles to get to your camp: " +(player.milesToCamp-player.milesTravelled)+"\nYour thirst: "+player.thirst+"/6\nWater in your canteen: "+player.water +"/"+player.maxWater+"\nYour ship's heat: "+player.heatShip+"/"+player.maxHeatShip);
}

function ask(){
  status();
  
}

ask();