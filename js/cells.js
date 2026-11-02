class Cell {
  constructor(x, y, type) {
    this.x = x
    this.y = y
    if (type == "sand") {
      this.particle = new Sand(x, y)
    } else {
      this.particle = new Empty(x, y)
    }
  }

  update() {

  }
}