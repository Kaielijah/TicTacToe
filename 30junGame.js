// console log prints "Tic Tac Toe"

function init () {
console.log("Tic Tac Toe");
}

window.addEventListener("load", init, false);
/*
// click on button to reload page
function clear() {
  var button = document.getElementById('button');
  document.location.reload();
}
button.addEventListener("click", clear, false);
//element.addEventListener(event, function, useCapture);

*/
function startGame() {
    for (var i = 1; i <= 9; i = i+1) {
      clearboard(i);
    }
  document.turn = "X";
  if (Math.random() < 0.5){
      document.turn = "0";
  }
  document.winner = null;
  setMessage(document.turn + " gets to start");
}
window.addEventListener("load", startGame, false);


function setMessage(msg){
  document.getElementById('message').innerText= msg;
}



function nextMove(box){
  if(document.winner !== null){
    setMessage(document.winner + " already won the game.");

  } else if (box.innerText === "") {
      box.innerText = document.turn;
      switchTurn();

} else {
    setMessage("Click on an empty box!");
  }
}


function switchTurn () {
    if (checkWinner(document.turn)){
        setMessage("Congratulations, " + document.turn + "! you win!");
        document.winner = document.turn;
    } else if (document.turn == "X"){
      document.turn = "O";
      setMessage("it's " + document.turn + "'s turn!");

    } else {
      document.turn = "X";
      setMessage("it's " + document.turn + "'s turn!");

    }

}

switchTurn.addEventListener("click",nextMove(this),false);

function checkWinner(move){
  var result = false;
  if (checkRow(1,2,3, move) ||
      checkRow(4,5,6, move) ||
      checkRow(7,8,9, move) ||
      checkRow(1,4,7, move) ||
      checkRow(2,5,8, move) ||
      checkRow(3,6,9, move) ||
      checkRow(1,5,9, move) ||
      checkRow(3,5,7, move)) {
        result = true;
      } 
      return result;
}

function checkRow (a,b,c, move) {
  var result = false;
  if (whichBox(a) == move && whichBox(b) == move && whichBox(c) == move){
      result = true;
  }
  return result;
}

function whichBox(number){

  return document.getElementById("b" + number).innerText;

}

function clearboard(number){
   document.getElementById("b" + number).innerText= "";

}
