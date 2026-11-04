class Cell {
  constructor(x, y, type) {
    this.x = x
    this.y = y

    // this.id = x * cols + y * rows
    this.type = type

    if (type == "sand") {
      this.particle = new Sand(x, y);
    } else if (type == "water") {
      this.particle = new Water(x, y);
    } else if (type == "mud") {
      this.particle = new Mud(x, y);
    } else {
      this.particle = new Empty(x, y);
    }
  
  }

  update() {
    this.particle.update()
  }
}