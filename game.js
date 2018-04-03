var smugglers = new Smugglers();
 
var player = new Player();
  
 function start(){
 
 console.log("ESCAPE FROM KARASIR\n\n\nYou were kidnapped three days ago by smugglers during a space mission to Karasir, a desertic planet. You have managed to escape from their prison, steal some food and a very small, half-broken spaceship. You're trying to get back to your camp, but for that you have to cross the desert aboard the spaceship.");
 console.log("Don't run out of water or you'll die of thirst.\nDon't let the smugglers catch you or they will kill you on the spot.\nDon't forget to let your ship cool down once in a while or it will overheat and explode and you'll die in the middle of nowhere.");
 }
 
 function status(){
   console.log("*************************\n"+"YOUR STATUS:\nName: "+player.name+"\nMiles travelled so far: "+ player.milesTravelled +"\nMiles to get to your camp: " +(player.milesToCamp-player.milesTravelled)+"\nYour thirst: "+player.thirst+"/6\nWater in your canteen: "+player.water +"/"+player.maxWater+"\nYour ship's heat: "+player.heatShip+"/"+player.maxHeatShip);
   
   if(player.followed===true && (player.milesTravelled-smugglers.milesTravelled)>=0){
     console.log("The smugglers are "+(player.milesTravelled-smugglers.milesTravelled)+" miles behind you.\n*************************")
   } else {
     console.log("*************************");
   }
 
 }
  
 function randomEvent(){
   result=Math.floor(Math.random()*20)+1;
 
   if(result==1){
     console.log("[SANDSTORM()]")
   }  else if (result == 10){
     player.getsToVillage();
   } else if (result==20) {
     console.log("[WANDERER()]")
   } 
   
 }
 
 
 function checkAll(){
   
   //Check if you left the dessert
     if(player.milesTravelled >=200 && player.thirst <= 6 && player.heatShip <= player.maxHeatShip){
       
     console.log("YOU ESCAPED FROM THE DESERT AND ARRIVED TO YOUR CAMP!! CONGRATULATIONS!!!");
     return "THE END";
   }
   
   //Check if the player is thirsty and alive
   
   if(player.thirst>=5 && player.thirst <7){
     console.log("You're thirsty!");
   } else if (player.thirst>6){
     console.log("You died of thirst! :(\n\nGAME OVER");
     return "THE END";
   }
   
   //Check if the ship is working
   
   if(player.heatShip>4 && player.heatShip<=8){
     console.log("Your ship is overheating, stopping to rest would be a good idea.")
   } else if (player.heatShip>8){
     console.log("Your ship overheats so much it explodes in mid-flight. You're dead :(\n\nGAME OVER");
     return "THE END";
   }
 
 
   //Check if you're close to being caught
   
   if (player.followed===true && player.milesTravelled-smugglers.milesTravelled <=0){
     console.log("The smugglers arrive at your position, board your ship and shoot you to death.\n\nGAME OVER");
     return "THE END"
   }
   
   
   //Check if the smugglers have noticed you left
   
   if(player.followed === false && player.milesTravelled <20){
     console.log("So far, your escape hasn't been detected.");
   } else if (player.followed === false && player.milesTravelled >=20){
       player.followed = true;
       console.log("Suddenly, you get a radio message from the smugglers!\n\n\n 'PRISONER, WE NOTICED YOU HAVE ESCAPED. STAY WHERE YOU ARE.'\n\n\nFrom now on, the smugglers are following your ship, hoping to catch you.");
       smugglers.milesTravelled=0;
     }
   
   
   
   //Check if there will be a random event
   
   randomEvent();
 }
 
 
 function moderate(){
   var result=Math.floor(Math.random()*5)+6;
   player.milesTravelled+= result
   player.thirst+=1;
   player.heatShip+=1
   smugglers.milesTravelled+=Math.floor(Math.random()*4)+10;
   player.distFromSmugglers+= (player.milesTravelled-smugglers.milesTravelled)
   console.log("Moderate speed...\n...\n...\nYou traveled "+result+" miles.");
   
  
   checkAll();
   
   }
     
 function fullSpeed(){
   var result = Math.floor(Math.random()*6)+10;
   player.milesTravelled+= result;
   player.thirst+=1;
   player.heatShip+=  Math.floor(Math.random()*3)+1;
   smugglers.milesTravelled+=Math.floor(Math.random()*4)+10;
   player.distFromSmugglers+= (player.milesTravelled-smugglers.milesTravelled)
   console.log(">>>>FULL SPEED!<<<<\n...\n...\nYou traveled "+result+" miles.");
   
   checkAll();
 }
   
 function stop(){
   player.heatShip =0;
   console.log("You stop to rest.\n\n\n");
   console.log("You cooled your ship.")
   smugglers.milesTravelled+=Math.floor(Math.random()*4)+10;
   player.distFromSmugglers+= (player.milesTravelled-smugglers.milesTravelled)
   checkAll();
   }
 
 function ask(){
   status()
   
   var answer = prompt("This are your options:\n\nA. Drink from your canteen (your water reserve will diminish).\nB. Ahead moderate speed (you'll get thirstier,  your ship will heat a little and advance a little).\nC. Ahead full speed (you'll get thirstier, your ship will heat some more and advance some more).\nD. Stop to rest (your ship will cool down).\nR. Restart the game\nQ. Quit the game")
   if (answer=="a"||answer=="A"){
     player.drinks();
     ask();
   } else if (answer=="b"||answer=="B") {
     moderate();
     ask();
   } else if (answer=="c"||answer=="C") {
     fullSpeed();
     ask();
   } else if (answer=="d"||answer=="D") {
     stop();
     ask();
   } else if (answer=="r"||answer=="R") {
     player.restart();
   }  else if (answer=="q"||answer=="Q") {
     player.quit();
   } else {
     alert("Sorry, I don't understand.");
     ask();
     
   } 
   
   
 }
 
 function story(){
   start();
   ask();
   
 }
 story();