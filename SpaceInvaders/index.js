const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector('.results')
let currentshooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
const alienRemoved = [];
let results = 0;

for (let i = 0; i < 255; i++) {

    const square = document.createElement("div");
    grid.appendChild(square);

}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];


function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!alienRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}
draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}



squares[currentshooterIndex].classList.add("shooter");

function moveShooter(e) {
    squares[currentshooterIndex].classList.remove("shooter");
    switch (e.key) {
        case 'ArrowLeft':
            if (currentshooterIndex % width !== 0) currentshooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentshooterIndex % width < width - 1) currentshooterIndex += 1;
            break
    }

    squares[currentshooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            goingRight = false;

        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;

    }

    draw();

    if (squares[currentshooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        const element = alienInvaders[i];
        if (element > squares.length) {
            resultsDisplay.innerHTML = "GAME OVER";
            clearInterval(invadersId);
        }

    }
    if (alienRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = `YOU WIN!!`;
        clearInterval(invadersId);
    }
}

invadersId = setInterval(moveInvaders, 500);

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentshooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex);
            alienRemoved.push(alienRemoval);
            results++
            resultsDisplay.innerHTML = `results: ${results}`;

        }
    }


    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100);
    }

}
document.addEventListener("keyup", shoot)