//Make sure all HTML file is loaded before reading the script;
document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid');
  let tiles = [];
  let width = 10;
  let bombTotal = 10;
  let gameOver = false;

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

      //click function:
      tile.addEventListener('click', function (e){
        click(tile);
      });

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

  let startButton = document.getElementById('easy-start-button'); //call the element with this ID to be visible to JS;
  startButton.addEventListener('click', generateBoard); //generate board after clicking "Easy" button;


  //click on tiles:
  function click(tile){
    let tileId = tile.id
    if (gameOver){
      return;         //check if game is over; if so, nothing happens after;
    }
    if (tile.classList.contains('flag') ||tile.classList.contains('verified')){
      return;         //if tile contains a flag or is verified, nothing happens in that tile when clicked;
    }
    if (tile.classList.contains('bomb')){
      console.log('💥 Boom 💥 Game Over!')  //if tile contains a bomb, display message in the console;
    } else {
      let allBombs = tile.getAttribute('total');
      if (allBombs != 0){                 //if neighbouring tiles have bombs, add a verified class to the tile; and display the total number of bombs;
        tile.classList.add('verified');
        tile.innerHTML = allBombs;
        return;   //nothing happens in the tile when clicked after this;
      }
    }
    tile.classList.add('verified'); //after all the checks, add 'verified' to the tiles if it has 0 bombs;
  }







})




