let video;
let r = 4; // hex radius

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  noStroke();
}

function draw() {
  background(0);

  // mirror webcam
  translate(width, 0);
  scale(-1, 1);

  video.loadPixels();

  // FLAT-TOP geometry
  let hexWidth = 2 * r;                 // full width
  let hexHeight = sqrt(3) * r;          // full height
  let horizStep = 1.5 * r;              // distance between columns

  for (let x = 0; x < width + r; x += horizStep) {

    let col = floor(x / horizStep);
    let yOffset = (col % 2) * (hexHeight / 2);

    for (let y = 0; y < height + r; y += hexHeight) {

      let sampleX = floor(x);
      let sampleY = floor(y + yOffset);

      if (
        sampleX >= 0 &&
        sampleX < video.width &&
        sampleY >= 0 &&
        sampleY < video.height
      ) {
        let index = (sampleY * video.width + sampleX) * 4;
        let rCol = video.pixels[index];
        let gCol = video.pixels[index + 1];
        let bCol = video.pixels[index + 2];

        fill(rCol, gCol, bCol);
        drawFlatHex(x, y + yOffset, r);
      }
    }
  }
}

function drawFlatHex(cx, cy, radius) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;   // <-- TRUE flat-top
    let vx = cx + cos(angle) * radius;
    let vy = cy + sin(angle) * radius;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}
