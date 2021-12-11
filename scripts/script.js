document.addEventListener('DOMContentLoaded', () => {
  //create board logic
  let board = [];
  let isGameStarted = false;

  function createLogicBoard() {
    board = [];
    for (let i = 0; i < 10; i++) {       //initialize empty board (each row)
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(-1);                                             //(each column)
      }
      board.push(row);
    }
    //fill matrix with bombs
    let bombs = 0;
    while (bombs < 10) {
      const x = Math.floor(Math.random() * board.length);
      const y = Math.floor(Math.random() * board.length);       //generate x and y of where to place bombs
      if (board[x][y] != 'bomb') {
        board[x][y] = 'bomb';                                   //check if that position already has a bomb; if it doesn't, add a 'bomb' to it
        bombs++;                                               //increase amount of bombs to get to 10 max;
      }
    }
    console.log(board);
  }

  //draw board
  function drawBoard() {
    const grid = document.querySelector('.grid'); //make 'grid' element visible to js

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] == 'bomb') {                     //if element in position [x][y] has a bomb, create a div, with a class of 'bomb'
          const bomb = document.createElement('div');
          bomb.classList.add('bomb');
          bomb.setAttribute('id', i + "-" + j);
          bomb.addEventListener('click', function () {
            click(i, j);
          })
          grid.appendChild(bomb);                   //insert bombs to the grid;
        } else {
          const tile = document.createElement('div'); //create 100 divs in HTML;
          tile.classList.add('tile'); //add a class to each tile, named w/ the word attributed in the variable;
          tile.setAttribute('id', i + "-" + j);
          tile.addEventListener('click', function () {
            click(i, j);
          })
          grid.appendChild(tile); //insert each tile into the grid;
        }
      }
    }
  }
  function click(x, y) {       //when cell is clicked, we know the position the person has pressed in the grid;
    const clickedTile = x + "-" + y;
    const gridTile = document.getElementById(clickedTile);
    gridTile.classList.add('clicked');                      //change the class of the clicked tile to 'revealed'
    const neighBombs = countNeighBombs(x, y);
    board[x][y] = neighBombs;
    revealTiles(x, y);   

  }

  //count neighbouring bombs
  function countNeighBombs(x, y) {
    let bombCount = 0;
    if (board[x - 1] != undefined && board[x - 1][y] != undefined && board[x - 1][y] == 'bomb') {
      bombCount++;             //West position
    }
    if (board[x + 1] != undefined && board[x + 1][y] != undefined && board[x + 1][y] == 'bomb') {
      bombCount++;             //East position
    }
    if (board[x] != undefined && board[x][y - 1] != undefined && board[x][y - 1] == 'bomb') {
      bombCount++;             //South position
    }
    if (board[x] != undefined && board[x][y + 1] != undefined && board[x][y + 1] == 'bomb') {
      bombCount++;             //North position
    }
    if (board[x - 1] != undefined && board[x - 1][y - 1] != undefined && board[x - 1][y - 1] == 'bomb') {
      bombCount++;             //Southwest position
    }
    if (board[x + 1] != undefined && board[x + 1][y + 1] != undefined && board[x + 1][y + 1] == 'bomb') {
      bombCount++;           //Northeast position
    }
    if (board[x - 1] != undefined && board[x - 1][y + 1] != undefined && board[x - 1][y + 1] == 'bomb') {
      bombCount++;
    }                         //Northwest position
    if (board[x + 1] != undefined && board[x + 1][y - 1] != undefined && board[x + 1][y - 1] == 'bomb') {
      bombCount++;
    }                         //Southeast position
    return bombCount;
  }

  //recursion
  function revealTiles(x, y){
    if (x < 0 || x >= 10){
      return;
    }
    if (y < 0 || y >= 10){
      return;
    }
    if (board[x][y] == 'bomb'){
      return;
    }
    const clickedTile = x + "-" + y;
    console.log(clickedTile);
    const gridTile = document.getElementById(clickedTile);
    if (gridTile.classList.contains('revealed')){
      return;
    }
    gridTile.classList.add('revealed');

    const neighBombs = countNeighBombs(x, y);
    if (neighBombs > 0){
      board[x][y] = neighBombs;
      return;
    }

    board[x][y] = neighBombs;
    revealTiles(x , y-1);
    revealTiles(x, y+1);
    revealTiles(x-1, y);
    revealTiles(x-1, y+1);
    revealTiles(x-1, y-1);
    revealTiles(x+1, y);
    revealTiles(x+1, y+1);
    revealTiles(x+1, y-1);  
  }

  //event for button to generate board
  document.getElementById('easy-start-button').addEventListener('click', function (e) {
    if (isGameStarted){
      return;
    }
    createLogicBoard();
    drawBoard();
    isGameStarted = true;
    document.getElementById('easy-start-button').innerHTML = 'Refresh 😎';

  })


























});