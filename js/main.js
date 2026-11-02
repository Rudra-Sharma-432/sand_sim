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
const cellSize = 20
let rows = Math.floor(canvas.height / cellSize);
let cols = Math.floor(canvas.width / cellSize);
let isDragging = false;
const CELLS = []


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

  ctx.fillStyle = "red";
  cellX = Math.floor(mouseX / cellSize);
  cellY = Math.floor(mouseY / cellSize);
  
  ctx.beginPath();
  ctx.arc(cellX, cellY, 4, 0, Math.PI * 2);
  ctx.fill();
  
  CELLS.push(new Cell(cellX, cellY, "sand"));


}
