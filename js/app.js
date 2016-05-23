$(document).ready(function () {
  function Game () {
    this.x = null;
    this.y = null;
    this.operator = null;
    this.solution = null;
    this.player = 1;
    var player1Lives = 3;
    var player2Lives = 3;
    var gintervalId = null;
    var gseconds = 6;

    this.startTimer =function() {
      console.log("timer start")
      if(gintervalId === null) {
      gintervalId = window.setInterval(this.updateTime.bind(this), 1000)
      }
    }// starts the countdown timer

    this.resetTimer=function(){
      console.log(gintervalId);
      gseconds = 6;
    }//resets timer once clicked

    this.updateTime=function() {
      console.log(this)
      if (gseconds <= 0) {
        window.clearInterval(gintervalId)
        gintervalId = null;
        this.nextPlayersTurn();
        return
      } else {
        console.log("timer is counting down")
        gseconds = gseconds - 1;
        $('#watch').text(gseconds).css('fontSize', '30px');
      }
    }// updates the time countdown from 5 deducting 1 every second

    this.displayPlayerLives = function () {
      $("#oneLives").text("Player 1: " + player1Lives);
      $("#twoLives").text("Player 2: " + player2Lives);
    }// displays player lives

    this.reducePlayerLives= function(){
        if (this.player === 1) {
          player1Lives = player1Lives - 1;
          this.displayPlayerLives();
        } else if (this.player === 2) {
          player2Lives = player2Lives - 1;
          this.displayPlayerLives();
        }
      }//function to reduce player lives when they get a question wrong

    this.displayPlayer = function() {
      if(this.player === 1){
      $('#playerTurn').text("It's Player 1's turn!").css("color","#044581");
    } else if (this.player === 2) {
      $('#playerTurn').text("It's Player 2's turn!").css("color","#B22222");
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

    function getRandomNumber (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }// random number to generate for operators

    function randomMultiplesofThree(){
      return Math.floor(getRandomNumber(0, 50) * 3);
    }
    //generates random multiples of three

    function randomMultiplesofTwo(){
      return Math.floor(getRandomNumber(0, 50) * 2);
    }
    // generates random multiples of twoLives

    this.selectOperator = function () {
      var choice = getRandomNumber(0, 3);
      switch (choice) {
        case 0:
          this.operator = '+';
          break;
        case 1:
          this.operator = '-';
          break;
        case 2:
          this.operator = '*';
          this.x = Math.floor((Math.random() * 14) + 1);
          this.y = Math.floor((Math.random() * 14) + 1);
          break;
          // changes x and y varibales range from 50 to 14 of it is "*"
        case 3:
          this.operator = '/';
          var divisionChoice = getRandomNumber(0, 1);
          switch(divisionChoice){
            case 0:
            this.x = randomMultiplesofThree();
            if (this.x%3 === 0 && this.x%6 !== 0 && this.x%9 !== 0  ){
              this.y = 3;
            } else if (this.x>=6 && this.x%6 === 0){
              this.y = 6;
            } else if (this.x>=9 && this.x%9 === 0){
              this.y = 9;
            }
            break;
            //in this case adds logic for multples of 3 to be divided by either 3,6 or 9

            case 1:
            this.x = randomMultiplesofTwo();
            if (this.x%2 === 0 && this.x%4 !== 0 & this.x%6 !== 0){
              this.y = 2;
            } else if (this.x>=4 && this.x%4 === 0){
              this.y = 4;
            } else if (this.x>=6 && this.x%6 === 0){
              this.y = 6;
            }
            break;
              //in this case adds logic for multples of 2 to be divided by either 2,4 or 6
          }
          break;
        default:
      }
    };// chooses arithmetic operators to use

    this.solveEquation = function () {
        this.solution = Math.round((eval(this.x + this.operator + this.y)) * 10) / 10;
    }; //evaluates equations

    this.getUserInput = function () {
      return Number($('#playerInput').val());
    }//returns players input

    this.checkUserInput = function (userInput) {
      if (userInput === this.solution) {
        return true;
      } else {
      return false;
      }
    }// checks user input against solved equation

    this.displayEquation = function() {
      $('#valueX').text(this.x);
      $('#operator').text(this.operator);
      $('#valueY').text(this.y);
    }//displays equation for player to solve

    this.getResult = function(event) {
      var userInput = this.getUserInput()
      var result = this.checkUserInput(userInput)
      if (result) {
        $('#aBoxOne').text('Whoa!Your math rocks!');
        this.start();
      } else {
        $('#aBoxOne').text('Whoa!Your math stinks! Lose a life!');
        this.reducePlayerLives();
        this.start();
      }
    }//get results see who wins or loses

    this.clearAnswer =function () {
      $('#playerInput').val("")
      }// clears the board after each time after enter is pressed

    this.checkForWinner= function (){
      if(player1Lives === 0) {
        window.alert("Player 1..YOU LOSE!")
      } else if (player2Lives === 0) {
        window.alert("Player 2...YOU LOSE!")
      }
    }//displays loser message!

    this.nextPlayersTurn = function () {
      this.getResult()
      this.changePlayer();
      this.displayPlayer();
      this.displayPlayerLives();
      this.clearAnswer();
      this.checkForWinner();
      this.startTimer();
      this.resetTimer();
    }

    this.enterEventHandler = function (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.nextPlayersTurn();
      }
    }// on "enter" fires all functions and commences the game

    this.start = function () {
      this.setValues(1, 50);
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
