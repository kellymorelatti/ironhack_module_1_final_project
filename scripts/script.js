//Make sure all HTML file is loaded before reading the script;
document.addEventListener('DOMContentLoaded', () => {
  
  const grid = document.querySelector('.grid');  
  let tiles = [];
  let width = 10;

  //Generate Board
  function generateBoard(){
    for (let i = 0; i < width*width; i++){
      const tile = document.createElement('div'); //create 100 divs in HTML;
      tile.setAttribute('id', i); //attribute an id to each tile;
      grid.appendChild(tile); //insert each tile into the grid;
      tiles.push(tile); //push tile to the 'tiles' array;
    }
  }
  generateBoard();



})

