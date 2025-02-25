let playerScore = 0;
let computerScore = 0;
let computerOption = "";

function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    computerOption = options[randomIndex];
    return computerOption;
}

function hasPlayerWonTheRound(player, computer) {
    return (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Paper") ||
        (player === "Paper" && computer === "Rock")
    );
}

function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();

    const userOptionPt = userOption === "Rock" ? "Pedra" : userOption === "Paper" ? "Papel" : "Tesoura";
    const computerResultPt = computerResult === "Rock" ? "Pedra" : computerResult === "Paper" ? "Papel" : "Tesoura";

    if (hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        return `Você venceu! ${userOptionPt} vence ${computerResultPt}`;
    } else if (computerResult === userOption) {
        return `Empate! Ambos escolheram ${userOptionPt}`;
    } else {
        computerScore++;
        return `Computador venceu! ${computerResultPt} vence ${userOptionPt}`;
    }
}


const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
    roundResultsMsg.innerText = getRoundResults(userOption);
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;

    if (userOption !== computerOption) {
        if (hasPlayerWonTheRound(userOption, computerOption)) {
            playerScoreSpanElement.parentElement.classList.add('score-update');
            setTimeout(() => {
                playerScoreSpanElement.parentElement.classList.remove('score-update');
            }, 500);
        } else if (userOption !== computerOption) {
            computerScoreSpanElement.parentElement.classList.add('score-update');
            setTimeout(() => {
                computerScoreSpanElement.parentElement.classList.remove('score-update');
            }, 500);
        }
    }

    if (playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${playerScore === 3 ? "Você" : "Computador"} venceu o jogo!`;
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;

    roundResultsMsg.innerText = "Escolha uma opção para começar!";
    winnerMsgElement.innerText = "";

    optionsContainer.style.display = "flex";
    resetGameBtn.style.display = "none";
}

resetGameBtn.addEventListener("click", resetGame);

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
    showResults("Rock");
});

paperBtn.addEventListener("click", function () {
    showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
    showResults("Scissors");
});