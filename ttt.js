let box = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgame = document.querySelector(".newgame");
let message = document.querySelector(".message");
let msg = document.querySelector("#msg");
let turnx = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const disablebox = () => {
  for (let b of box) {
    b.disabled = true;
  }
};

const enablebox = () => {
  for (let b of box) {
    b.disabled = false;
    b.innerText = "";
    b.style.backgroundColor = "";
  }
};

const resetgame = () => {
  turnx = true;
  enablebox();
  message.classList.add("hide");
  msg.innerText = ""; // Clear the winner message text
};

const showWinner = (winner) => {
  disablebox();
  msg.innerText = `Congratulations! Winner is ${winner}`;
  message.classList.remove("hide");
};

box.forEach((b) => {
  b.addEventListener("click", function () {
    if (!b.disabled) {
      if (turnx) {
        b.innerText = "X";
        b.style.backgroundColor = "rgb(252, 106, 106)";
        turnx = false;
      } else {
        b.innerText = "O";
        b.style.backgroundColor = "rgb(126, 252, 106)";
        turnx = true;
      }
      b.disabled = true; // Properly disable the box
      checkWinner();
    }
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = box[pattern[0]].innerText;
    let pos2val = box[pattern[1]].innerText;
    let pos3val = box[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("Winner is: " + pos1val);
        showWinner(pos1val);
        return;
      }
    }
  }

  // Check for a draw
  if ([...box].every((b) => b.innerText !== "")) {
    msg.innerText = "It's a draw!";
    message.classList.remove("hide");
  }
};

// Attach event listeners
newgame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
