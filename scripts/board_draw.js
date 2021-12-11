class BoardDraw {

  constructor(boardLogic){
    this.boardLogic = boardLogic;
  }

  createId(x, y){
    return x + "-" + y;
  }

  drawBoard() {
    const grid = document.querySelector('.grid'); //make 'grid' element visible to js

    for (let i = 0; i < this.boardLogic.gridDimension; i++) {
      for (let j = 0; j < this.boardLogic.gridDimension; j++) {
        
        const tile = document.createElement('div'); //create 100 divs in HTML;
        tile.classList.add('tile'); //add a class to each tile, named w/ the word attributed in the variable;
        tile.setAttribute('id', this.createId(i,j));
        tile.addEventListener('click', () => {
          this.click(i, j);
        })
        tile.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          this.addFlag(i, j);
        })
        grid.appendChild(tile); //insert each tile into the grid;
      }
    }
  }

  click(x, y) {       //when cell is clicked, we know the position the person has pressed in the grid;    
    if (this.boardLogic.checkGameOver(x, y)){
      alert('💥Boom!💥 Game Over');
      this.revealEntireBoard(x, y, false);
      return;
    }

    const clickedTile = this.createId(x, y);
    const gridTile = document.getElementById(clickedTile);
    gridTile.classList.add('clicked');                      //change the class of the clicked tile to 'revealed'
    const neighBombs = this.boardLogic.adjacentNumbers[x][y];
    this.boardLogic.board[x][y] = neighBombs;

    this.revealTiles(x, y);  

    if (this.boardLogic.checkWin(x,y)){
      this.revealEntireBoard(x, y, true);
      alert('Congrats 🤓! You won 🎉🎉');
    }
  }

  revealEntireBoard(x, y, isWin){

    const clickedTile = this.createId(x, y);
    const clickedBomb = document.getElementById(clickedTile);    
    clickedBomb.classList.add('clicked-bomb');
    clickedBomb.innerHTML = '💣️';
    clickedBomb.style.backgroundColor = '#ffff00';
    clickedBomb.style.fontSize = '3em';

    for (let i = 0; i < this.boardLogic.gridDimension; i++) {
      for (let j = 0; j < this.boardLogic.gridDimension; j++) {
        const clickedTile = this.createId(i, j);

        if(x == i && j == y){
          continue;
        }

        if (this.boardLogic.board[i][j] == this.boardLogic.BOMB_TILE) {
          const bomb = document.getElementById(clickedTile);
          bomb.classList.add('bomb');
          bomb.style.backgroundColor = "#63a19c";
          bomb.style.fontSize = "3em";
          bomb.setAttribute('id', clickedTile);
          
          if (isWin){
            bomb.innerHTML = '🚩';
          } else {
            bomb.innerHTML = '💣️';
          }
        } else {
          const tile = document.getElementById(clickedTile); //create 100 divs in HTML;
          tile.classList.add('revealed'); //add a class to each tile, named w/ the word attributed in the variable;
          tile.style.fontSize = '3em';
          tile.style.backgroundColor = "#8cd1cb";
          tile.style.color = "#9e8c5a";
          tile.style.textAlign = "center";
          tile.setAttribute('id', this.createId(i, j));
          if (this.boardLogic.adjacentNumbers[i][j] > 0){
            tile.innerHTML = this.boardLogic.adjacentNumbers[i][j];
          } else {
            tile.innerHTML = '';
          }
        }
      }
    }
  }

  //recursion to reveal neighbouring tiles;
  revealTiles(x, y){
    if (x < 0 || x >= this.boardLogic.gridDimension){         //stop criteria for rows of arrays (top to bottom)
      return;
    }
    if (y < 0 || y >= this.boardLogic.gridDimension){         //stop criteria for columns (each element inside the arrays -> left to right)
      return;
    }
    if (this.boardLogic.board[x][y] == this.boardLogic.BOMB_TILE){    //stop criteria for fields that contain bombs
      return;
    }
    


    const clickedTile = this.createId(x, y);
    const gridTile = document.getElementById(clickedTile);
    if (gridTile.classList.contains('revealed')){             //stop criteria when tile is already revealed and we don't want to reveal its neighbouring tiles;
      return;
    }
    
    if (gridTile.classList.contains('flag')){
      return;
    }

    gridTile.classList.add('revealed');
    gridTile.style.fontSize = '3em';
    gridTile.style.backgroundColor = "#8cd1cb";
    gridTile.style.color = "#9e8c5a";
    gridTile.style.textAlign = "center";

    const neighBombs = this.boardLogic.adjacentNumbers[x][y];
    if (neighBombs > 0){                                        //stop criteria for when tile has a bomb surrounding it;                                    
      this.boardLogic.board[x][y] = neighBombs;
      gridTile.innerHTML = this.boardLogic.board[x][y];
      return;
    }

    this.boardLogic.board[x][y] = neighBombs;
    this.revealTiles(x , y-1);
    this.revealTiles(x, y+1);
    this.revealTiles(x-1, y);
    this.revealTiles(x-1, y+1);
    this.revealTiles(x-1, y-1);                      //recursion to check neighbouring tiles as long as a stop criteria is not reached;
    this.revealTiles(x+1, y);
    this.revealTiles(x+1, y+1);
    this.revealTiles(x+1, y-1);  
  }

  addFlag(x, y){
    const rightClickedTile = this.createId(x, y);

    const tile = document.getElementById(rightClickedTile);
    if (tile.classList.contains('flag')){
      tile.classList.remove('flag');
      tile.innerHTML = '';
    }else if (this.boardLogic.board[x][y] == this.boardLogic.UNREVEALED_TILE || this.boardLogic.board[x][y] == this.boardLogic.BOMB_TILE){
      tile.innerHTML = "🚩";
      tile.classList.add('flag');
      tile.style.fontSize = '3em';
      tile.style.textAlign = 'center';
    }
  }

}