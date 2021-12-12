class BoardLogic {
  constructor(totalOfBombs, gridDimension){
    this.board = [];
    this.adjacentNumbers = [];
    this.totalOfBombs = totalOfBombs;
    this.gridDimension = gridDimension;
    this.UNREVEALED_TILE = -1;
    this.BOMB_TILE = 'bomb';
    this.isGameEnded = false;
    this.flags = 0;
  } 
  
  createLogicBoard() {
    this.board = [];
    for (let i = 0; i < this.gridDimension; i++) {       //initialize empty board (each row)
      let row = [];
      for (let j = 0; j < this.gridDimension; j++) {                             //(each column)
        row.push(this.UNREVEALED_TILE);                     // -1 for uncliked and unrevealed tiles;
      }
      this.board.push(row);
    }
    //fill matrix with bombs
    let bombs = 0;
    while (bombs < this.totalOfBombs) {
      const x = Math.floor(Math.random() * this.board.length);
      const y = Math.floor(Math.random() * this.board.length);       //generate x and y of where to place bombs
      if (this.board[x][y] != this.BOMB_TILE) {
        this.board[x][y] = this.BOMB_TILE;                                   //check if that position already has a bomb; if it doesn't, add a 'bomb' to it
        bombs++;                                               //increase amount of bombs to get to 10 max;
      }
    }
    this.calcAdjBombs();
    console.log(this.board);
  }
  
  calcAdjBombs(){
    for (let i = 0; i < this.gridDimension; i++) {
      let row = [];
      for (let j = 0; j < this.gridDimension; j++) {
        row[j] = this.countNeighBombs(i, j);
      }
      this.adjacentNumbers.push(row);
    }
  }

  countNeighBombs(x, y) {
    let bombCount = 0;
    if (this.board[x] != undefined && this.board[x][y + 1] != undefined && this.board[x][y + 1] == this.BOMB_TILE) {
      bombCount++;             //North position
    }
    if (this.board[x - 1] != undefined && this.board[x - 1][y] != undefined && this.board[x - 1][y] == this.BOMB_TILE) {
      bombCount++;             //West position
    }
    if (this.board[x] != undefined && this.board[x][y - 1] != undefined && this.board[x][y - 1] == this.BOMB_TILE) {
      bombCount++;             //South position
    }
    if (this.board[x + 1] != undefined && this.board[x + 1][y] != undefined && this.board[x + 1][y] == this.BOMB_TILE) {
      bombCount++;             //East position
    }
    if (this.board[x - 1] != undefined && this.board[x - 1][y - 1] != undefined && this.board[x - 1][y - 1] == this.BOMB_TILE) {
      bombCount++;             //Southwest position
    }
    if (this.board[x + 1] != undefined && this.board[x + 1][y + 1] != undefined && this.board[x + 1][y + 1] == this.BOMB_TILE) {
      bombCount++;           //Northeast position
    }
    if (this.board[x - 1] != undefined && this.board[x - 1][y + 1] != undefined && this.board[x - 1][y + 1] == this.BOMB_TILE) {
      bombCount++;
    }                         //Northwest position
    if (this.board[x + 1] != undefined && this.board[x + 1][y - 1] != undefined && this.board[x + 1][y - 1] == this.BOMB_TILE) {
      bombCount++;
    }                         //Southeast position
    return bombCount;
  }

  checkWin (){
    let coveredTiles = 0;
    for (let i = 0; i < this.gridDimension; i++) {
      for (let j = 0; j < this.gridDimension; j++) {
        if (this.board[i][j] == this.UNREVEALED_TILE){
          coveredTiles++;
        }
      }
    }
    if (coveredTiles == 0){
      return true;
    } else {
      return false;
    }
  }

  checkGameOver (x, y){
    if (this.board[x][y] == this.BOMB_TILE){
      return true;
    } else {
      return false;
    }
  }
}