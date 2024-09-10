let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newGameButton=document.querySelector("#newbutton");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;//playerX,playerY
let count=0;

const winningPatterns=[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8],
];

const resetGame=()=>{
  turnO=true;
  count=0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click",() =>{
    if(turnO){
      //playerO Turn
      box.innerText="O";
      turnO=false;
    }else{
      box.innerText="X";
      turnO=true;
    }
    box.disabled = true;
    count++;

    let winnerWinner=whoIsTheWinner();

    if(count===9 && !winnerWinner){
      gameDraw();
  }
  });
});

const gameDraw=()=>{
  msg.innerText=`Game Draw`
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes=()=>{
  for(let box of boxes){
    box.disabled=true;
  }
};

const enableBoxes=()=>{
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
  }
};

const showWinner=(winner)=>{
  msg.innerText=`Congragulations!!You won ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const whoIsTheWinner=()=>{
  for(let pattern of winningPatterns){
    let pos1= boxes[pattern[0]].innerText;
    let pos2= boxes[pattern[1]].innerText;
    let pos3= boxes[pattern[2]].innerText;

    if(pos1!="" && pos2!="" && pos3!=""){
      if(pos1===pos2 && pos2===pos3){
        console.log("WINNER",pos1);
        showWinner(pos1);
        return true;
      }
    }

  }
};

newGameButton.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
