var smugglers = {
  milesTravelled:0,
 }
 
 var player = {
   name: "",
   thirst : 0,       //Your thirst over 6
   heatShip : 0,     //Heat of the ship
   maxHeatShip: 8,    //Maximum heat the ship can take
   water : 3,        //water available
   maxWater : 3,     //Maximum water the canteen can hold
   milesTravelled : 0, //Miles travelled
   milesToCamp : 200, //Miles to arrive to camp
   distFromSmugglers: 0,//How far away you are from the smugglers
   followed: false, //Have the smugglers noticed you escaped?
 }
 
 
 
 
 /*Changes:
 
 A function for different endings? Die of thirst, catched by smugglers, arrive safely...
 Different objects for player and ship?
 An object for nomads?
 A constructor for nomads? (3 different nomads)
 There is a way to ask the player without a message appearing?
 A 1d100 for the random events? (Oasis, nomads, sandstorm)? [x]
 An array for turns?
 Nomad sells: Sandstorm protection shield, turbo, ship cooler, bigger canteen.
 Nomad sells random price?
 Nomad has a minigame for a free price?
 
 */
 
 function start(){
 player.name =prompt("What's your name?");
 
 console.log("ESCAPE FROM KARASIR\n\n\n"+player.name +": you were kidnapped three days ago by smugglers during a space mission to Karasir, a desertic planet. You have managed to escape from their prison, steal some food and a very small, half-broken spaceship. You're trying to get back to your camp, but for that you have to cross the dessert aboard the spaceship.");
 console.log("Don't run out of water or you'll die of thirst.\nDon't let the smugglers catch you or they will kill you on the spot.\nDon't forget to let your ship cool down once in a while or it will overheat and explode and you'll die in the middle of nowhere.");
 }
 
 function status(){
   console.log("*************************\n"+"YOUR STATUS:\nName: "+player.name+"\nMiles travelled: "+ player.milesTravelled +"\nMiles to get to your camp: " +(player.milesToCamp-player.milesTravelled)+"\nYour thirst: "+player.thirst+"/6\nWater in your canteen: "+player.water +"/"+player.maxWater+"\nYour ship's heat: "+player.heatShip+"/"+player.maxHeatShip);
   
   if(player.followed===true){
     console.log("The smugglers are "+(player.distFromSmugglers) +" miles behind you.\n*************************")
   } else {
     console.log("*************************");
   }
   
 
 }
 
 
 function village(){
   
   console.log("***You found a village inhabited by friendly people.*** \nThey give you water, refill your canteen and help you cool your ship.");
   
   player.thirst=0;
   player.water = player.maxWater;
   player.heatShip
   
 }
 
 function randomEvent(){
   result=Math.floor(Math.random()*20)+1;
 
   if(result==1){
     console.log("[SANDSTORM()]")
   }  else if (result == 10){
     console.log("[FRIENDLY VILLAGE()]")
   } else if (result==20) {
     console.log("[WANDERER()]")
   } 
   
 }
 
 
 function checkAll(){
   
   //Check if the player is alive
   
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
   
   //Check if the smugglers have noticed you left
   
   if(player.followed === false && player.milesTravelled <20){
     console.log("So long, your escape hasn't been detected.");
   } else if (player.followed === false && player.milesTravelled >=20){
     var result=Math.floor(Math.random()*2)+1;
     
     if (result == 2){
       console.log("So long, your escape hasn't been detected.");
     } else {
       player.followed = true;
       console.log("Suddenly, you get a radio message from the smugglers!\n\n\n 'PRISONER, WE NOTICED YOU HAVE ESCAPED. STAY WHERE YOU ARE.'\n\n\nFrom now on, the smugglers are following your ship, hoping to catch you.")
     }
   }
   
   
   //Check if you're close to being caught
   
   
   //Check if there will be a random event
   
   randomEvent();
 }
 
 function drink(){
     if (player.water > 1){
     player.water -=1;
     player.thirst=0;
     console.log("You drink from your canteen");
     } else if (player.water == 1){
     player.water -=1;
     player.thirst=0;
     console.log("You drink from your canteen.\nYour canteen is empty!");
     } else {
       console.log("You can't drink! The canteen is empty!");
     }
   
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
   
 
 }
 
 
 function ask(){
   status()
   
   var answer = prompt("This are your options:\n\nA. Drink from your canteen (your water reserve will diminish).\nB. Ahead moderate speed (you'll get thirstier, your ship will heat a little).\nC. Ahead full speed (you'll get thirstier, your ship will heat  some more).\nD. Stop to rest (your ship will cool down).\nR. Restart the game\nQ. Quit the game")
   if (answer=="a"||answer=="A"){
     drink();
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
     player.name = "";
     player.thirst = 0
     player.heatShip = 0     
     player.maxHeatShip= 8
     player.water = 3
     player.maxWater = 3
     player.milesTravelled = 0
     player.milesToCamp = 200
     player.distFromSmugglers= 0
     player.followed= false
     
     game();
   }  else if (answer=="q"||answer=="Q") {
     player.name = "";
     player.thirst = 0
     player.heatShip = 0     
     player.maxHeatShip= 8
     player.water = 3
     player.maxWater = 3
     player.milesTravelled = 0
     player.milesToCamp = 200
     player.distFromSmugglers= 0
     player.followed= false
 console.log("Bye!");
     return "The End";
   } else {
     alert("Sorry, I don't understand.");
     ask();
     
   } 
   
   
 }
 
 function game(){
   start();
   ask();
   
 }
 game();