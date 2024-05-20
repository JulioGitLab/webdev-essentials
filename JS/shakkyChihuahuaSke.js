/* Sketch code for the shakkyChihuahuaOO.html file */
function setup() {
   createCanvas(window.innerWidth, 500);
   frameRate(30);
}

var Chihuahua = function(x,y) {
   this.x = x;
   this.y = y;
   this.toys = 0;
   this.scare = 0;
}

Chihuahua.prototype.draw = function() {
   this.y = constrain(this.y, 0, height - 50);
   // body
   fill('#DAA520'); // GoldenRod
   ellipse(this.x, this.y, 50, 30);
}

Chihuahua.prototype.rUp = function() {
   this.y -= 5;
}

Chihuahua.prototype.rDown = function() {
   this.y += 5;
}

/* Chihuahua.prototype.checkForToyGrab = function(toy) {
   if ((toy.x >= (this.x - 25) && toy.x <= (this.x + 25)) &&
       (toy.y >= (this.y - 15) && toy.y <= (this.y + 15))) {
         // is chancla?
       }
} */

var shakky = new Chihuahua(150, 300);

var baseboardX = [];
for (let i = 0; i < 25; i++) {
   baseboardX.push(i * 30);
}

function draw() {
   // static
   background('#F5F5F5'); // WhiteSmoke
   fill('#FFE4B5'); // Moccasin
   rect(0, height * 0.15, width, height * 0.85);

   // stroke('F4A460'); // SandyBrown
   // stroke('B22222'); // FireBrick
   strokeWeight(4);
   for (let i = 0; i < baseboardX.length; i++) {
      rect(baseboardX[i], height * 0.15, 50, 25);
      baseboardX[i] -= 1;
      if (baseboardX[i] <= -50) {
         baseboardX[i] = width;
      }
   }

   if (keyIsPressed && keyCode === UP_ARROW) {
      shakky.rUp();
   } else if (keyIsPressed && keyCode === DOWN_ARROW) {
      shakky.rDown();
   }
   
   shakky.draw();
}