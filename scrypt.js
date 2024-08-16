document.addEventListener('keydown', function(event) {
    let player = document.getElementById('player');
    let playerRect = player.getBoundingClientRect();
    let gameContainer = document.getElementById('gameContainer');
    let containerRect = gameContainer.getBoundingClientRect();
    let moveAmount = 5;

    switch(event.code) {
        case 'Space':
            fly();
            break;
        case 'KeyW':
            if (playerRect.top > containerRect.top) {
                player.style.top = (playerRect.top - moveAmount) + 'px';
            }
            break;
        case 'KeyS':
            if (playerRect.bottom < containerRect.bottom) {
                player.style.top = (playerRect.top + moveAmount) + 'px';
            }
            break;
        case 'KeyA':
            if (playerRect.left > containerRect.left) {
                player.style.left = (playerRect.left - moveAmount) + 'px';
            }
            break;
        case 'KeyD':
            if (playerRect.right < containerRect.right) {
                player.style.left = (playerRect.left + moveAmount) + 'px';
            }
            break;
    }

    function fly() {
        if (!player.classList.contains('fly')) {
            player.classList.add('fly');
            setTimeout(() => player.classList.remove('fly'), 500); // Mantiene el vuelo por 500ms
        }
    }
});

let isAlive = setInterval(function() {
    let player = document.getElementById('player');
    let building = document.getElementById('building');

    let playerRect = player.getBoundingClientRect();
    let buildingRect = building.getBoundingClientRect();

    if (buildingRect.right > playerRect.left &&
        buildingRect.left < playerRect.right &&
        buildingRect.bottom > playerRect.top &&
        buildingRect.top < playerRect.bottom) {
        alert('¡Te chocaste con el edificio!');
        // Aquí podrías agregar lógica para reiniciar el juego o detenerlo.
    }
}, 10);
