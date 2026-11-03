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
      // console.log("first if clear")

      let thisCellIndex = this.y * rows + this.x;
//       console.log(thisCellIndex)
// 
//       console.log(CELLS[thisCellIndex])
//       console.log(CELLS[thisCellIndex + cols])

      if (CELLS[thisCellIndex + cols].type == "empty") {
        // console.log("2nd if clear")

        CELLS[thisCellIndex] = new Cell(this.x, this.y, "empty");
        CELLS[thisCellIndex + cols] = new Cell(this.x, this.y + 1, "sand");
      }
    }
  }
}


class Empty {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {}
  update() {}
}