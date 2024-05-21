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

Chihuahua.prototype.checkForToyGrab = function (toy) {
   if ((toy.x >= (this.x - 15) && toy.x <= (this.x + 33)) && 
       (toy.y >= (this.y - 35) && toy.y <= (this.y + 35))) {
      toy.y = 515;

      // is chancla?
      if (toy.chancla) {
         this.toys--;
         this.scare = 13;
      } else {
         this.toys++;
      }
   }
};

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

var shakky = new Chihuahua(150, 300);

var toys = [];
var chanclas = 0;
/* for (let i = 0; i < 40; i++) {
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
for (let i = 0; i < 10; i++) {
   baseboardX.push(i * 100);
}

function draw() {
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
         baseboardX[i] = 900;
      }
   }

   for (let i = 0; i < toys.length; i++) {
      toys[i].draw();
      shakky.checkForToyGrab(toys[i]);
      toys[i].x -= 1;
   }

   // Score
   fill('#800000') // Maroon
   noStroke();
   textSize(19);
   text("Score: " + shakky.toys, 13, 29);

   // Outcome
   if (toys[toys.length -1].x < shakky.x - 15 && shakky.toys / toys.length >= 0.75) {
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
   }
   
   shakky.draw();

   if (shakky.scare > 0) {
      fill('#FF0000'); // Red
      textSize(17);
      text("GRRR!!", shakky.x - 13, shakky.y - 17);
      shakky.scare--;
   }
};