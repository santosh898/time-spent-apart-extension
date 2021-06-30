export class Particle {
  canvas = null;
  context = null;
  brightnessMap = [];
  size = Math.random() * 1.5 + 1;
  speed = 0;
  velocity = Math.random() * 0.5;
  maxSize = 30;
  goingUp = true;
  x = 0;
  y = 0;

  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.x = Math.floor(Math.random() * this.canvas.width);
    this.y = Math.floor(Math.random() * this.canvas.height);
  }

  draw = (x, y) => {
    this.context.strokeStyle = "#303030";
    this.context.beginPath();
    this.context.arc(x, y, this.size, 0, Math.PI * 2);
    this.context.stroke();
  };

  refreshPosition = () => {
    this.x = Math.floor(Math.random() * this.canvas.width);
    this.y = Math.floor(Math.random() * this.canvas.height);
  };

  update = () => {
    if (this.goingUp) {
      if (this.size >= this.maxSize) {
        this.goingUp = false;
      }
      this.size = this.size + this.velocity;
      this.draw(this.x, this.y);
    } else {
      this.size = Math.max(this.size - this.velocity, 0);
      this.draw(this.x, this.y);
      if (this.size <= 0) {
        this.goingUp = true;
        this.refreshPosition();
      }
    }
  };
}
