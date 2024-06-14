/* The text color changes depending on the values of the R, G and B variables
   which are also being modified during the animation.
   The triangular figure moves from the top-left to the bottom-right as it
   also grows and changes color depending on R, G and B.
   The ellipses color changes depending on the mouse position in the canvas.
   The triangle movement restarts once it moves out of the canvas and the R,
   G and B values are reset. */

const canvas = document.getElementById("aCanvas");
const cx = canvas.getContext("2d");

var mouseX = 0, mouseY = 0;
canvas.addEventListener('mousemove', (event) => {
   mouseX = event.offsetX;
   mouseY = event.offsetY;

   // console.log(`Mouse X: ${mouseX}`);
   // console.log(`Mouse Y: ${mouseY}`);
});

cx.fillStyle = "LightSalmon";
cx.fillRect(0, 0, canvas.width, canvas.height);

// var R = 70, G = 200, B = 230;
var R = 0, G = 191, B = 255;
var pantX = 1, pantY = pantX * 11 / 14;

draw = function () {
   if (pantX === 1) {
      cx.fillStyle = "LightSalmon";
      cx.fillRect(0, 0, canvas.width, canvas.height);
   }

   // Text
   cx.fillStyle = "rgb(220,0," + R; // + ")"; // ???
   cx.font = "53px Candara";
   cx.fillText("BKute", 180, 70);
   cx.fillStyle = "rgb(163," + B + "," + R;
   cx.font = "31px Candara";
   cx.fillText("La mejor", 183, 120);
   cx.fillStyle = "rgb(" + R + ",69," + B;
   cx.font = "37px Candara";
   cx.fillText('!', 300, 120);
   cx.fillStyle = "rgb(" + R + ",33," + B;
   cx.font = "41px Candara";
   cx.fillText('!', 310, 120);
   cx.fillStyle = "rgb(" + R + ",0," + B;
   cx.font = "47px Candara";
   cx.fillText('!', 320, 120);
   cx.fillStyle = "rgb(" + R + ',' + B + ",216)";
   cx.font = "23px serif";
   cx.fillText("y al mejor precio!", 20, 310);
   // Figures
   // strokeWeight(0.6); // Must modify to pure JS
   cx.beginPath();
   cx.fillStyle = "rgb(" + R + ',' + G + ',' + B;
   cx.moveTo(pantX, pantY);
   cx.lineTo(pantX * 19 / 28, pantY * 12 / 11);
   cx.lineTo(pantX * 25 / 28, pantY * 27 / 22);
   cx.lineTo(pantX, pantY);
   cx.stroke();
   cx.fill();
   cx.beginPath(); // comment for additional effect
   cx.fillStyle = "rgb(255," + (mouseX - 50) + ',' + (mouseY - 50);
   cx.ellipse(20, 75, 5, 13, 0, 0, Math.PI * 2);
   // cx.stroke();
   cx.fill();
   cx.moveTo(60, 135);
   cx.ellipse(45, 125, 10, 35, Math.PI * .7, 0, Math.PI * 2);
   cx.fill();
   cx.moveTo(55, 200);
   cx.ellipse(30, 175, 20, 25, 0, 0, Math.PI * 2);
   cx.fill();
   cx.moveTo(135, 240);
   cx.ellipse(75, 220, 55, 20, Math.PI * .65, 0, Math.PI * 2);
   cx.fill();

   // Action
   R += 0.7;
   G -= 0.5;
   B -= 0.5;
   pantX += 1.3;
   pantY += 1.1;

   if (pantX > 500) R = 0, G = 191, B = 255, pantX = 1, pantY = pantX * 11 / 14;

   requestAnimationFrame(draw);
}

requestAnimationFrame(draw);