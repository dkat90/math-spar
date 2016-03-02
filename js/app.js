$(document).ready(function () {
  function Game () {
    this.x = null;
    this.y = null;
    this.operator = null;
    this.solution = null;
    this.player = 1;
    var player1Lives = 3;
    var player2Lives = 3;

    function getRandomNumber (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }// random number to generate for operators

    this.displayPlayerLives = function () {
      $("#oneLives").text("Player 1: " + player1Lives);
      $("#twoLives").text("Player 2: " + player2Lives);
    }// displays player lives

    this.reducePlayerLives= function(){
        console.log(this.player)
        console.log("Reduce player lives works!")
        if (this.player === 1) {
          player1Lives = player1Lives - 1;
          $("#oneLives").text("Player 1: " + player1Lives);
          console.log("Player 1 Lives Reduced!")
        } else if (this.player === 2) {
          player2Lives = player2Lives - 1;
          $("#twoLives").text("Player 2: " + player2Lives);
          console.log("Player 2 Lives Reduced!")
        }
      }//function to reduce player lives when they get a question wrong

    this.displayPlayer = function() {
      if(this.player === 1){
      $('#playerTurn').text("It's Player 1's turn!");
    } else if (this.player === 2) {
      $('#playerTurn').text("It's Player 2's turn!");
    }
  }//displays the players turn on the equation area

    this.changePlayer = function() {
      if (this.player === 1) {
        return (this.player = 2);
      } else if(this.player === 2) {
        return (this.player = 1);
      }//changes player internally
    }

    this.setValues = function (min, max) {
      this.x = Math.floor(Math.random() * (max - min)) + min;
      this.y = Math.floor(Math.random() * (max - min)) + min;
    } //setting values of x and y

    this.selectOperator = function () {
      var choice = getRandomNumber(0, 3);
      console.log(choice)
      switch (choice) {
        case 0:
          this.operator = '+'
          break;
        case 1:
          this.operator = '-'
          break;
        case 2:
          this.operator = '*'
          break;
        case 3:
          this.operator = '/'
          break;
        default:
      }
    }

    this.solveEquation = function () {
      this.solution = eval(this.x + this.operator + this.y);
    }

    this.getUserInput = function () {
      return Number($('#playerInput').val());
    }

    this.checkUserInput = function (userInput) {
      console.log(this)
      console.log(userInput, this.solution);
      console.log(typeof userInput, typeof this.solution);
      if (userInput === this.solution) {
        return true;
      } else {
      return false;
      }
    }
    this.displayEquation = function() {
      console.log("display function works!")
      $('#valueX').text(this.x);
      $('#operator').text(this.operator);
      $('#valueY').text(this.y);
      console.log(game)
      console.log(this.x + ' ' + this.operator + ' ' + this.y + ' = ' + this.solution)
    }

    this.getResult = function(event) {
      var userInput = this.getUserInput()
      var result = this.checkUserInput(userInput)
      console.log(result)
      console.log(typeof result)
      if (result) {
        $('#aBoxOne').text('Whoa!Your math rocks!');
        this.start();
      } else {
        $('#aBoxOne').text('Whoa!Your math stinks! Lose a life!');
        console.log(this.player)
        this.reducePlayerLives();
        this.start();
        console.log("Player1lives = " + player1Lives);
        console.log("Player2Lives = " + player2Lives);
      }
    }//get results

    this.clearAnswer =function () {
      $('#playerInput').val("")
      }// clears the board after each time after enter is pressed

    this.checkForWinner= function (){
      if(player1Lives === 0) {
        window.alert("Player 1..YOU LOSE!")
      } else if (player2Lives === 0) {
        window.alert("Player 2...YOU LOSE!")
      }
    }

    this.enterEventHandler = function (event) {
      if (event.keyCode === 13) {
        console.log(this)
        event.preventDefault()
        this.getResult()
        this.changePlayer();
        this.displayPlayer();
        this.displayPlayerLives();
        this.clearAnswer();
        this.checkForWinner();
        console.log("This is the " + this.player)
      }
    }

    this.start = function () {
      this.setValues(1, 20);
      this.selectOperator();
      this.solveEquation();
      this.displayEquation();
      this.displayPlayerLives();
    }
  } // Game

  var game = new Game();
  game.start();
  $('#playerInput').on('keydown', game.enterEventHandler.bind(game))
});
