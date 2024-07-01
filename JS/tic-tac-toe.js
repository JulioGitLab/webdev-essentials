function setup() {
   let canvas = createCanvas(375, 667);
   canvas.id("tic-tac-toe-canvas");
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

var pTurn = 0, nCols = 3, nRows = 3, cWidth = 379, cHeight = 379, wLine = 0;
// var SYMBOLS = ["O", "X"];
var SYMBOLS = ["🐶", "😾"];

var tiles = [];

var checkWin = function() {
   if (wLine === 0) {
      if (tiles[0].label !== "" && tiles[0].label === tiles[1].label && tiles[0].label === tiles[2].label) {
         wLine = 1;
      } else if (tiles[3].label !== "" && tiles[3].label === tiles[4].label && tiles[3].label === tiles[5].label) {
         wLine = 2;
      } else if (tiles[6].label !== "" && tiles[6].label === tiles[7].label && tiles[6].label === tiles[8].label) {
         wLine = 3;
      } else if (tiles[0].label !== "" && tiles[0].label === tiles[3].label && tiles[0].label === tiles[6].label) {
         wLine = 4;
      } else if (tiles[1].label !== "" && tiles[1].label === tiles[4].label && tiles[1].label === tiles[7].label) {
         wLine = 5;
      } else if (tiles[2].label !== "" && tiles[2].label === tiles[5].label && tiles[2].label === tiles[8].label) {
         wLine = 6;
      } else if (tiles[0].label !== "" && tiles[0].label === tiles[4].label && tiles[0].label === tiles[8].label) {
         wLine = 7;
      } else if (tiles[6].label !== "" && tiles[6].label === tiles[4].label && tiles[6].label === tiles[2].label) {
         wLine = 8;
      }
   } else {
      stroke(color.FireBrick);
      strokeWeight(11);

      switch (wLine) {
         case 1:
            line(cWidth * 0.16, cHeight * 0.09, cWidth * 0.16, cHeight * 0.91);
            break;
         case 2:
            line(cWidth * 0.5, cHeight * 0.09, cWidth * 0.5, cHeight * 0.91);
            break;
         case 3:
            line(cWidth * 0.84, cHeight * 0.09, cWidth * 0.84, cHeight * 0.91);
            break;
         case 4:
            line(cWidth * 0.09, cHeight * 0.15, cWidth * 0.91, cHeight * 0.15);
            break;
         case 5:
            line(cWidth * 0.09, cHeight * 0.5, cWidth * 0.91, cHeight * 0.5);
            break;
         case 6:
            line(cWidth * 0.09, cHeight * 0.83, cWidth * 0.91, cHeight * 0.83);
            break;
         case 7:
            line(cWidth * 0.13, cHeight * 0.13, cWidth * 0.87, cHeight * 0.87);
            break;
         case 8:
            line(cWidth * 0.87, cHeight * 0.13, cWidth * 0.13, cHeight * 0.87);
            break;
         default:
            break;
      }
   }
}

var Tile = function(x, y) {
   this.x = x;
   this.y = y;
   this.size = cWidth / nCols;
   this.label = "";
};

Tile.prototype.draw = function() {
   fill(color.Black);
   strokeWeight(3);
   rect(this.x, this.y, this.size - 7, this.size - 7, 11);
   textSize(79);
   textAlign(CENTER, CENTER);
   fill(color.DarkGoldenRod);
   text(this.label, this.x + this.size / 2 - 5, this.y + this.size / 2 + 3);
};

Tile.prototype.empty = function() {
   return this.label === "";
};

Tile.prototype.onClick = function() {
   // if tile not empty, exit
   if (!this.empty()) { return; }
   // put player's symbol
   this.label = SYMBOLS[pTurn];
   // change turn
   (pTurn) ? pTurn = 0 : pTurn = 1;
   /* // change turn alternative
   pTurn++;
   if (pTurn >= SYMBOLS.length) { pTurn = 0; } */
};

Tile.prototype.handleMouseClick = function(x, y) {
   // check for mouse click inside the tile
   if (x >= this.x && x <= this.x + this.size &&
       y >= this.y && y <= this.y + this.size) {
      this.onClick();
   }
};

for (let i = 0; i < nCols; i++) {
   for (let j = 0; j < nRows; j++) {
      tiles.push(new Tile(i * (cWidth / nCols + 2), j * (cHeight / nRows + 2)));
   }
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

function draw() {
   background(color.DimGrey);
   drawTiles();
   checkWin();
}