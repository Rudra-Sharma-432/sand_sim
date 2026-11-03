/* =====================================================================
   canvas.js  -  EVERYTHING related to the canvas lives in this file.

   Design rule: the GRID decides the canvas size, not the window.
     canvas width  = cols * cellSize
     canvas height = rows * cellSize
   So every cell is a perfect square, the grid fits the canvas exactly,
   and resizing the browser window never changes the grid or the canvas.

   Other files use these globals: canvas, ctx, cols, rows, cellSize,
   clearCanvas(), drawGrid(), getCellFromMouse().
   ===================================================================== */

// ---------- 1. Basic setup ----------
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// ---------- 2. Grid settings (the source of truth) ----------
// cols and rows are FIXED. Only cellSize changes (via the slider).
// Because cell positions are stored in cell units (not pixels), changing
// cellSize never requires rebuilding CELLS.
const cols = 40;      // number of cells horizontally
const rows = 30;      // number of cells vertically
let cellSize = 20;    // size of one square cell in CSS pixels

// Canvas size in CSS pixels. Always recomputed from the grid, never read
// from the DOM, so there is no feedback loop with the layout.
let cssWidth = cols * cellSize;
let cssHeight = rows * cellSize;

// ---------- 3. Sizing the canvas ----------
// A canvas has two sizes:
//   - CSS size   (canvas.style.width/height): how big it looks on the page
//   - pixel size (canvas.width/height): how many real pixels it contains
// On high-DPI screens (dpr = 2) we need more real pixels than CSS pixels,
// otherwise everything looks blurry.
function applyCanvasSize() {
  const dpr = window.devicePixelRatio || 1;

  cssWidth = cols * cellSize;
  cssHeight = rows * cellSize;

  // Visible size on the page (exact multiple of cellSize = perfect squares)
  canvas.style.width = cssWidth + "px";
  canvas.style.height = cssHeight + "px";

  // Real pixel resolution (sharpness)
  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);

  // Setting canvas.width resets the transform, so we set it again.
  // After this, all drawing coordinates are in CSS pixels, which is
  // the same unit cellSize uses. setTransform (not scale) is used so
  // calling this function repeatedly never stacks the scaling.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// ---------- 4. Drawing helpers (called from main.js render) ----------

// Erase the whole canvas. Call once at the start of every frame,
// otherwise old drawings stay on screen as trails.
function clearCanvas() {
  ctx.clearRect(0, 0, cssWidth, cssHeight);
}

// Draw faint grid lines and a border so the usable area is visible.
function drawGrid() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();

  // Vertical lines (skip 0 and cols: the border covers the edges)
  for (let c = 1; c < cols; c++) {
    const x = c * cellSize + 0.5; // +0.5 keeps 1px lines crisp
    ctx.moveTo(x, 0);
    ctx.lineTo(x, cssHeight);
  }
  // Horizontal lines
  for (let r = 1; r < rows; r++) {
    const y = r * cellSize + 0.5;
    ctx.moveTo(0, y);
    ctx.lineTo(cssWidth, y);
  }
  ctx.stroke();

  // Border around the exact usable area (inset by 0.5 so it isn't clipped)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.strokeRect(0.5, 0.5, cssWidth - 1, cssHeight - 1);
}

// ---------- 5. Mouse -> grid cell ----------
// Converts a mouse event into {x, y} cell coordinates (x = column, y = row).
// Returns null if the mouse is outside the grid, so callers can ignore it.
function getCellFromMouse(event) {
  const rect = canvas.getBoundingClientRect();

  // Mouse position relative to the canvas, corrected in case the page
  // is zoomed/scaled so rect size differs from our CSS-pixel size.
  const mouseX = (event.clientX - rect.left) * (cssWidth / rect.width);
  const mouseY = (event.clientY - rect.top) * (cssHeight / rect.height);

  const x = Math.floor(mouseX / cellSize);
  const y = Math.floor(mouseY / cellSize);

  // Bounds check (mousemove is listened on window, so this can happen)
  if (x < 0 || x >= cols || y < 0 || y >= rows) return null;

  return { x, y };
}

// ---------- 6. Cell size slider ----------
const cellSizeInput = document.getElementById("cellSizeInput");
const cellSizeLabel = document.getElementById("cellSize");

cellSizeInput.addEventListener("input", function () {
  cellSize = Number(cellSizeInput.value);
  cellSizeLabel.textContent = cellSize;
  applyCanvasSize(); // canvas grows/shrinks, grid cell count stays the same
});

// ---------- 7. Window resize ----------
// The canvas and grid must NOT change when the window is resized.
// We only re-apply the sizing because the devicePixelRatio can change
// (e.g. dragging the window to another monitor or browser zoom).
// The size in CSS pixels stays exactly the same.
window.addEventListener("resize", applyCanvasSize);

// ---------- 8. Initialize ----------
applyCanvasSize();