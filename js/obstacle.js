class Obstacle {
  constructor(gameScreen, width, height) {
    this.gameScreen = gameScreen;
    this.left = 0;
    this.top = 0;
    this.width = width;
    this.height = height;
    this.element = document.createElement("img");
    this.element.src = "../images/cola.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }

move() {
    this.top = this.top + 3;
    this.updatePosition();
}

updatePosition(){
    this.element.style.top = `${this.top}px`

}
}
