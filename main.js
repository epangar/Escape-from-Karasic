$(document).ready(function() {
  var game = new Game();
    $("#noButton").click(function(){
    $("#nomadModal").modal("hide");
    $("#console").empty(); 
    $("#console").append("The cyborg nomad shrugs and leaves.")

  })

  $("#yesButton").click(function(){
    game.nomad.play();
  })

  $(".btn").click(function(){
    if($(this).hasClass("red-btn")){
      $(this).removeClass("red-btn");
    }
    
  })

});
