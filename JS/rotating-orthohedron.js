const cW_H = 1080 / 2;

function setup() {
  let canvas = createCanvas(cW_H, cW_H);
  canvas.id("orthohedron-canvas");
  // frameRate(50); // comment for smoother movement
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

const createCuboid = function (x, y, z, w, h, d) {
   const nodes = [
      [x,   y,   z  ],
      [x,   y,   z+d],
      [x,   y+h, z  ],
      [x,   y+h, z+d],
      [x+w, y,   z  ],
      [x+w, y,   z+d],
      [x+w, y+h, z  ],
      [x+w, y+h, z+d]
   ];
   const edges = [
      [0, 1], [1, 3], [3, 2], [2, 0],
      [4, 5], [5, 7], [7, 6], [6, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
   ];
   return { nodes: nodes, edges: edges };
};

const cuboid = createCuboid(0, 0, 0, 110, 170, 70);
const nodes = cuboid.nodes;
const edges = cuboid.edges;

// Rotate shape around the z-axis
const rotateZ3D = function (theta) {
  // t_rad = theta * (Math.PI / 180);
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];
    const x = node[0];
    const y = node[1];
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = y * cosTheta + x * sinTheta;
  }
};

const rotateX3D = function (theta) {
  // t_rad = theta * (Math.PI / 180);
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];
    const y = node[1];
    const z = node[2];
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + y * sinTheta;
  }
};

const rotateY3D = function (theta) {
  // t_rad = theta * (Math.PI / 180);
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];
    const x = node[0];
    const z = node[2];
    node[0] = x * cosTheta + z * sinTheta;
    node[2] = z * cosTheta - x * sinTheta;
  }
};

function draw() {
  background(color.Black);

  push();
  translate(270, 270);

  // Draw edges
  stroke(color.WhiteSmoke);
  for (let e = 0; e < edges.length; e++) {
    const n0 = edges[e][0];
    const n1 = edges[e][1];
    const node0 = nodes[n0];
    const node1 = nodes[n1];
    line(node0[0], node0[1], node1[0], node1[1]);
  }

  // Draw nodes
  fill(color.Aqua);
  noStroke();
  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];
    circle(node[0], node[1], 11);
  }

  pop();
}

// mouseDragged = function() {
function mouseDragged() {
  rotateY3D((mouseX - pmouseX) * (Math.PI / 180));
  rotateX3D((mouseY - pmouseY) * (Math.PI / 180));
}

rotateZ3D(30 * (Math.PI / 180));
rotateY3D(30 * (Math.PI / 180));
rotateX3D(30 * (Math.PI / 180));