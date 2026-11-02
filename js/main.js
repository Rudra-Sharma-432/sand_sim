const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");

function resizeAndSharpenCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // 1. Get the exact width and height calculated by your CSS (width: 75%, margins, etc.)
  const rect = canvas.getBoundingClientRect();

  // 2. Set the internal resolution multiplied by the screen sharpness
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // 3. Reset the context scale back to normal so your coordinate mapping matches CSS pixels
  ctx.scale(dpr, dpr);
}

// 5. Initialize on load and hook it up to window resizing
resizeAndSharpenCanvas();
window.addEventListener("resize", resizeAndSharpenCanvas);


//: ---- Variables ---- ://
// const cellSize = 110;
// let rows = Math.floor(canvas.height / cellSize);
// let cols = Math.floor(canvas.width / cellSize);
let isDragging = false;

const cellCountInRow = 10;
let cols = cellCountInRow;
let cellSize = Math.floor(canvas.width / cols);
let rows = Math.floor(canvas.height / cellSize);

const CELLS = [];

for (let i = 0; i < rows * cols; i++) {
  CELLS.push(new Cell(Math.floor(i / cols), i % cols, "empty"));
}

canvas.addEventListener("mousedown", function (event) {
  isDragging = true;
  drawAtMousePosition(event);
});

window.addEventListener("mousemove", function (event) {
  if (!isDragging) return;
  drawAtMousePosition(event);
});

window.addEventListener("mouseup", function () {
  isDragging = false;
});

function drawAtMousePosition(event) {
  const rect = canvas.getBoundingClientRect();

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  cellX = Math.floor(mouseX / cellSize);
  cellY = Math.floor(mouseY / cellSize);
  
  // ctx.fillStyle = "red";
  // ctx.beginPath();
  // ctx.arc(cellX, cellY, 4, 0, Math.PI * 2);
  // ctx.fill();
  
  // CELLS.push(new Cell(cellX, cellY, "sand"));
  index = cellY * rows + cellY;

  CELLS[index] = new Cell(cellX, cellY, "sand");


}

function update() {
  for (let i = 0; i < CELLS.length; i++) {
    CELLS[i].update()
  }
}

function render () {
  for (let i = 0; i < CELLS.length; i++) {
    CELLS[i].particle.draw();
  }
}

function mainLoop() {
    // 1. Update your main logic (positions, collisions, etc.)
    update();

    // 2. Render the graphics (draw shapes, clear canvas)
    render();

    // 3. Request the next frame to keep the loop going
    requestAnimationFrame(mainLoop);
}

// Start the main loop
requestAnimationFrame(mainLoop);

