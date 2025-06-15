/* The text color changes depending on the values of the r, g and b variables
   which are also being modified during the animation.
   The triangular figure moves from the top-left to the bottom-right as it
   also grows and changes color depending on r, g and b.
   The ellipses color changes depending on the mouse position in the canvas.
   The triangle movement restarts once it moves out of the canvas and the r,
   g and b values are reset. */

const canvas = document.getElementById("aCanvas");
const ctx = canvas.getContext("2d");

let mouseX = 0,
  mouseY = 0;
canvas.addEventListener("mousemove", (event) => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
  // console.log(`Mouse X: ${mouseX}`);
  // console.log(`Mouse Y: ${mouseY}`);
});

let r = 0,
  g = 191,
  b = 255;
let triangleX = 1,
  triangleY = (triangleX * 11) / 14;

function draw() {
  if (triangleX === 1) {
    ctx.fillStyle = "LightSalmon";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Text
  ctx.font = "63px 'Lato', sans-serif";
  ctx.fillStyle = `rgb(220,0,${r})`;
  ctx.fillText("BK", 125, 75);
  ctx.font = "47px 'Lato', sans-serif";
  ctx.fillText("UTE", 205, 75);
  ctx.fillStyle = `rgb(163,${b},${r})`;
  ctx.font = "31px 'Lato', sans-serif";
  ctx.fillText("La mejor", 180, 125);
  ctx.fillStyle = `rgb(${r},69,${b})`;
  ctx.font = "37px 'Lato', sans-serif";
  ctx.fillText("!", 303, 125);
  ctx.fillStyle = `rgb(${r},33,${b})`;
  ctx.font = "43px 'Lato', sans-serif";
  ctx.fillText("!", 311, 125);
  ctx.fillStyle = `rgb(${r},0,${b})`;
  ctx.font = "47px 'Lato', sans-serif";
  ctx.fillText("!", 320, 125);
  ctx.fillStyle = `rgb(${r},${b},101)`;
  ctx.font = "23px 'Lato', sans-serif";
  ctx.fillText("y al mejor precio!", 19, 320);

  // Figures
  ctx.lineWidth = 1.3;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.moveTo(triangleX, triangleY);
  ctx.lineTo((triangleX * 19) / 28, (triangleY * 12) / 11);
  ctx.lineTo((triangleX * 25) / 28, (triangleY * 27) / 22);
  ctx.lineTo(triangleX, triangleY);
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = `rgb(255,${mouseX - 50},${mouseY - 50})`;
  ctx.ellipse(20, 75, 5, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.moveTo(60, 135);
  ctx.ellipse(45, 125, 10, 35, Math.PI * 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.moveTo(55, 200);
  ctx.ellipse(30, 175, 20, 25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.moveTo(135, 240);
  ctx.ellipse(75, 220, 55, 20, Math.PI * 0.65, 0, Math.PI * 2);
  ctx.fill();

  // Action
  r += 1;
  g -= 0.5;
  b -= 0.7;
  triangleX += 1.3;
  triangleY += 1.1;

  if (triangleX > 500) {
    r = 0;
    g = 191;
    b = 255;
    triangleX = 1;
    triangleY = (triangleX * 11) / 14;
  }

  requestAnimationFrame(fpsTo50); // for 50 fps
  // requestAnimationFrame(draw); // for default fps
}

function fpsTo50() {
  setTimeout(draw, 1000 / 50); // ms/fps
}

requestAnimationFrame(fpsTo50); // for 50 fps
// requestAnimationFrame(draw); // for default fps