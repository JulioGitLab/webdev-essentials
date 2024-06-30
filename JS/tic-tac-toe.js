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
}

var pTurn = 0, nCols = 3, nRows = 3, width = 503, height = 503;
var SYMBOLS = ["O", "X"];

var tiles = [];

var checkWin = function() {}; // PENDING

var Tile = function(x, y) {
   this.x = x;
   this.y = y;
   this.size = width / nCols;
   this.label = "";
};

Tile.prototype.draw = function() {
   fill(color.Black);
   strokeWeight(3);
   rect(this.x, this.y, this.size - 7, this.size - 7, 11);
   textSize(107);
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
      tiles.push(new Tile(i * (width / nCols + 2), j * (height / nRows + 2)));
   }
}

var drawTiles = function() {
   for (let i in tiles) {
      tiles[i].draw();
   }
};

mouseReleased = function() {
   for (let i in tiles) {
      tiles[i].handleMouseClick(mouseX, mouseY);
   }
};

function draw() {
   createCanvas(500, 500);
   background(color.DimGrey);
   drawTiles();
};