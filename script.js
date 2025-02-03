let clickSound = new Audio("sound/start.mp3.wav");
let winSound = new Audio("sound/win.mp3.wav");

let startBtn = document.querySelector("#start-btn");
let gameSection = document.querySelector("#game-section");
let welcomeSection = document.querySelector("#welcome-section");

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true -> O, false -> X

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

startBtn.addEventListener("click", () => {
    welcomeSection.classList.add("hide");
    gameSection.classList.remove("hide");
    resetGame();
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play(); // Play click sound

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#1E90FF"; // Blue for O
        } else {
            box.innerText = "X";
            box.style.color = "#FF4500"; // Red for X
        }
        turnO = !turnO;
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "black";
    });
};

const showWinner = (winner) => {
    msg.innerHTML = `🎉 Congratulations! Winner is <span style="color: ${winner === "X" ? "#FF4500" : "#1E90FF"}">${winner}</span> 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // Stop game after win
    winSound.play(); // Play win sound
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner", pos1Val);
            showWinner(pos1Val);
            return;
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

