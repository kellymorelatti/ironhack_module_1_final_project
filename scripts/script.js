document.addEventListener('DOMContentLoaded', () => {
  //create board logic
  let board = [10][10]; 
  
  function createLogicBoard(){
    for (let i = 0; i < board.length; i++){       //initialize empty board (each row)
      for (let j = 0; j < board[i].length; j++){
      board[i][j] = 'tile';                                             //(each column)
      } 
    }
    //fill matrix with bombs
    let bombs = 0;
    while (bombs < 10){
      const x = Math.floor(Math.random()*board.length) + 1;
      const y = Math.floor(Math.random()*board.length) + 1;
      
    }
  }







  //draw board




  //event for button to generate board

























});