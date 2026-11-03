//: ---- Variables ---- ://
// (canvas, ctx, cols, rows, cellSize now come from canvas.js)
let isDragging = false;
let paused = false;

const CELLS = [];
function reset() {
  for (let i = 0; i < rows * cols; i++) {
    CELLS.push(new Cell(Math.floor(i / cols), i % cols, "empty"));
  }

  console.log("done reseting");
}
reset();

function pauseToggle() {
  paused = !paused;
  console.log(`paused: ${paused}`);
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
  // canvas.js converts the mouse position into a grid cell (or null if outside)
  const cell = getCellFromMouse(event);
  if (!cell) return;

  const index = cell.y * cols + cell.x;
  CELLS[index] = new Cell(cell.x, cell.y, "sand");
}

function update() {
  for (let i = CELLS.length - 1; i >= 0; i--) {
    CELLS[i].update()
  }
}

function render () {
  clearCanvas(); // canvas.js: erase previous frame
  drawGrid();    // canvas.js: grid lines + border

  for (let i = 0; i < CELLS.length; i++) {
    CELLS[i].particle.draw();
  }
}

function mainLoop() {
  if (!paused) {
    // 1. Update your main logic (positions, collisions, etc.)
    update();

    // 2. Render the graphics (draw shapes, clear canvas)
    render();

    // 3. Request the next frame to keep the loop going
    requestAnimationFrame(mainLoop);
    }
}

// Start the main loop
requestAnimationFrame(mainLoop);