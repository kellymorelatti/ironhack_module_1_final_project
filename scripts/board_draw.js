class BoardDraw {
  constructor(boardLogic, width, height, tileSize, fontSize) {
    this.boardLogic = boardLogic;
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.fontSize = fontSize;
    this.initialTime = Date.now();
    this.timer = window.setInterval(() => this.checkTime(), 100);
    this.bombSound = new Audio('./sounds/bomb.wav');
    this.bombSound.volume = 0.05;
    this.winSound = new Audio('./sounds/win.wav');
    this.winSound.volume = 0.3;
  }

  //TIMER
  //Verify how much time has passed since the game started
  checkTime() {
    let timeDifference = Date.now() - this.initialTime;
    let formatted = this.convertTime(timeDifference);
    document.getElementById('timer').innerHTML = '' + formatted;
  }

  //convert the seconds and minutes into the two-digit format so it's aesthetically more pleasing
  convertTime(miliseconds) {
    let totalSeconds = Math.floor(miliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let twoDigitMinutes = ("00" + minutes).slice(-2);
    let seconds = totalSeconds - minutes * 60;
    let twoDigitSeconds = ("00" + seconds).slice(-2);
    let totalTime = twoDigitMinutes + ':' + twoDigitSeconds;
    return totalTime;
  }

  //function that is going to be oftenly used to determine each tile's ID in regards to their position on the matrix;
  createId(x, y) {
    return x + "-" + y;
  }

  //draw board according to the properties defined previously;
  drawBoard() {
    const grid = document.querySelector('.grid');
    grid.style.width = this.width;
    grid.style.height = this.height;

    for (let i = 0; i < this.boardLogic.gridDimension; i++) {
      for (let j = 0; j < this.boardLogic.gridDimension; j++) {

        const tile = document.createElement('div'); //create 100 (width x height) divs in HTML;
        tile.classList.add('tile');
        tile.style.width = this.tileSize;
        tile.style.height = this.tileSize;
        tile.setAttribute('id', this.createId(i, j));
        tile.addEventListener('click', () => {        //call click method for each tile and obtain its position;
          this.click(i, j);
        })
        tile.addEventListener('contextmenu', (ev) => {      //right click method for each tile (and add flag);
          ev.preventDefault();
          this.addFlag(i, j);
        })
        grid.appendChild(tile); //insert each tile into the grid;
      }
    }
  }

  click(x, y) {

    const clickedTile = this.createId(x, y);                //assign an ID to each clickedTile
    const gridTile = document.getElementById(clickedTile);  //making each tile visible to js

    if (gridTile.classList.contains('flag') || this.boardLogic.isGameEnded) {    //Bug fix: leave the flags on the board if game ended;
      return;
    }

    if (this.boardLogic.checkGameOver(x, y)) {       //conditional for when a bomb is hit
      this.revealEntireBoard(x, y, false);
      this.bombSound.play();
      alert('💥Boom! 💥 Game Over!');
      return;
    }

    gridTile.classList.add('clicked');                      //change the class of the clicked tile to 'clicked'
    const neighBombs = this.boardLogic.adjacentNumbers[x][y];
    this.boardLogic.board[x][y] = neighBombs;               //find neighbouring bombs to each tile


    this.revealTiles(x, y);                             //calling recursive method to reveal tiles that do not have adj bombs and stop when bomb totals are found;
    this.changeNumberColor(x, y);

    //end game when player reveals all the tiles
    if (this.boardLogic.checkWin(x, y)) {
      this.revealEntireBoard(x, y, true);
      this.winSound.play();
      const totalTime = document.getElementById('timer').innerHTML;
      alert(`Congrats 🤓! You've completed the game in ${totalTime} 🎉🎉`);
      return;
    }
  }

  //change colors of the numbers:
  changeNumberColor(x, y) {
    const clickedTile = this.createId(x, y);
    const tile = document.getElementById(clickedTile);

    if (this.boardLogic.adjacentNumbers[x][y] == 1) {
      tile.style.color = '#0000FF';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 2) {
      tile.style.color = '#007B00';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 3) {
      tile.style.color = '#EF190B';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 4) {
      tile.style.color = '#9e8c5a';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 5) {
      tile.style.color = '#b72de5';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 6) {
      tile.style.color = '#731F19';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 7) {
      tile.style.color = '#328a23';
    }
    if (this.boardLogic.adjacentNumbers[x][y] == 8) {
      tile.style.color = '#cec92d';
    }
  }

  //Reveal entire board once the game ended
  revealEntireBoard(x, y, isWin) {
    this.boardLogic.isGameEnded = true;
    const clickedTile = this.createId(x, y);
    const clickedBomb = document.getElementById(clickedTile);

    clearTimeout(this.timer);           //stop the timer;

    //almost the same steps as if we had clicked the each tile ourselves, but automatically instead;
    for (let i = 0; i < this.boardLogic.gridDimension; i++) {
      for (let j = 0; j < this.boardLogic.gridDimension; j++) {
        const clickedTile = this.createId(i, j);

        this.changeNumberColor(i, j);

        if (this.boardLogic.board[i][j] == this.boardLogic.BOMB_TILE) {
          const bomb = document.getElementById(clickedTile);
          bomb.classList.add('flag');
          bomb.style.backgroundColor = "#63a19c";
          bomb.style.fontSize = this.fontSize;
          bomb.setAttribute('id', clickedTile);

          //place a bomb for when bombs are revealed/ flag for when all numbered tiles are correctly revealed;
          if (isWin) {
            bomb.innerHTML = '🚩';
          } else {
            bomb.innerHTML = '💣️';

          }
        } else {
          const tile = document.getElementById(clickedTile);
          tile.classList.add('revealed');
          tile.style.fontSize = this.fontSize;
          tile.style.backgroundColor = '#8cd1cb';         //still have not figured out why, but CSS did not work on this part;
          tile.style.textAlign = 'center';
          tile.setAttribute('id', this.createId(i, j));
          if (this.boardLogic.adjacentNumbers[i][j] > 0) {
            tile.innerHTML = this.boardLogic.adjacentNumbers[i][j];
          } else {
            tile.innerHTML = '';
          }
        }
      }
    }

    if (!isWin) {
      clickedBomb.classList.add('clicked-bomb');
      clickedBomb.innerHTML = '💣️';
      clickedBomb.style.backgroundColor = '#ffff00';
      clickedBomb.style.fontSize = this.fontSize;
    } else {
      const counter = document.getElementById('bombs-left');
      counter.innerHTML = `🚩 ${this.boardLogic.totalOfBombs}/${this.boardLogic.totalOfBombs} 💣️`
    }
  }

  //recursion to reveal neighbouring tiles;
  revealTiles(x, y) {
    if (x < 0 || x >= this.boardLogic.gridDimension) {         //stop criteria for rows of arrays (top to bottom)
      return;
    }
    if (y < 0 || y >= this.boardLogic.gridDimension) {         //stop criteria for columns (each element inside the arrays -> left to right)
      return;
    }
    if (this.boardLogic.board[x][y] == this.boardLogic.BOMB_TILE) {    //stop criteria for fields that contain bombs
      return;
    }

    this.changeNumberColor(x, y);

    const clickedTile = this.createId(x, y);
    const gridTile = document.getElementById(clickedTile);
    if (gridTile.classList.contains('revealed')) {             //stop criteria when tile is already revealed and we don't want to reveal its neighbouring tiles;
      return;
    }

    if (gridTile.classList.contains('flag')) {
      return;
    }

    gridTile.classList.add('revealed');
    gridTile.style.fontSize = this.fontSize;
    gridTile.style.backgroundColor = "#8cd1cb";
    gridTile.style.textAlign = "center";

    const neighBombs = this.boardLogic.adjacentNumbers[x][y];
    if (neighBombs > 0) {                                        //stop criteria for when tile has a bomb surrounding it;                                    
      this.boardLogic.board[x][y] = neighBombs;
      gridTile.innerHTML = this.boardLogic.board[x][y];
      return;
    }

    this.boardLogic.board[x][y] = neighBombs;
    this.revealTiles(x, y - 1);
    this.revealTiles(x, y + 1);
    this.revealTiles(x - 1, y);
    this.revealTiles(x - 1, y + 1);
    this.revealTiles(x - 1, y - 1);                      //recursion to check neighbouring tiles as long as a stop criteria is not reached;
    this.revealTiles(x + 1, y);
    this.revealTiles(x + 1, y + 1);
    this.revealTiles(x + 1, y - 1);
  }

  addFlag(x, y) {
    if (this.boardLogic.isGameEnded) {
      return;
    }
    const rightClickedTile = this.createId(x, y);
    const tile = document.getElementById(rightClickedTile);
    if (tile.classList.contains('flag')) {
      tile.classList.remove('flag');
      tile.innerHTML = '';
      this.boardLogic.flags--;
    } else if (this.boardLogic.board[x][y] == this.boardLogic.UNREVEALED_TILE || this.boardLogic.board[x][y] == this.boardLogic.BOMB_TILE) {
      tile.innerHTML = "🚩";
      tile.classList.add('flag');
      tile.style.fontSize = this.fontSize;
      tile.style.textAlign = 'center';
      this.boardLogic.flags++;
    }

    const counter = document.getElementById('bombs-left');
    counter.innerHTML = `🚩 ${this.boardLogic.flags}/${this.boardLogic.totalOfBombs} 💣️`;
  }

}