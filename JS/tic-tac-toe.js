const cW = 375, cH = 667;

function setup() {
   let canvas = createCanvas(cW, cH);
   canvas.id("tic-tac-toe-canvas");

   /* // Creates a score container with a score element in paragraph
   let scoreContainer = createDiv("Score: ");
   scoreContainer.id("score-container");
   let scoreSpan = createP("0");
   scoreSpan.id("score"); */
}

const color = {
   Black:'#000',
   Navy:'#000080',
   Blue:'#0000FF',
   Green:'#008000',
   Aqua:'#00FFFF',
   MidnightBlue:'#191970',
   DarkSlateGrey:'#2F4F4F',
   Indigo:'#4B0082',
   DimGrey:'#696969',
   Maroon:'#800000',
   Purple:'#800080',
   DarkRed:'#8B0000',
   SaddleBrown:'#8B4513',
   Sienna:'#A0522D',
   Brown:'#A52A2A',
   DarkGray:'#A9A9A9',
   FireBrick:'#B22222',
   DarkGoldenRod:'#B8860B',
   Silver:'#C0C0C0',
   Chocolate:'#D2691E',
   Tan:'#D2B48C',
   LightGray:'#D3D3D3',
   GoldenRod:'#DAA520',
   Gainsboro:'#DCDCDC',
   Violet:'#EE82EE',
   LightCoral:'#F08080',
   Beige:'#F5F5DC',
   WhiteSmoke:'#F5F5F5',
   GhostWhite:'#F8F8FF',
   Red:'#FF0000',
   Magenta:'#FF00FF',
   DeepPink:'#FF1493',
   Orange:'#FFA500',
   Pink:'#FFC0CB',
   Gold:'#FFD700',
   Moccasin:'#FFE4B5',
   Snow:'#FFFAFA',
   Yellow:'#FFFF00',
   White:'#FFF'
};

var pTurn = 0, nCols = 3, nRows = 3, winner = -1, tie = 0; winLine = 0, restartT = 0;
// var SYMBOLS = ["O", "X"];
var SYMBOLS = ["🐶", "😾"];
var score = [0, 0];

var tiles = [];

var checkWin = function() {
   for (let i = 0; i < 9; i++) {
      if (tiles[i].label !== "") { tie++; }
   }

   if (tiles[0].label !== "" && tiles[0].label === tiles[1].label && tiles[0].label === tiles[2].label) {
      (tiles[0].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 1;
   } else if (tiles[3].label !== "" && tiles[3].label === tiles[4].label && tiles[3].label === tiles[5].label) {
      (tiles[3].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 2;
   } else if (tiles[6].label !== "" && tiles[6].label === tiles[7].label && tiles[6].label === tiles[8].label) {
      (tiles[6].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 3;
   } else if (tiles[0].label !== "" && tiles[0].label === tiles[3].label && tiles[0].label === tiles[6].label) {
      (tiles[0].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 4;
   } else if (tiles[1].label !== "" && tiles[1].label === tiles[4].label && tiles[1].label === tiles[7].label) {
      (tiles[1].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 5;
   } else if (tiles[2].label !== "" && tiles[2].label === tiles[5].label && tiles[2].label === tiles[8].label) {
      (tiles[2].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 6;
   } else if (tiles[0].label !== "" && tiles[0].label === tiles[4].label && tiles[0].label === tiles[8].label) {
      (tiles[0].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 7;
   } else if (tiles[6].label !== "" && tiles[6].label === tiles[4].label && tiles[6].label === tiles[2].label) {
      (tiles[6].label === "🐶") ? winner = 0 : winner = 1;
      winLine = 8;
   } else if (tie === 9) {
      winner = 2;
   } else {
      tie = 0;
   }

   // updates score
   if (winner === 0 || winner === 1) { score[winner]++; };
}

var Tile = function(x, y) {
   this.x = x;
   this.y = y + 277;
   this.size = cW / nCols - 7;
   this.label = "";
};

Tile.prototype.draw = function() {
   fill(color.Black);
   strokeWeight(3);
   rect(this.x, this.y, this.size, this.size, 11);
   textSize(79);
   textAlign(CENTER, CENTER);
   fill(color.DarkGoldenRod);
   text(this.label, this.x + this.size / 2, this.y + this.size / 2 + 2);
};

Tile.prototype.empty = function() {
   return this.label === "";
};

Tile.prototype.onClick = function() {
   // if tile not empty, exit
   if (!this.empty()) { return; }
   // put player's symbol
   this.label = SYMBOLS[pTurn];

   checkWin();
   
   // change turn
   (pTurn) ? pTurn = 0 : pTurn = 1;

   // if there is a winner, exit
   if (winner !== -1) { return; }

   // VS PC mode. Comment for 2 player mode
   if (pTurn) { pcTurn(); }
};

Tile.prototype.handleMouseClick = function(x, y) {
   // check for mouse click inside the tile
   if (x >= this.x && x <= this.x + this.size &&
       y >= this.y && y <= this.y + this.size) {
      this.onClick();
   }
};

// Creates tiles
for (let i = 0; i < nCols; i++) {
   for (let j = 0; j < nRows; j++) {
      tiles.push(new Tile(i * (cW / nCols + 3), j * (cW / nRows + 3)));
   }
}

// Draws header and score board
var drawScoreBoard = function() {
   fill(color.GoldenRod);
   textFont('Rockwell', 47);
   stroke(color.Black);
   strokeWeight(5);
   strokeJoin(ROUND);
   text("Tic-tac-toe!", width / 2, 37);
   fill(color.Black);
   noStroke();
   textSize(19);
   text("Dog: " + score[0], 37, 89);
   text("Cat: " + score[1], 337, 89);
   text("Turn: " + SYMBOLS[pTurn], cW / 2, 89);
}

var drawTiles = function() {
   for (let i in tiles) {
      tiles[i].draw();
   }
}

mouseReleased = function() {
   for (let i in tiles) {
      tiles[i].handleMouseClick(mouseX, mouseY);
   }
}

var pcTurn = function() {
   while (pTurn) {
      let r = Math.floor(Math.random() * 9);
      tiles[r].onClick();
   }
}

var drawWin = function() {
   stroke(color.FireBrick);
   strokeWeight(11);
   
   switch (winLine) {
      case 1:
         line(cW * 0.16, cH * 0.47, cW * 0.16, cH * 0.93);
         break;
      case 2:
         line(cW * 0.5, cH * 0.47, cW * 0.5, cH * 0.93);
         break;
      case 3:
         line(cW * 0.84, cH * 0.47, cW * 0.84, cH * 0.93);
         break;
      case 4:
         line(cW * 0.09, cH * 0.51, cW * 0.91, cH * 0.51);
         break;
      case 5:
         line(cW * 0.09, cH * 0.70, cW * 0.91, cH * 0.70);
         break;
      case 6:
         line(cW * 0.09, cH * 0.89, cW * 0.91, cH * 0.89);
         break;
      case 7:
         line(cW * 0.13, cH * 0.49, cW * 0.87, cH * 0.91);
         break;
      case 8:
         line(cW * 0.87, cH * 0.49, cW * 0.13, cH * 0.91);
         break;
      default:
         break;
   }

   strokeJoin(MITER);
   textSize(61);
   (winner === 2) ? text("It's a tie", cW / 2, 191) : text(SYMBOLS[winner] + "Wins", cW / 2, 191);
}

var restartGame = function() {
   pTurn = 0;
   winner = -1;
   tie = 0;
   winLine = 0;
   restartT = 0;
   for (let i in tiles) { tiles[i].label = ""; }
   noStroke();
}

function draw() {
   background(color.DimGrey);
   drawScoreBoard();
   drawTiles();
   if (winner === -1) {
      checkWin();
   } else {
      drawWin();
      if (restartT++ === 131) { restartGame(); }
   }
}