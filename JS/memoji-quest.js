const cW = 1920 / 2, cH = 1080 / 2;

function setup() {
   let canvas = createCanvas(cW, cH);
   canvas.id("memoji-canvas");
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

var Tile = function(x, y, face) {
   this.x = x;
   this.y = y;
   this.size = 75;
   this.face = face;
   this.faceUp = false;
   this.match = false;
};

Tile.prototype.draw = function() {
   fill(color.GoldenRod);
   strokeWeight(2);
   rect(this.x, this.y, this.size, this.size, 11);
   textSize(47);
   textAlign(CENTER, CENTER);
   if (this.faceUp) {
      text(this.face, this.x + this.size / 2, this.y + this.size / 2);
   } else {
      text("🐶", this.x + this.size / 2, this.y + this.size / 2);
   }
};

Tile.prototype.tileClick = function(x, y) {
   return x >= this.x && x <= this.x + this.size &&
          y >= this.y && y <= this.y + this.size;
};

// Global config
var N_COLS = 5, N_ROWS = 4;

// Array of all possible faces
var faces = [
   '💩','😼','😾','🐾','🐩','🐕','🐈‍⬛',
   '🦴','🏃','🤾','🩴','🥎','💉','🗞️'
   // "💩","😼","😾","🐾","🐩","🐕","🐈‍⬛",
   // "🦴","🏃","🤾","🩴","🥎","💉","🗞️"
];

var hit = [
   "Well done!","Great job!","Nice one!","Impressive!","Keep it up!",
   "Nicely done!","Excellent shot!","Bullseye!","Fantastic!","Way to go!",
   "Bravo!","Superb!","Incredible!","Magnificent!","That was pure skill!",
   "Wow!","Great move!","You're on a roll!","Well played!"
];

var miss = [
   "Keep trying","That's ok","Learn from this miss","No worries",
   "It happens to the best of us","You'll get the next one",
   "Better luck next time","You're still doing great",
   "Missed it by that much!","You'll nail it next round","Oops",
   "We all miss sometimes","Try again","It's not the end of the world",
   "Don't let one mistake let you down!","You're close",
   "Don't give up!","You're almost there!","Keep pushing!"
];

var selected = [];

// Makes an array which has 2 of each faces, then randomizes it
var randomArray = function(arr) {
   let possibleFaces = arr.slice(0);
   selected = [];

   for (let i = 0; i < (N_COLS * N_ROWS) / 2; i++) {
      // Randomly picks one from the array of remaining faces
      // let rInd = floor(random(possibleFaces.length));
      let rInd = Math.floor(Math.random() * possibleFaces.length);
      let face = possibleFaces[rInd];
      // Pushes twice onto array
      selected.push(face);
      selected.push(face);
      // Removes from array
      possibleFaces.splice(rInd, 1);
   }
}
randomArray(faces);

// Now shuffles the elements of that array
var shuffleArray = function(arr) {
   let counter = arr.length;

   // While there are elements
   while (counter > 0) {
      // Picks a random index
      let ind = Math.floor(Math.random() * counter);
      counter--;
      // Swaps the last element with it
      let temp = arr[counter];
      arr[counter] = arr[ind];
      arr[ind] = temp;
   }
}
shuffleArray(selected);

// Creates the tiles
var tiles = [];
var createTiles = function() {
   tiles = [];

   for (let i = 0; i < N_COLS; i++) {
      for (let j = 0; j < N_ROWS; j++) {
         let tileX = i * 83 + 270;
         let tileY = j * 83 + 100;
         let tileFace = selected.pop();
         tiles.push(new Tile(tileX, tileY, tileFace));
      }
   }
}
createTiles();

// restartBtn

// drawBtn

// btnClick

var nTries = 0, nMatches = 0;
var flippedTiles = [];
var delayStartFC = null;
// hit_miss, rHit, rMiss

// restartGame

mouseClicked = function() {
// function mouseClicked() {
   for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];

      if (tile.tileClick(mouseX, mouseY)) {
         if (flippedTiles.length < 2 && !tile.faceUp) {
            tile.faceUp = true;
            flippedTiles.push(tile);

            if (flippedTiles.length === 2) {
               nTries++;

               if (flippedTiles[0].face === flippedTiles[1].face) {
                  flippedTiles[0].match = true;
                  flippedTiles[1].match = true;
                  flippedTiles.length = 0;
                  nMatches++;
                  // hit_miss, rHit
               } // else hit_miss, rMiss

               delayStartFC = frameCount;
            }
         }
         loop();
      }
   }

   // if btnClick
}

function draw() {
   background(color.Navy);

   // drawBtn

   if (delayStartFC && (frameCount - delayStartFC) > 31) {
      for (let i = 0; i < tiles.length; i++) {
         let tile = tiles[i];
         if (!tile.match) { tile.faceUp = false; }
      }

      flippedTiles = [];
      delayStartFC = null;
      noLoop();
   }

   for (let i = 0; i < tiles.length; i++) { tiles[i].draw(); }

   // Shows motivational text

   if (nMatches === tiles.length / 2) {
      fill(color.Black);
      textSize(23);
      text("Completed in " + nTries + " tries!", cW / 2, cH - 61);
   }

   // Shows current frame count and tries
   fill(color.Black);
   textSize(11);
   text("FC: " + frameCount + "\tTries: " + nTries, 53, cH - 17);
}

noLoop(); // ??