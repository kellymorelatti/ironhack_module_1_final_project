document.addEventListener('DOMContentLoaded', () => {
  //create board logic
  var board = []; 
  
  function createLogicBoard(){
    for (let i = 0; i < 10; i++){       //initialize empty board (each row)
      let row = [];
      for (let j = 0; j < 10; j++){
      row.push(-1);                                             //(each column)
      } 
      board.push(row);                          
    }
    //fill matrix with bombs
    let bombs = 0;
    while (bombs < 10){
      const x = Math.floor(Math.random()*board.length);
      const y = Math.floor(Math.random()*board.length);       //generate x and y of where to place bombs
      if (board[x][y] != 'bomb'){
        board[x][y] = 'bomb';                                     //check if that position already has a bomb; if it doesn't, add a 'bomb' to it
        bombs ++;                       //increase amount of bombs to get to 10 max;
      }
    }
    console.log(board);
  }

  //draw board
  function drawBoard(){
    const grid = document.querySelector('.grid');
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] == 'bomb'){
          const bomb = document.createElement('div');
          bomb.setAttribute('id', i);
          bomb.classList.add('bomb');
          grid.appendChild(bomb);
        } else {
          const tile = document.createElement('div'); //create 100 divs in HTML;
          tile.setAttribute('id', i); //attribute an id to each tile;
          tile.classList.add('tile'); //add a class to each tile, named w/ the word attributed in the variable;
          grid.appendChild(tile); //insert each tile into the grid;
        }
      }
    }

  }

  //event for button to generate board
  document.getElementById('easy-start-button').addEventListener('click', function(e){
    createLogicBoard();
    drawBoard();
  })
























});