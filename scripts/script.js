//Make sure all HTML file is loaded before reading the script;
document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid');
  let tiles = [];
  let width = 10;
  let bombTotal = 10;

  //Generate Board
  function generateBoard() {
    //shuffle bombs
    const bombTilesArr = Array(bombTotal).fill('bomb'); //created an arr with 10 indexes and assigned each index str 'bomb'
    const emptyTilesArr = Array(width * width - bombTotal).fill('tile'); //same for empty spaces
    const concatArray = emptyTilesArr.concat(bombTilesArr); //joined both arrays
    const shuffledTilesArr = concatArray.sort(() => Math.random() - 0.5);//each time the board is generated, we get a new array with randomly positioned bombs

    for (let i = 0; i < width * width; i++) {
      const tile = document.createElement('div'); //create 100 divs in HTML;
      tile.setAttribute('id', i); //attribute an id to each tile;
      tile.classList.add(shuffledTilesArr[i]); //add a class to each tile, named w/ the word attributed in the variable;
      grid.appendChild(tile); //insert each tile into the grid;
      tiles.push(tile); //push tile to the 'tiles' array;

    }
    console.log(shuffledTilesArr);

    //check neighbouring tiles for the total amount of bombs:
    for (let i = 0; i < tiles.length; i++) {           //loop to check all the elements in the tiles array
      let totalNeighBombs = 0;                        //total of bombs on the neighbor tiles;
      
      //if the element in the array contains the class 'tile' --> check every sorrounding tile to count the total amount of bombs;

      if (tiles[i].classList.contains('tile')) {
        if (tiles[i - 1] != undefined && tiles[i - 1].classList.contains('bomb')) {
          totalNeighBombs++;        //WEST 
        }
        if (tiles[i + 1 - width] != undefined && tiles[i + 1 - width].classList.contains('bomb')) {
          totalNeighBombs++;       //NORTHEAST   
        }
        if (tiles[i - width] != undefined && tiles[i - width].classList.contains('bomb')) {
          totalNeighBombs++;       //NORTH  
        }
        if (tiles[i - 1 - width] != undefined && tiles[i - 1 - width].classList.contains('bomb')) {
          totalNeighBombs++;       //NORTHWEST 
        }
        if (tiles[i + 1] != undefined && tiles[i + 1].classList.contains('bomb')) {
          totalNeighBombs++;       //EAST 
        }
        if (tiles[i - 1 + width] != undefined && tiles[i - 1 + width].classList.contains('bomb')) {
          totalNeighBombs++;       //SOUTHWEST
        }
        if (tiles[i + 1 + width] != undefined && tiles[i + 1 + width].classList.contains('bomb')) {
          totalNeighBombs++;       //SOUTHEAST 
        }
        if (tiles[i + width] != undefined && tiles[i + width].classList.contains('bomb')) {
          totalNeighBombs++;       //SOUTH 
        }
        tiles[i].setAttribute('total', totalNeighBombs);

      }
      console.log(tiles[i]);
    }
  }

  let startButton = document.getElementById('easy-start-button');
  startButton.addEventListener('click', generateBoard);


})

