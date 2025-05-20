class Game{
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameContainer = document.getElementById("game-container")
        this.gameEnd = document.getElementById("game-end");
        this.livesElement = document.getElementById("lives");
        this.scoreElement = document.getElementById("score")
        this.player = new Player(this.gameScreen, 
          50,
          250,
          300,
          450
        );
        this.height = 600;
        this.width = 500;
        this.obstacles = [new Obstacle(this.gameScreen, 125, 100)];
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 60);
        this.counter = 0;
      }
      start(){

        this.gameScreen.style.height = `${this.height}px`;
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameContainer.style.display = 'block';

        this.gameIntervalId = setInterval(()=>{
          this.gameLoop();
        }, this.gameLoopFrequency);


      }
      gameLoop(){
        console.log("inside the game method");
        this.update();
        if(this.isGameOver){
          clearInterval(this.gameIntervalId);
          this.gameOver();
        }

      }
      update(){
        this.player.move();
        if(this.counter % 180 === 0){
          this.obstacles.push(new Obstacle(this.gameScreen, 125, 200))
        }
        for(let i=0; i < this.obstacles.length; i++){
          const currentObstacle = this.obstacles[i];
          currentObstacle.move();
        
        if(this.player.didCollide(currentObstacle)){
          console.log("hit!")
          currentObstacle.element.remove()
          this.obstacles.splice(i, 1);
          i--;
          this.lives -- ;
          this.livesElement.innerText = this.lives;

          if(this.lives === 0){
            this.isGameOver = true;
          }
        }
        if(currentObstacle.top > 500){
          this.score ++;
          this.scoreElement.innerText = this.score

           currentObstacle.element.remove()
          this.obstacles.splice(i, 1);
          i--;
        }

      }}

      gameOver(){
        this.player.element.remove();
        this.player = null;
        this.obstacles.forEach((oneObstacle)=>{
          oneObstacle.element.remove();
        })
        this.obstacles = [];
        this.gameScreen.style.display = 'none';
        this.gameEnd.style.display = 'block';
      }
}