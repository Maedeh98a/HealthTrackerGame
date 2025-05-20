window.onload = function (){
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const introPage = document.getElementById("game-intro");
    const endPage = document.getElementById("game-end");
    const containerPage = document.getElementById("game-container");
    const screenPage = document.getElementById("game-screen");

    const ourGame = new Game()
    startButton.addEventListener("click", ()=> {
        endPage.style.display = 'none';
        startGame();
        
    });
    restartButton.addEventListener("click", ()=>{
        startGame();
    })

    window.addEventListener('keydown', (event) =>{
        if(event.code === "ArrowLeft"){
            
            ourGame.player.directionX = -2;
        }
        if(event.code === "ArrowRight"){
            
            ourGame.player.directionX = 2;
        }
        if(event.code === "ArrowUp"){
            
            ourGame.player.directionY = -5;
        }
        if(event.code === "ArrowDown"){
            
            ourGame.player.directionY = 5;
        }
    });

    window.addEventListener('keyup', (event) =>{
        if(event.code === "ArrowLeft"){
            
            ourGame.player.directionX = 0;
        }
        if(event.code === "ArrowRight"){
            
            ourGame.player.directionX = 0;
        }
        if(event.code === "ArrowUp"){
            
            ourGame.player.directionY = 0;
        }
        if(event.code === "ArrowDown"){
            
            ourGame.player.directionY = 0;
        }
    })

    function startGame(){
        
        
        ourGame.start();
    }
}
