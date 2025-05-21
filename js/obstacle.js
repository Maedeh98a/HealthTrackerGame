
class Obstacle {
  constructor(gameScreen, width, height, imageObj) {
    this.gameScreen = gameScreen;
    this.left = 1500;
    this.top = Math.floor(Math.random() * 400);
    this.width = width;
    this.height = height;
    this.type = imageObj.type;
    this.sort = imageObj.sort;
    this.element = document.createElement("img");
    this.element.src = imageObj.src;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left -= 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
