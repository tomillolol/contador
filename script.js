const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let currentNumber = 1;
let intervalId;
let timer = 0;

const totalPoints = 100;

document.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    let x = e.clientX - rect.left - player.clientWidth / 2;
    let y = e.clientY - rect.top - player.clientHeight / 2;

    x = Math.max(Math.min(x, gameContainer.clientWidth - player.clientWidth), 0);
    y = Math.max(Math.min(y, gameContainer.clientHeight - player.clientHeight), 0);

    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
});

function createNumbers() {
    for (let num = 1; num <= totalPoints; num++) {
        const number = document.createElement('div');
        number.classList.add('number');
        number.textContent = num;

        const size = 30;
        number.style.width = `${size}px`;
        number.style.height = `${size}px`;
        number.style.top = `${Math.random() * (gameContainer.clientHeight - size)}px`;
        number.style.left = `${Math.random() * (gameContainer.clientWidth - size)}px`;

        number.dataset.number = num;

        gameContainer.appendChild(number);
    }
}

function checkCollision() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        const rect = number.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (!(playerRect.right < rect.left || 
              playerRect.left > rect.right || 
              playerRect.bottom < rect.top || 
              playerRect.top > rect.bottom)) {
            const num = parseInt(number.dataset.number);
            if (num === currentNumber) {
                score += 1;
                scoreDisplay.textContent = `Puntuación: ${score}`;
                currentNumber += 1;
                gameContainer.removeChild(number);

                if (score >= totalPoints) {
                    endGame('WIN');
                }
            } else {
                endGame('PERDIDO');
            }
        }
    });
}

function updateTimer() {
    timer += 1;
    timerDisplay.textContent = `Tiempo: ${timer} segundos`;
}

function endGame(result) {
    clearInterval(intervalId);
    alert(`¡Juego terminado! Resultado: ${result}`);
}

function startGame() {
    createNumbers();
    intervalId = setInterval(updateTimer, 1000);
    setInterval(checkCollision, 50);
}

startGame();
