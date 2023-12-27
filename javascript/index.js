// adding music variables 
const gameMusic = new Audio('/music/music.mp3')
const snakeMoveMusic = new Audio('/music/move.mp3')
const foodEatMusic = new Audio('/music/food.mp3')
const gameOverMusic = new Audio('/music/gameover.mp3')


//game variables 
let snakeDirection = [{ x: 17, y: 17 }, { x: 17, y: 18 }]
let food = { x: 8, y: 10 }
let inputDirection = { x: 0, y: 0 }
let speed = 0.07;
let lastPaintTime = 0;
let foodImages = ['../images/apple_00.png', '../images/mashroom.png']
let randomFoodArray = 0
let score = 0
let addScore = document.querySelector('#score')

//setting up the High Score before Game Starts
let highScoreupdate = document.querySelector('#high-score')
let highScore = JSON.parse(localStorage.getItem('highScore'))
if(!highScore) {
    localStorage.setItem('highScore', JSON.stringify(score))
}
else{
    highScoreupdate.innerHTML = `High Score🏆: ${highScore}`
}


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < speed) {
        return
    }
    lastPaintTime = ctime
    gameEngine()
}


function gameEngine() {

    // checking if snake is collided with his body, if true Game Over and restart the game'.
    if (isCollide(snakeDirection)) {
        gameOverMusic.play()
        gameMusic.pause()
        alert('Game Over🥺... Press any key to play again!!!')
        snakeDirection = [{ x: 17, y: 17 }, { x: 17, y: 18 }]
        food = { x: 8, y: 10 }
        inputDirection = { x: 0, y: 0 }
        score = 0
        addScore.innerHTML = `Score: ${score}`
        highScore = JSON.parse(localStorage.getItem('highScore'))
        highScoreupdate.innerHTML = `High Score🏆: ${highScore}`
        gameMusic.currentTime = 0
        // gameMusic.play()

    }


    let snakeGrid = document.querySelector('.snake-box')

    //default snake positioning 
    snakeGrid.innerHTML = ""
    snakeDirection.forEach((e, i) => {
        let snakePosition = document.createElement('div')
        snakePosition.style.gridColumnStart = e.x
        snakePosition.style.gridRowStart = e.y
        if (snakeDirection[i].x === snakeDirection[0].x && snakeDirection[i].y === snakeDirection[0].y) {
            snakePosition.classList.add('snakeHeadPosition')
        }
        else {
            snakePosition.classList.add('snakeBodyPosition')
        }
        snakeGrid.appendChild(snakePosition)
    })

    // default food positioning 
    let foodPosition = document.createElement('div')
    foodPosition.style.gridColumnStart = food.x
    foodPosition.style.gridRowStart = food.y
    foodPosition.style.backgroundImage = `url("${foodImages[randomFoodArray]}")`
    foodPosition.style.backgroundSize = 'cover';
    foodPosition.style.backgroundPosition = 'center';
    foodPosition.style.backgroundRepeat = 'no-repeat';
    snakeGrid.appendChild(foodPosition)

    // moving the snake
    for (let i = 0; i < snakeDirection.length; i++) {
        if (snakeDirection[i].x > 20) {
            snakeDirection[i].x = 1
        }

        else if (snakeDirection[i].x < 1) {
            snakeDirection[i].x = 20
        }

        else if (snakeDirection[i].y > 20) {
            snakeDirection[i].y = 1
        }

        else if (snakeDirection[i].y < 1) {
            snakeDirection[i].y = 20
        }
    }

    if (snakeDirection.length > 2) {
        for (let i = snakeDirection.length - 2; i >= 1; i--) {
            snakeDirection[i + 1] = { ...snakeDirection[i] }
        }
    }

    let snakePreviousX0 = snakeDirection[0].x
    let snakePreviousY0 = snakeDirection[0].y

    snakeDirection[0].x += inputDirection.x
    snakeDirection[0].y += inputDirection.y

    if (inputDirection.x !== 0 || inputDirection.y !== 0) {
        snakeDirection[1].x = snakePreviousX0
        snakeDirection[1].y = snakePreviousY0
    }

    //increment in snake tail when snake eats food and also change the food position
    if (snakeDirection[0].x === food.x && snakeDirection[0].y === food.y) {
        let snakeHeadPosition = document.querySelector('.snakeHeadPosition')
        snakeHeadPosition.style.transform = 'scale(1.7)'
        snakeHeadPosition.style.transition = 'transform 0.5sec ease-in-out'
        foodEatMusic.play()
        snakeDirection.unshift({ x: snakeDirection[0].x + inputDirection.x, y: snakeDirection[0].y + inputDirection.y })
        let a = 2;
        let b = 19;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        randomFoodArray = (Math.random() > 0.5) ? 1 : 0

        //setting up the score
        
        if(score<500){
            score+=10
        }

        if(score>=500 && score<750){
            score+=25
        }

        if(score>=750){
        score += 50
        }

        addScore.innerHTML = `Score: ${score}`

    }

    if(score>highScore) {
        localStorage.setItem('highScore', JSON.stringify(score))
        highScoreupdate.innerHTML =  `High Score🏆: ${score}`
       }

}


//if you bump into yourself
function isCollide(snakeArray) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y) {
            return true
        }
    }
    return false
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (inputDirection.y != 0) {
                break
            }
            snakeMoveMusic.play()
            gameMusic.play()
            inputDirection.y = -1
            inputDirection.x = 0
            break;

        case "ArrowDown":
            if (inputDirection.y != 0) {
                break
            }
            snakeMoveMusic.play()
            gameMusic.play()
            inputDirection.y = +1
            inputDirection.x = 0
            break;

        case "ArrowRight":
            if (inputDirection.x != 0) {
                break
            }
            snakeMoveMusic.play()
            gameMusic.play()
            inputDirection.x = 1
            inputDirection.y = 0
            break;

        case "ArrowLeft":
            if (inputDirection.x != 0) {
                break
            }
            snakeMoveMusic.play()
            gameMusic.play()
            inputDirection.x = -1
            inputDirection.y = 0
            break;

        default:
            break;
    }
})



