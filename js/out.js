/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(1);
var Coin = __webpack_require__(2);


//G A M E CONSTRUCTOR
function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        this.visibleFurry = document.querySelector(".furry");
        if(this.visibleFurry !== null) {
            this.visibleFurry.classList.remove('furry');
        }
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x++;
        } else if (this.furry.direction === "left") {
            this.furry.x--;
        } else if (this.furry.direction === "up") {
            this.furry.y--;
        } else if (this.furry.direction === "down") {
            this.furry.y++;
        }
        this.showFurry();
        this.gameOver();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.furry.direction = "left";
                break;
            case "ArrowRight":
                this.furry.direction = "right";
                break;
            case "ArrowUp":
                this.furry.direction = "up";
                break;
            case "ArrowDown":
                this.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            var scoreTable = document.querySelector("#score strong");
            scoreTable.innerText = this.score;
            this.coin = new Coin;
            theGame.showCoin();
        }
    };

    this.gameOver = function(){
        if((this.furry.x < 0 || this.furry.x > 9) || (this.furry.y < 0 || this.furry.y > 9)){
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var showOver = document.getElementById("over");
            showOver.classList.remove("invisible");
            var showScore = document.querySelector("#over span");
            showScore.innerText = this.score;
            return true;
        }
        return false;
    };

    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };

    this.clear = function(){
        for(var i = 0; i < this.board.length; i++){
            this.board[i].className = "";
        }
    }

}



var theGame = new Game();

var startSection = document.querySelector(".startSection");
var startButton = document.querySelector(".startButton");

startButton.addEventListener("click", function(){
    startSection.classList.add("invisible");
    theGame.showFurry();
    theGame.showCoin();
    theGame.startGame();
});

var playAgain = document.querySelector("#over button");
playAgain.addEventListener("click", function() {
    document.querySelector("#over").classList.add("invisible");
    theGame.clear();
    theGame = new Game();
    theGame.showFurry();
    theGame.showCoin();
    theGame.startGame();
});


document.addEventListener('keydown', function (event) {
    console.log(event);
    theGame.turnFurry(event);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

//F U R R R Y CONSTRUCTOR
function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Furry;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

//C O I N CONSTRUCTOR
function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;

/***/ })
/******/ ]);