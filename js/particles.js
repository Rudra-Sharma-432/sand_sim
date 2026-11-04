class Sand {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

  }

  draw() {
    // let red = 194 + Math.round(Math.random()*16 - 8)
    // let green = 178 + Math.round(Math.random()*16 - 8)
    // let blue = 128 + Math.round(Math.random()*16 - 8)
    // ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

    ctx.fillStyle = "rgb(194, 178, 128)";
    ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
  }
  update() {
    if (this.y < rows - 1) {
      let thisCellIndex = this.y * cols + this.x;

      // 1. Calculate the target indexes ahead of time
      let bottomIndex = thisCellIndex + cols;
      let blIndex = thisCellIndex + cols - 1;
      let brIndex = thisCellIndex + cols + 1;

      // 2. Fetch the current cell objects for the type check
      let Bottom_cell = CELLS[bottomIndex];
      let BL_cell = CELLS[blIndex];
      let BR_cell = CELLS[brIndex];

      // --- Check Bottom ---
      if (Bottom_cell && (Bottom_cell.type === "empty")) {
        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[bottomIndex] = new Cell(this.x, this.y + 1, "sand");
      }
      // --- Check Bottom-Right ---
      else if (this.x < cols - 1 && BR_cell && BR_cell.type === "empty") {
        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[brIndex] = new Cell(this.x + 1, this.y + 1, "sand");
      }
      // --- Check Bottom-Left ---
      else if (this.x > 0 && BL_cell && BL_cell.type === "empty") {
        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[blIndex] = new Cell(this.x - 1, this.y + 1, "sand");
      }
    }
  }

}

class Water {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.idealMoveDir = (Math.random() > 0.5) ? -1 : 1

    this.vx = 0;
    this.vy = 0;
  }

  draw() {
    let red = 85 + Math.round(Math.random()*4 - 2)
    let green = 159 + Math.round(Math.random()*4 - 2)
    let blue = 220 + Math.round(Math.random()*8 - 4)
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

    // ctx.fillStyle = "rgb(85, 159, 220)";
    ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
  }

  update() {
    if (this.y < rows - 1) {
      let thisCellIndex = this.y * cols + this.x;

      // 1. Calculate the target indexes ahead of time
      let bottomIndex = thisCellIndex + cols;
      let blIndex = thisCellIndex + cols - 1;
      let brIndex = thisCellIndex + cols + 1;
      let lIndex = thisCellIndex - 1;
      let rIndex = thisCellIndex + 1;

      // 2. Fetch the current cell objects for the type check
      let Bottom_cell = CELLS[bottomIndex];
      let BL_cell = CELLS[blIndex];
      let BR_cell = CELLS[brIndex];
      let L_cell = CELLS[lIndex];
      let R_cell = CELLS[rIndex];

      // --- Check Bottom ---
      if (Bottom_cell && Bottom_cell.type === "empty") {
        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[bottomIndex] = new Cell(this.x, this.y + 1, "water");
      }
      // --- Check Bottom-Right ---
      else if (this.x < cols - 1 && BR_cell && BR_cell.type === "empty") {
        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[brIndex] = new Cell(this.x + 1, this.y + 1, "water");
      }
      // --- Check Bottom-Left ---
      else if (this.x > 0 && BL_cell && BL_cell.type === "empty") {
        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[blIndex] = new Cell(this.x - 1, this.y + 1, "water");
      }
      else {
        if (this.x < cols - 1 && BR_cell && BR_cell.type != "empty"
          && this.x > 0 && BL_cell && BL_cell.type != "empty"
          && Bottom_cell && Bottom_cell.type != "empty") {

            if (L_cell && L_cell.type == "empty" && this.idealMoveDir == -1){
              CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
              CELLS[lIndex] = new Cell(this.x - 1, this.y , "water");

            } else if (R_cell && R_cell.type == "empty" && this.idealMoveDir == 1) {
              CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
              CELLS[rIndex] = new Cell(this.x + 1, this.y, "water");
      
            }

            if (L_cell && L_cell.type != "empty" && this.idealMoveDir == -1) {
              if (R_cell && R_cell.type == "empty") {
                this.idealMoveDir = 1;
              }
            }

            if (R_cell && R_cell.type != "empty" && this.idealMoveDir == 1) {
              if (L_cell && L_cell.type == "empty") {
                this.idealMoveDir = -1;
              }
            }
        } 
      }
    }
  }
}


class Mud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {

  }
  
  update() {

  }
}
class Empty {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() { }
  update() { }
}