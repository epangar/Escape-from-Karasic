//Constructor for Nomad
function Nomad(game,player){
  this.choice=0;
  this.game=game;
  this.player=player;
}

Nomad.prototype.play = function(){
  $("#nomadModal").modal("hide");
  this.choice=Math.floor(Math.random()*2);
  var answer = this.choice;

  if(answer==0){
    $("#console").empty(); 
    $("#console").append("You win the bet! The cyborg opens a wormhole to a further point, 15 miles away.");
    this.player.milesTravelled+=15;
    this.player.status();
    
  } else {
    $("#console").empty(); 
    $("#console").append("You lose the bet! You give the cyborg some water and he leaves.");
    this.player.water-=1;
    this.player.status();
    
  }

}

Nomad.prototype.bet = function(){
  //var askToPlay = prompt("You find a cyborg nomad wandering across the dunes. He offers you a bet.\nHe'll flip a coin. If the result is 'tails', he'll open a wormhole which will make you advance 15 miles.\nIf it's 'heads', you have to give him some water.\nDo you want to play?\nY-Yes\nN-No")
$("#nomadModal").modal("show");
 
}