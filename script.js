const boxes = document.querySelectorAll(".box");
const gameInfo =document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

// creating a fuction to intiate the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",];
    // empty in UI as well
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //initialise box with all css properties again
        box.classList = `box box${index+1}`
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid [position[2]]) ){

            //check if winner is x
            if(gameGrid[position[0]] === "X")
            
                    answer = "X";
            
                

            else
                
                answer = "O";
                        
            

            
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            }) //disabling mouse actions

            // now we know X/O is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            }
});

    // we already got the winner, show winner and activate new button
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //lets check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    // board is filled then game is tie
    if(fillCount === 9) {
        gameInfo.innerText = "Draw!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer; //internally setting currentPlayer
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swapping 
        swapTurn();
        //check if someone wins
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" ,initGame);