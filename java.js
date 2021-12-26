function computerSelection() {
    // value from 1 to 3
    value = Math.floor((Math.random() * 3) + 1);
    
    // switch statement that takes in value
    switch (value) {
        case 1:
            return "rock";
            break;
        case 2:
            return "paper";
            break;
        case 3:
            return "scissors";
            break;
    }
}

let winner = '';
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('button');

const announcementPlayer = document.createElement('h3');
const announcementComputer = document.createElement('h3');
const announcementResult = document.createElement('h4');
const resetButton = document.createElement('button');
resetButton.classList.add('reset');
const announcementContainer = document.getElementById('announcement');

buttons.forEach(button => {
    button.addEventListener('click', playRound);
})

function playRound(button) {
    
    let message = 'It\'s a draw';

    previousPlayerScore = playerScore;
    previousComputerScore = computerScore;

    playerSelects = button.target.id;
    playerSelects = playerSelects.toLowerCase();

    computerSelects = computerSelection();

    if (playerSelects == "rock" && computerSelects == "paper") {
        computerScore++;
        message = "You lost this round";
    }
    if (playerSelects == "rock" && computerSelects == "scissors") {
        playerScore++;
        message = "You won this round";
    }
    if (playerSelects == "paper" && computerSelects == "rock") {
        playerScore++;
        message = "You won this round";
    }
    if (playerSelects == "paper" && computerSelects == "scissors") {
        computerScore++;
        message = "You lost this round";
    }
    if (playerSelects == "scissors" && computerSelects == "rock") {
        computerScore++;
        message = "You lost this round";
    }
    if (playerSelects == "scissors" && computerSelects == "paper") {
        playerScore++;
        message = "You won this round";
    }
   

    announcementPlayer.textContent = `Player = ${playerSelects}`;
    announcementComputer.textContent = `Computer = ${computerSelects}`;
    announcementResult.textContent = message;
    announcementContainer.appendChild(announcementPlayer);
    announcementContainer.appendChild(announcementComputer);
    announcementContainer.appendChild(announcementResult);
    
    displayScore();
    checkGameEnd(playerScore, computerScore);
} 

function displayScore() {
    const playerScoreTotal = document.getElementById('playerTotal');
    const computerScoreTotal = document.getElementById('computerTotal');
    playerScoreTotal.textContent = `Player: ${playerScore}`;
    computerScoreTotal.textContent = `Computer: ${computerScore}`;

    if (previousPlayerScore < playerScore) {
        playerScoreTotal.style.color = 'red';
    } else {
        playerScoreTotal.style.color = 'blue';
    }

    if (previousComputerScore < computerScore) {
        computerScoreTotal.style.color = 'red';
    } else {
        computerScoreTotal.style.color = 'blue';
    }
}

function checkGameEnd(score1, score2) {
    if (score1 == 5 || score2 ==5){
        announcementResult.textContent = finalResult(playerScore, computerScore);
        resetButton.textContent = "Play Again";
        announcementContainer.appendChild(resetButton);

        console.log(finalResult(playerScore, computerScore));
        console.log('End of Game');

        buttons.forEach(button => {
            button.removeEventListener('click', playRound);
            button.classList.add('disabled');
        });

        resetButton.addEventListener('click', resetGame);

        playerScore = 0;
        computerScore = 0;
    }
}

function finalResult(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return `Player wins ${playerScore} to ${computerScore}.`
    } else if (playerScore < computerScore) {
        return `Computer wins ${computerScore} to ${playerScore}.`
    } else {
        return "It\'s a draw."
    }
}

function resetGame() {
    announcementContainer.removeChild(resetButton);
    announcementContainer.removeChild(announcementPlayer);
    announcementContainer.removeChild(announcementComputer);
    announcementContainer.removeChild(announcementResult);

    buttons.forEach(button => {
        button.addEventListener('click', playRound);
        button.classList.remove('disabled');
    })
}