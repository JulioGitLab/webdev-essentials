const cW = 1920 / 2,
  cH = 1080 / 2;

function setup() {
  let canvas = createCanvas(cW, cH);
  canvas.id("canvas-mt-2vh");
  frameRate(50);
}

const color = {
  Black: "#000",
  Navy: "#000080",
  Blue: "#0000FF",
  Green: "#008000",
  Aqua: "#00FFFF",
  MidnightBlue: "#191970",
  DarkSlateGrey: "#2F4F4F",
  Indigo: "#4B0082",
  DimGrey: "#696969",
  Maroon: "#800000",
  Purple: "#800080",
  DarkRed: "#8B0000",
  SaddleBrown: "#8B4513",
  Sienna: "#A0522D",
  Brown: "#A52A2A",
  DarkGray: "#A9A9A9",
  FireBrick: "#B22222",
  DarkGoldenRod: "#B8860B",
  Silver: "#C0C0C0",
  Chocolate: "#D2691E",
  Tan: "#D2B48C",
  LightGray: "#D3D3D3",
  GoldenRod: "#DAA520",
  Gainsboro: "#DCDCDC",
  Violet: "#EE82EE",
  LightCoral: "#F08080",
  Beige: "#F5F5DC",
  WhiteSmoke: "#F5F5F5",
  GhostWhite: "#F8F8FF",
  Red: "#FF0000",
  Magenta: "#FF00FF",
  DeepPink: "#FF1493",
  Orange: "#FFA500",
  Pink: "#FFC0CB",
  Gold: "#FFD700",
  Moccasin: "#FFE4B5",
  Snow: "#FFFAFA",
  Yellow: "#FFFF00",
  White: "#FFF"
};

const Tile = function (x, y, face) {
  this.x = x;
  this.y = y;
  this.size = 97;
  this.face = face;
  this.faceUp = false;
  this.match = false;
};

Tile.prototype.draw = function () {
  fill(color.GoldenRod);
  strokeWeight(3);
  rect(this.x, this.y, this.size, this.size, 11);
  textSize(67);
  textAlign(CENTER, CENTER);
  if (this.faceUp) {
    text(this.face, this.x + this.size / 2, this.y + this.size / 2 + 5);
  } else {
    text("🐶", this.x + this.size / 2, this.y + this.size / 2 + 5);
  }
};

Tile.prototype.tileClick = function (x, y) {
  return (
    x >= this.x &&
    x <= this.x + this.size &&
    y >= this.y &&
    y <= this.y + this.size
  );
};

// Global config
const N_COLS = 5,
  N_ROWS = 4;

// All possible faces
const faces = [
  "💩",
  "😼",
  "😾",
  "🐾",
  "🐩",
  "🐕",
  "🐈‍⬛",
  "🦴",
  "🏃",
  "🤾",
  "🩴",
  "🥎",
  "💉",
  "🗞️"
];

// All possible hit phrases
const hit = [
  "Well done!",
  "Great job!",
  "Nice one!",
  "Impressive!",
  "Keep it up!",
  "Nicely done!",
  "Excellent shot!",
  "Bullseye!",
  "Fantastic!",
  "Way to go!",
  "Bravo!",
  "Superb!",
  "Incredible!",
  "Magnificent!",
  "That was pure skill!",
  "Wow!",
  "Great move!",
  "You're on a roll!",
  "Well played!"
];

// All possible miss phrases
const miss = [
  "Keep trying",
  "That's ok",
  "Learn from this miss",
  "No worries",
  "It happens to the best of us",
  "You'll get the next one",
  "Better luck next time",
  "You're still doing great",
  "Missed it by that much!",
  "You'll nail it next round",
  "Oops",
  "We all miss sometimes",
  "Try again",
  "It's not the end of the world",
  "Don't let one mistake let you down!",
  "You're close",
  "Don't give up!",
  "You're almost there!",
  "Keep pushing!"
];

let selected = [];

// Makes an array which has 2 of each faces, then randomizes it
const randomArray = function (arr) {
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
};
randomArray(faces);

// Now shuffles the elements of that array
const shuffleArray = function (arr) {
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
};
shuffleArray(selected);

// Creates the tiles
let tiles = [];
const createTiles = function () {
  tiles = [];

  for (let i = 0; i < N_COLS; i++) {
    for (let j = 0; j < N_ROWS; j++) {
      let tileX = i * 103 + 223;
      let tileY = j * 103 + 79;
      let tileFace = selected.pop();
      tiles.push(new Tile(tileX, tileY, tileFace));
    }
  }
};
createTiles();

// Restart button
const restartBtn = {
  x: cW - 97,
  y: 19,
  width: 71,
  height: 31,
  label: "Restart"
};

const drawBtn = function (btn) {
  fill(color.Silver);
  stroke(color.Black);
  strokeWeight(3);
  rect(btn.x, btn.y, btn.width, btn.height, 7);
  fill(color.Black);
  noStroke();
  textSize(17);
  // textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
};

const btnClick = function (btn) {
  return (
    mouseX >= btn.x &&
    mouseX <= btn.x + btn.width &&
    mouseY >= btn.y &&
    mouseY <= btn.y + btn.height
  );
};

let nTries = 0,
  nMatches = 0;
let flippedTiles = [];
let delayStartFC = null;
let hit_miss = 0;
let rHit = null,
  rMiss = null;

const restartGame = function () {
  nTries = 0;
  nMatches = 0;
  flippedTiles.length = 0;
  delayStartFC = null;
  hit_miss = 0;
  randomArray(faces);
  shuffleArray(selected);
  createTiles();
};

mouseClicked = function () {
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
            hit_miss = 2;
            // rHit = floor(random(hit.length));
            rHit = Math.floor(Math.random() * hit.length);
          } else {
            hit_miss = 1;
            // rMiss = floor(random(miss.length));
            rMiss = Math.floor(Math.random() * miss.length);
          }

          delayStartFC = frameCount;
        }
      }
      loop();
    }
  }

  // Restarts game
  if (btnClick(restartBtn)) {
    restartGame();
    loop();
  }
};

function draw() {
  background(color.Navy);

  drawBtn(restartBtn);

  // Header
  fill(color.GoldenRod);
  textFont("Rockwell", 47);
  stroke(color.Black);
  strokeWeight(5);
  strokeJoin(ROUND);
  text("Memoji Quest!", cW / 2, cH * 0.07);
  noStroke();

  if (delayStartFC && frameCount - delayStartFC > 23) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      if (!tile.match) {
        tile.faceUp = false;
      }
    }

    flippedTiles = [];
    delayStartFC = null;
    noLoop();
  }

  stroke(color.Black);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].draw();
  }
  noStroke();

  // Shows motivational text
  if (hit_miss === 1) {
    textSize(23);
    text(miss[rMiss], width / 2, cH * 0.95);
  } else if (hit_miss === 2) {
    textSize(23);
    text(hit[rHit], width / 2, cH * 0.95);
  }

  if (nMatches === tiles.length / 2) {
    textSize(29);
    text("Completed in\n" + nTries + " tries!", cW * 0.88, cH * 0.92);
  } else {
    fill(color.Black);
    textSize(17);
    text("Tries: " + nTries, cW - 53, cH - 17);
  }

  // Shows current frame count
  fill(color.Black);
  textSize(13);
  text("FC: " + frameCount, 53, cH - 17);
}

noLoop(); // ??