//Make sure all HTML file is loaded before reading the script;
document.addEventListener('DOMContentLoaded', () => {
  
  const grid = document.querySelector('.grid');  
  let tiles = [];
  let width = 10;
  let bombTotal = 10;

  //Generate Board
  function generateBoard(){
    //shuffle bombs
    const bombTilesArr = Array(bombTotal).fill('bomb'); //created an arr with 10 indexes and fill each index w/ 'boom'
    const emptyTilesArr = Array(width*width - bombTotal).fill('tile'); //same for empty spaces
    const concatArray = emptyTilesArr.concat(bombTilesArr); //joined both arrays
    const shuffledTilesArr = concatArray.sort(() => Math.random() -0.5);//each time the board is generated, we get a new array with randomly positioned bombs


    for (let i = 0; i < width*width; i++){
      const tile = document.createElement('div'); //create 100 divs in HTML;
      tile.setAttribute('id', i); //attribute an id to each tile;
      tile.classList.add(shuffledTilesArr[i]); //add a class to each tile, named w/ the word attributed in the variable;
      grid.appendChild(tile); //insert each tile into the grid;
      tiles.push(tile); //push tile to the 'tiles' array;

    }
    console.log(shuffledTilesArr);
  }

  let startButton = document.getElementById('start-button');
  startButton.addEventListener('click', generateBoard);


})

