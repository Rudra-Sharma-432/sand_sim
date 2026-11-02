class Sand {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

  }

  draw() {
    ctx.fillStyle = "rgb(194, 178, 128)";
    ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
  }
}


class Empty {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}