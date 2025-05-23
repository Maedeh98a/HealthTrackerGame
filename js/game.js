// production
const BASE_URL = "https://maedeh98a.github.io/HealthTrackerGame";

// local
 //const BASE_URL = "http://127.0.0.1:5500";

const obstacleImages = [
  { src: BASE_URL + "/images/bicycle.png", type: "good", sort: "activity" },
  { src: BASE_URL + "/images/broccoli.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/brown_rice.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/egg.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/celery.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/grilled_breast.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/lentils.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/soup.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/swimming.png", type: "good", sort: "activity" },
  { src: BASE_URL + "/images/yogurt.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/zumba.png", type: "good", sort: "activity" },
  { src: BASE_URL + "/images/training.png", type: "good", sort: "activity" },
  { src: BASE_URL + "/images/whole-grain.png", type: "good", sort: "food" },
  { src: BASE_URL + "/images/green-tea.png", type: "good", sort: "beverage" },
  { src: BASE_URL + "/images/cigar.png", type: "bad", sort: "smoke" },
  { src: BASE_URL + "/images/cola.png", type: "bad", sort: "beverage" },
  { src: BASE_URL + "/images/burger.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/french-fries.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/ice-cream.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/nuggets.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/pizza.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/sausages.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/strawberry-cake.png", type: "bad", sort: "food" },
  { src: BASE_URL + "/images/video-game.png", type: "bad", sort: "activity" },
];
class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEnd = document.getElementById("game-end");
    this.gameEndText = document.getElementById("end-text");
    this.livesElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");
    this.pauseButton = document.getElementById("pause");
    this.player = new Player(this.gameScreen, 50, 250, 100, 250);
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.counter = 0;
    this.isPaused = false;
    this.eatingSound = new Audio(BASE_URL + "/assets/eat-323883.mp3");
    this.eatingSound.volume = 0.1;
    this.drinkingSound = new Audio(
      BASE_URL + "/assets/drinking-water-woman-102911.mp3"
    );
    this.drinkingSound.volume = 0.1;
    this.activitySound = new Audio(BASE_URL + "/assets/running-14658.mp3");
    this.activitySound.volume = 0.1;
    this.smokingSound = new Audio(
      BASE_URL + "/assets/cigarette-lighter-46720.mp3"
    );
    this.smokingSound.volume = 0.1;
    this.gameOverSound = new Audio(BASE_URL + "/assets/gooo-83817.mp3");
    this.gameOverSound.volume = 0.1;
    this.winSound = new Audio(BASE_URL + "/assets/marimba-win-f-2-209688.mp3");
    this.winSound.volume = 0.1;
  }
  start() {
    this.lives = 3;
    this.score = 0;
    this.obstacles = [];
    this.counter = 0;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameEnd.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameContainer.style.display = "block";
    this.pauseButton.style.display = "block";
    this.livesElement.innerText = this.lives;
    this.livesElement.style.width = `${this.lives * 33.3}%`;
    this.scoreElement.innerText = this.score;
    this.scoreElement.style.width = `${this.score * 20}%`;

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    console.log("inside the game method");
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }
  update() {
    this.player.move();
    if (this.counter % 180 === 0) {
      const randomIndex = Math.floor(Math.random() * obstacleImages.length);
      const chosenImage = obstacleImages[randomIndex];
      const newObstacle = new Obstacle(this.gameScreen, 125, 125, chosenImage);
      this.obstacles.push(newObstacle);
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();

      if (this.player.didCollide(currentObstacle)) {
        if (currentObstacle.sort === "food") {
          this.eatingSound.play();
        } else if (currentObstacle.sort === "beverage") {
          this.drinkingSound.play();
        } else if (currentObstacle.sort === "activity") {
          this.activitySound.play();
        } else {
          this.smokingSound.play();
        }

        currentObstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
        if (currentObstacle.type === "bad") {
          this.lives--;
          this.livesElement.innerText = this.lives;
          this.livesElement.style.width = `${this.lives * 33.3}%`;

          if (this.lives === 0) {
            this.isGameOver = true;
            this.gameOverSound.play();
            this.gameEndText.innerText = "😕 Oops! You picked too many unhealthy choices. Try again!";
          }
        } else if (currentObstacle.type === "good") {
          this.score++;
          this.scoreElement.innerText = this.score;
          // this.scoreElement.style.textAlign = "center";
          this.scoreElement.style.width = `${this.score * 20}%`;
          if (this.score === 5) {
            this.isGameOver = true;
            this.winSound.play();
        
            this.gameEndText.innerText= "🎉 You did it! Great job choosing the healthy choices!";
            
          }
        }
        continue;
      }
      if (currentObstacle.left + currentObstacle.width < 0) {
        currentObstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }
    this.counter++;
  }

  gameOver() {
    this.player.element.remove();
    this.player = null;
    this.pauseButton.style.display = "none";
    this.obstacles.forEach((oneObstacle) => {
      oneObstacle.element.remove();
    });
    this.obstacles = [];
    this.gameScreen.style.display = "none";
    this.gameEnd.style.display = "block";
  }

  pause() {
    if (!this.isPaused) {
      clearInterval(this.gameIntervalId);
      this.isPaused = true;
    }
  }
  resume() {
    if (this.isPaused) {
      this.gameIntervalId = setInterval(() => {
        this.gameLoop();
      }, this.gameLoopFrequency);
      this.isPaused = false;
    }
  }
}
