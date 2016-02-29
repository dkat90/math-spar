$(document).ready(function () {
  function Game () {
    this.x = 0;
    this.y = 0;
    this.generateRandmNumbers = function (min, max) {
      this.x = Math.floor(Math.random() * (max - min)) + min;
      this.y = Math.floor(Math.random() * (max - min)) + min;
    }
    function getRandomNumber (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    this.selectOperator = function () {
      var choice = getRandomNumber(0, 3);
      var operator = null;
      console.log(choice)
      switch (choice) {
        case 0:
          operator = '+'
          break;
        case 1:
          operator = '-'
          break;
        case 2:
          operator = '*'
          break;
        case 3:
          operator = '/'
          break;
        default:
      }
      return operator
    }
    this.solveEquation = function (firstNumber, secondNumber, operator) {
      return eval(firstNumber + operator + secondNumber);
    }
    this.getUserInput = function () {
      return Number($('#playerAnswer').val());
    }
    this.checkUserInput = function (userInput, solution) {
      if (userInput === solution) {
        return true;
      } else {
      return false;
      }
    }

    this.display = function(){
      console.log("display function works!")
      $('.valueX').text(this.x);
    }
  } // Game

  var game = new Game();
  game.display();
  console.log(game)
  game.generateRandmNumbers(1, 100)
  var operator = game.selectOperator()
  var solution = game.solveEquation(game.x, game.y, operator)
  console.log(game.x + ' ' + operator + ' ' + game.y + ' = ' + solution)
  function getResult (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      var userInput = game.getUserInput()
      var result = game.checkUserInput(userInput, solution)
      if (result) {
        window.alert('You are correct')
      } else {
        window.alert('You are wrong')
      }
    }
  }
  $('<button>').on('click', game);
  $('#playerAnswer').keydown(getResult)
});
