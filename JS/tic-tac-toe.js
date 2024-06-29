var pTurn = 0, nCols = 3, nRows = 3, width = 500, height = 500;
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
   fill('#B22222'); // FireBrick
   strokeWeight(3);
   rect(this.x, this.y, this.size, this.size, 11);
   textSize(107);
   textAlign(CENTER, CENTER);
   fill('#F5F5F5'); // WhiteSmoke
   text(this.label, this.x + this.size / 2, this.y + this.size / 2);
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
   pTurn++;

   if (pTurn >= SYMBOLS.length) { pTurn = 0; }
};

Tile.prototype.handleMouseClick = function(x, y) {
   // check for mouse click inside the tile
   if (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size) {
      this.onClick();
   }
};

for (let i = 0; i < nCols; i++) {
   for (let j = 0; j < nRows; j++) {
      tiles.push(new Tile(i * (width / nCols), j * (height / nRows)));
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
   background('#DAA520'); // GoldenRod
   drawTiles();
};