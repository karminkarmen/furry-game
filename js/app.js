var Game = require("./game.js");

var theGame = new Game();

var startSection = document.querySelector(".startSection");
var startButton = document.querySelector(".startButton");

startButton.addEventListener("click", function(){
    startSection.classList.add("invisible");
    theGame.showFurry();
    theGame.showCoin();
    theGame.startGame();
});


var playAgain = document.querySelector(".overInfo button");
playAgain.addEventListener("click", function() {
    theGame.clear();
    theGame = new Game();
    theGame.showFurry();
    theGame.showCoin();
    theGame.startGame();
    document.querySelector(".overBgc").classList.add("invisible");
});


document.addEventListener('keydown', function (event) {
    theGame.turnFurry(event);
});