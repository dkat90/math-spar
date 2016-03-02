function init() {
$('button').on('click', gameStart);
// $('button').on('click', easyX);
//do i even need the easyX button?
//game starts on click
function gameStart() {
  var player = 0;
  var winner = 0;
  var x = Math.floor((Math.random()* 10) + 1);
  var y = Math.floor((Math.random()*10) + 1);
  var result;
  console.log("Game starts now!");
  console.log(x);
  console.log(y);
  // var divide =  x / y;
  // var addition = x + y;
  // var subtraction = x - y;
  // var multiplication = x * y;
  // console.log(x);
  // console.log(y);
  // console.log(divide);
  // console.log(addition);
  // console.log(subtraction);
  // console.log(multiplication);
  function equation() {
    var equation = Math.random();
    if(equation <= 0.25 && equation >= 0) {
      var addition = x + y;
      return addition;
    }
      else if (equation <= 0.5 && equation >= 0.26) {
        var subtraction = x - y;
        return subtraction;
      }
      else if (equation <= 0.75 && equation >=0.51) {
        var multiplication = (x * y);
        return multiplication;
      }
      else if (equation <= 1 && equation >=0.76) {
        var division = x / y;
        return division;
      }
  }

      console.log(equation());
var input = $('input[type="submit"]')
input.keydown(function (e) {
  console.log(e)
  console.log(input.value)
})

  // function playerAnswer() {
  //   if ($('<form>').text() = addition || subtraction ||  multiplication || division) {
  //     window.alert("Well done!")
  //   }
  //

  }
  function reducePlayerLives(){
      console.log(game.player)
      console.log("Reduce player lives works!")
      if (game.player === 1) {
        player1Lives = player1Lives - 1;
        $("#oneLives").text("Player 1: " + player1Lives);
        console.log("Player 1 Lives Reduced!")
      } else if (game.player === 2) {
        player2Lives = player2Lives - 1;
        $("#twoLives").text("Player 2: " + player2Lives);
        console.log("Player 2 Lives Reduced!")
      }
    }//






}
window.addEventListener("load",init,false);
