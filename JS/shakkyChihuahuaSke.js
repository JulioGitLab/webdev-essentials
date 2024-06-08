/* Sketch code for the shakkyChihuahuaOO.html file */
function setup() {
   createCanvas(window.innerWidth, 500);
   frameRate(60);
};

var Chihuahua = function(x,y) {
   this.x = x;
   this.y = y;
   this.toys = 0;
   this.scare = 0;
};

Chihuahua.prototype.draw = function() {
   this.y = constrain(this.y, 130, height - 30);
   fill('#DAA520'); // GoldenRod
   stroke('#B8860B'); // DarkGoldenRod
   strokeWeight(1);
   // Paws
   ellipse(this.x - 13, this.y + 11, 11, 7); // RR
   ellipse(this.x + 13, this.y + 11, 11, 7); // RF
   ellipse(this.x - 13, this.y - 11, 11, 7); // LR
   ellipse(this.x + 13, this.y - 11, 11, 7); // LF
   // Body
   ellipse(this.x, this.y, 50, 25);
   // Tail
   ellipse(this.x - 27, this.y, 13, 2)
   // Head
   ellipse(this.x + 19, this.y, 23, 20);
   fill('#F08080'); // LightCoral
   bezier(this.x + 28, this.y + 6, this.x + 29, this.y + 17, this.x + 39, this.y + 11, this.x + 33, this.y + 4);
   fill('#DAA520'); // GoldenRod
   ellipse(this.x + 29, this.y, 11, 10);
   line(this.x + 17, this.y - 3, this.x + 11, this.y - 5);
   line(this.x + 11, this.y - 5, this.x + 17, this.y - 8);
   line(this.x + 17, this.y + 3, this.x + 11, this.y + 5);
   line(this.x + 11, this.y + 5, this.x + 17, this.y + 8);
   fill('#F5F5F5'); // WhiteSmoke
   ellipse(this.x + 23, this.y - 6, 9, 10);
   ellipse(this.x + 23, this.y + 6, 9, 10);
   fill('#B22222'); // FireBrick
   ellipse(this.x + 26, this.y - 6, 3, 5);
   ellipse(this.x + 26, this.y + 6, 3, 5);
   ellipse(this.x + 32, this.y, 5, 8);
};

Chihuahua.prototype.rUp = function() {
   this.y -= 5;
};

Chihuahua.prototype.rDown = function() {
   this.y += 5;
};

Chihuahua.prototype.checkForToyGrab = function(toy) {
   if ((toy.x >= (this.x - 15) && toy.x <= (this.x + 33)) && 
       (toy.y >= (this.y - 35) && toy.y <= (this.y + 35))) {
      toy.y = 520;

      // is chancla?
      if (toy.chancla) {
         this.toys--;
         this.scare = 13;
      } else {
         this.toys++;
      }
   }
};

Chihuahua.prototype.checkForCatCatch = function(cat) {
   if ((cat.x >= (this.x - 13) && cat.x <= (this.x + 43)) &&
       (cat.y >= (this.y - 37) && cat.y <= (this.y + 37))) {
         this.toys--;
         this.scare = 17;
       }
}

var Toy = function(x, y, chancla) {
   this.x = x;
   this.y = y;
   this.chancla = chancla || false;
};

Toy.prototype.draw = function() {
   if (this.chancla) {
      strokeWeight(2);
      stroke('#FF00FF'); // Magenta
      fill('#EE82EE'); // Violet
      ellipse(this.x, this.y, 10, 40);
      fill('#9400D3'); // Magenta
      quad(this.x - 4, this.y - 13, this.x + 4, this.y - 13, this.x + 5, this.y - 5, this.x - 5, this.y - 5)
   } else {
      strokeWeight(2);
      stroke('#8B0000'); // DarkRed
      fill('#8B4513'); // SaddleBrown
      rectMode(CENTER);
      rect(this.x, this.y, 5, 40, 10);
   }
};

var Cat = function(x, y) {
   this.x = x;
   this.y = y;
}

Cat.prototype.draw = function() {
   strokeWeight(1);
   stroke('#FF00FF'); // Magenta
   fill('#000'); // Black
   // Hind paws
   ellipse(this.x - 3, this.y - 13, 11, 17);
   ellipse(this.x - 3, this.y + 13, 11, 17);
   // Body
   ellipse(this.x, this.y, 25, 35);
   // Tail
   ellipse(this.x + 16, this.y, 9, 3);
   // Fore paws
   ellipse(this.x - 11, this.y - 17, 11, 17);
   ellipse(this.x - 11, this.y + 17, 11, 17);
   fill('#F8F8FF'); // GhostWhite
   triangle(this.x - 19, this.y - 23, this.x - 14, this.y - 25, this.x - 14, this.y - 21);
   triangle(this.x - 19, this.y - 19, this.x - 14, this.y - 21, this.x - 14, this.y - 17);
   triangle(this.x - 19, this.y - 15, this.x - 14, this.y - 17, this.x - 14, this.y - 13);
   triangle(this.x - 19, this.y + 15, this.x - 14, this.y + 17, this.x - 14, this.y + 13);
   triangle(this.x - 19, this.y + 19, this.x - 14, this.y + 21, this.x - 14, this.y + 17);
   triangle(this.x - 19, this.y + 23, this.x - 14, this.y + 25, this.x - 14, this.y + 21);
   // head
   fill('#000'); // Black
   ellipse(this.x - 3, this.y, 19, 27);
   fill('#F8F8FF'); // GhostWhite
   arc(this.x - 5, this.y - 7, 7, 11, HALF_PI, PI * 1.75, CHORD); // PI * DEG/180
   arc(this.x - 5, this.y + 7, 7, 11, PI * 0.25, PI * 1.5, CHORD);
   fill('#000'); // Black
   line(this.x, this.y - 4, this.x + 6, this.y - 8);
   line(this.x + 6, this.y - 8, this.x, this.y - 11);
   line(this.x, this.y + 4, this.x + 6, this.y + 8);
   line(this.x + 6, this.y + 8, this.x, this.y + 11);
   fill('#FF00FF'); // Magenta
   ellipse(this.x - 7, this.y - 7, 2, 5);
   ellipse(this.x - 7, this.y + 7, 2, 5);
}

var currSc = 1; // Current Scene

var drawStSc = function() { // Start Scene
   var sX = width * 0.2, sY = height * 0.5, sW = 139;
   var mX = width * 0.8, mY = height * 0.5, mW = 163;
   
   strokeJoin(ROUND); // default MITER
   background('#000'); // Black
   fill('#FFE4B5'); // Moccasin
   rectMode(CORNER);
   rect(0, height * 0.2, width - 15, height * 0.8);
   fill('#DAA520'); // GoldenRod
   textFont('Rockwell', 47);
   textAlign(CENTER, CENTER);
   strokeWeight(1);
   text("Shakky Chihuahua!", width / 2, height / 11);
   
   strokeWeight(3);
/*    // Start Button
   rect(width / 2 - 45, height / 2 - 15, 70, 30);
   fill('#F5F5F5'); // WhiteSmoke
   textSize(19);
   text("START", width / 2 - 10, height / 2) */
   
   // SHAKKY
   fill('#DAA520'); // GoldenRod
   stroke('#B8860B'); // DarkGoldenRod
   // head
   ellipse(sX, sY, sW, sW * 1.03);
   // ears
   beginShape();
   vertex(sX - 59, sY - 35);
   bezierVertex(sX - 74, sY - 35, sX - 74, sY - 75, sX - 56, sY - 100);
   bezierVertex(sX - 61, sY - 89, sX - 19, sY - 79, sX - 27, sY - 63);
   endShape();
   beginShape();
   vertex(sX + 59, sY - 35);
   bezierVertex(sX + 74, sY - 35, sX + 74, sY - 75, sX + 56, sY - 100);
   bezierVertex(sX + 61, sY - 89, sX + 19, sY - 79, sX + 27, sY - 63);
   endShape();
   // eyes
   fill('#F5F5F5'); // WhiteSmoke
   circle(sX - 37, sY - 13, sW * .31);
   circle(sX + 37, sY - 13, sW * .31);
   fill('#B22222'); // FireBrick
   circle(sX - 36, sY - 10, sW * .19);
   circle(sX + 36, sY - 10, sW * .19);
   // muzzle
   bezier(sX - 7, sY + 7, sX - 20, sY + 20, sX - 29, sY + 13, sX - 37, sY + 23);
   bezier(sX + 7, sY + 7, sX + 20, sY + 20, sX + 29, sY + 13, sX + 37, sY + 23);
   beginShape();
   vertex(sX, sY + 33);
   bezierVertex(sX - 2, sY + 42 , sX - 24, sY + 42, sX - 41, sY + 31);
   bezierVertex(sX + 7, sY + 53, sX - 29, sY + 61, sX, sY + 65);
   bezierVertex(sX + 29, sY + 61, sX - 7, sY + 53, sX + 41, sY + 31);
   bezierVertex(sX + 24, sY + 42, sX - 2, sY + 42, sX, sY + 33);
   endShape();
   ellipse(sX, sY + 23, sW * .19, sW * .14);
   // tongue
   fill('#F08080'); // LightCoral
   bezier(sX - 9, sY + 45, sX - 17, sY + 67, sX + 17, sY + 67, sX + 9, sY + 45)

   // Meowwy
   fill('#000'); // Black
   stroke('#FF00FF'); // Magenta
   // head & mouth
   ellipse(mX, mY, mW, mW * 0.8);
   arc(mX - 16, mY + 21, 31, 23, 0, PI * .8); // PI * DEG/180
   arc(mX + 16, mY + 21, 31, 23, PI * .2, PI); // PI * DEG/180
   // ears
   beginShape();
   vertex(mX - 73, mY - 25);
   bezierVertex(mX - 79, mY - 29, mX - 79, mY - 41, mX - 73, mY - 49);
   bezierVertex(mX - 70, mY - 60, mX - 63, mY - 151, mX - 31, mY - 59);
   endShape();
   beginShape();
   vertex(mX + 73, mY - 25);
   bezierVertex(mX + 79, mY - 29, mX + 79, mY - 41, mX + 73, mY - 49);
   bezierVertex(mX + 70, mY - 60, mX + 63, mY - 151, mX + 31, mY - 59);
   endShape();
   // eyes, nose & whiskers
   bezier(mX - 47, mY - 29, mX - 3, mY - 23, mX - 13, mY - 3, mX - 5, mY + 13);
   bezier(mX + 47, mY - 29, mX + 3, mY - 23, mX + 13, mY - 3, mX + 5, mY + 13);
   fill('#F5F5F5'); // WhiteSmoke
   bezier(mX - 32, mY - 25, mX - 73, mY - 13, mX - 0, mY + 20, mX - 13, mY - 11)
   bezier(mX + 32, mY - 25, mX + 73, mY - 13, mX + 0, mY + 20, mX + 13, mY - 11)
   fill('#FF00FF'); // Magenta
   ellipse(mX - 25, mY - 8, 13, 17);
   ellipse(mX + 25, mY - 8, 13, 17);
   triangle(mX - 7, mY + 14, mX, mY + 20, mX + 7, mY + 14);
   strokeWeight(1);
   line(mX - 20, mY + 17, mX - 53, mY + 10);
   line(mX - 15, mY + 23, mX - 61, mY + 23);
   line(mX - 19, mY + 28, mX - 53, mY + 35);
   line(mX + 20, mY + 17, mX + 53, mY + 10);
   line(mX + 15, mY + 23, mX + 61, mY + 23);
   line(mX + 19, mY + 28, mX + 53, mY + 35);
   
   // instructions
   strokeWeight(3);
   stroke('#B22222'); // FireBrick
   textSize(23);
   text("How to play:", width / 2, sY - 60);
   textSize(15);
   text("Press the Up & Down arrows", width / 2, sY - 25);
   text("to help Shakky grab its toys", width / 2, sY );
   text("across the corridor.", width / 2, sY + 25);
   text("Avoid the chanclas and", width / 2, sY + 50);
   text("beware of Meowwy the cat!", width / 2, sY + 75);
   textSize(31);
   text("Press Enter to play", width / 2, sY + 150);

   if (keyIsPressed && keyCode === ENTER) {
      currSc = 2;
   }
}

var drawPlaySc = function() { // Play Scene
   textAlign(LEFT, BOTTOM);

   // static
   background('#F5F5F5'); // WhiteSmoke
   fill('#FFE4B5'); // Moccasin
   noStroke();
   rectMode(CORNER);
   rect(0, height * 0.2, width, height * 0.8);

   stroke('#B22222'); // FireBrick
   strokeWeight(2);
   for (let i = 0; i < baseboardX.length; i++) {
      rect(baseboardX[i], height * 0.18, 100, 10);
      baseboardX[i] -= 1;
      if (baseboardX[i] <= -100) {
         baseboardX[i] = 1600;
      }
   }

   for (let i = 0; i < toys.length; i++) {
      toys[i].draw();
      shakky.checkForToyGrab(toys[i]);
      toys[i].x -= 1;
   }

   meowwy.draw();
   shakky.checkForCatCatch(meowwy);
   meowwy.x -= 3.1; // .5 for testing, 3.1 normal
   meowwy.y += 0.5; // comment for testing
   if (meowwy.x < -50 && toys[toys.length - 1].x > 750) { // more Meowwys
      meowwy.x = Math.floor(Math.random() * 1500 + 1000); // x from 1000 to 2500
      meowwy.y = Math.floor(Math.random() * 70 + 50); // from 50 to 120
   }

   if (meowwy.x - shakky.x < 300 && meowwy.x - shakky.x > 0) {
      fill('#FF0000'); // Red
      textSize(19);
      text("MEOW!!", meowwy.x + 11, meowwy.y - 13);
   }

   // Score
   fill('#800000') // Maroon
   noStroke();
   textSize(19);
   text("Score: " + shakky.toys, 13, 29);

   // Outcome
   if (toys[toys.length - 1].x < shakky.x - 15 && shakky.toys / toys.length >= 0.75) {
      textSize(37);
      text("YOU WIN!!!", 250, 60);
   } else if (toys[toys.length - 1].x < shakky.x - 15) {
      textSize(31);
      text("You lose...", 260, 70);
   }

   if (keyIsPressed && keyCode === UP_ARROW) {
      shakky.rUp();
   } else if (keyIsPressed && keyCode === DOWN_ARROW) {
      shakky.rDown();
   } else if (keyIsPressed && keyCode === BACKSPACE) {
      currSc = 1;
   }
   
   shakky.draw();

   if (shakky.scare > 0) {
      fill('#FF0000'); // Red
      textSize(17);
      text("GRRR!!", shakky.x - 13, shakky.y - 17);
      shakky.scare--;
   }
}

var shakky = new Chihuahua(150, 300);
// var meowwy = new Cat(random(500, 1000), random(50, 200)); // Must check p5.js random()
// Math.random() * (max - min) + min;
// var meowwy = new Cat(Math.floor(Math.random() * 100 + 300), 262); // for testing
var meowwy = new Cat(Math.floor(Math.random() * 750 + 750), // from 750 to 1500
                     Math.floor(Math.random() * 70 + 50)); // from 50 to 120

var toys = [];
var chanclas = 0;
/* for (let i = 0; i < 40; i++) { // Must check p5.js random()
   if (chanclas < 10 && random(1) > 0.75) {
      toys.push(new Toy(i * 40 + 300, random(30, 300), true));
      chanclas++;
   } else {
      toys.push(new Toy(i * 40 + 300, random(30, 300)));
   }
} */
for (let i = 0; i < 40; i++) {
   if (chanclas < 10 && Math.random() > 0.75) {
      toys.push(new Toy(i * 50 + 350, Math.floor(Math.random() * (470 - 130) + 130), true)); // Random from 130 to 469
      chanclas++;
   } else {
      toys.push(new Toy(i * 50 + 350, Math.floor(Math.random() * 340 + 130))); // Random from 130 to 469
   }
}

var baseboardX = [];
for (let i = 0; i < 17; i++) {
   baseboardX.push(i * 100);
}

function draw() {
   if (currSc === 1) {
      drawStSc();
   } else if (currSc === 2) {
      drawPlaySc();
   }
};