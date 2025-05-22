window.onload = function (){
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const introPage = document.getElementById("game-intro");
    const endPage = document.getElementById("game-end");
    const containerPage = document.getElementById("game-container");
    const screenPage = document.getElementById("game-screen");
    const pauseElement = document.getElementById("pause");

    let ourGame;
    startButton.addEventListener("click", ()=> {
        endPage.style.display = 'none';
        startGame();
        
    });
    restartButton.addEventListener("click", ()=>{
        startGame();
    })

    pauseElement.addEventListener("click", ()=>{
        if(ourGame){
            if(ourGame.isPaused){
                ourGame.resume();
                pauseElement.innerText = "Pause"
            }else{
                ourGame.pause();
                pauseElement.innerText = "Resume"
            }
        }
    })
    window.addEventListener('keydown', (event) =>{
        if (!ourGame || !ourGame.player) return;
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
        if (!ourGame || !ourGame.player) return;
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
        
        ourGame = new Game()
        ourGame.start();
    }
}
