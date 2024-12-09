const startGame = () => {
    if (gameStarted) return;
    gameStarted = true;
    level = 0;
    sequence = [];
    nextLevel();
};


const nextLevel = () => {
    level++;
    heading.textContent = `Level ${level}`;
    userSequence = [];
    
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    sequence.push(randomButton);
    sounds.program.play();
    flashButton(randomButton);
}


const flashButton = (button) => {
    return new Promise((resolve) => {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
            setTimeout(resolve, 250);
        }, 500);
    });
}


const gameOver = () => {
    sounds.wrong.play();
    heading.textContent = 'Game over! Press any key to restart';
    gameStarted = false;
    sequence = [];
    userSequence = [];
};


const buttons = document.querySelectorAll('button');
const heading = document.querySelector('.heading');

const sounds = {
    program: new Audio('./Sounds/program.wav'),
    user: new Audio('./Sounds/user.wav'),
    wrong: new Audio('Sounds/wrong.wav'),
};

let sequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!gameStarted) return;

        userSequence.push(button);
        sounds.user.play();
        flashButton(button);

        const index = userSequence.length - 1;

        if (userSequence[index] !== sequence[index]) {
            gameOver();
            return;
        }

        if (userSequence.length === sequence.length) {
            setTimeout(nextLevel, 1000);
        }
    });
});

document.addEventListener('keydown', startGame);