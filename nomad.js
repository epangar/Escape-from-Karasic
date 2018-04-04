//Constructor for Nomad
function Nomad(){
  this.choice=0;
}

Nomad.prototype.play = function(){
  this.choice=Math.floor(Math.random()*2);
  var answer = this.choice;

  if(answer==0){
    console.log("You win!");
  } else {
    console.log("You lose!")
  }

}

Nomad.prototype.bet = function(){
  var askToPlay = prompt("You find a cyborg nomad wandering across the dunes. He offers you a bet.\nHe'll flip a coin. If the result is 'tails', he'll open a wormhole which will make you advance 15 miles.\nIf it's 'heads', you have to give him some water.\nDo you want to play?\nY-Yes\nN-No")

  if (askToPlay=="y"||askToPlay=="Y"){
    this.play();
  } else if(askToPlay=="n"||askToPlay=="N") {
    alert("The cyborg nomad shrugs and leaves.")
  } else {
    alert("Sorry, human. I don't understand.");
    this.bet();
  }
}