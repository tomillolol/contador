const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let currentNumber = 1;
let intervalId;
let timer = 0;
let numberIntervalId;

const totalPoints = 100;

// Mueve la bola con el puntero del mouse
document.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    let x = e.clientX - rect.left - player.clientWidth / 2;
    let y = e.clientY - rect.top - player.clientHeight / 2;

    x = Math.max(Math.min(x, gameContainer.clientWidth - player.clientWidth), 0);
    y = Math.max(Math.min(y, gameContainer.clientHeight - player.clientHeight), 0);

    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
});

// Genera un número en una posición aleatoria
function createNumber(num) {
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = num;

    const size = 30;
    number.style.width = `${size}px`;
    number.style.height = `${size}px`;
    number.style.top = `${Math.random() * (gameContainer.clientHeight - size)}px`;
    number.style.left = `${Math.random() * (gameContainer.clientWidth - size)}px`;

    number.addEventListener('click', () => {
        if (parseInt(number.textContent) === currentNumber) {
            score += 1;
            scoreDisplay.textContent = `Puntuación: ${score}`;
            currentNumber += 1;
            gameContainer.removeChild(number);

            if (score >= totalPoints) {
                endGame('WIN');
            } else {
                createNumber(currentNumber);
            }
        } else {
            endGame('PERDIDO');
        }
    });

    gameContainer.appendChild(number);
}

// Actualiza el temporizador
function updateTimer() {
    timer += 1;
    timerDisplay.textContent = `Tiempo: ${timer} segundos`;
}

// Termina el juego
function endGame(result) {
    clearInterval(intervalId);
    clearInterval(numberIntervalId);
    alert(`¡Juego terminado! Resultado: ${result}`);
}

// Comienza el juego
function startGame() {
    createNumber(currentNumber);
    intervalId = setInterval(updateTimer, 1000);
    numberIntervalId = setInterval(() => createNumber(currentNumber), 2000);
}

startGame();
