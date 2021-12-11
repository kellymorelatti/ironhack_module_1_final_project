document.addEventListener('DOMContentLoaded', () => {
  let boardDraw;
  let boardLogic;

  //event for button to generate board
  document.getElementById('easy-start-button').addEventListener('click', function (e) {
    
    if (boardLogic != undefined){
      document.location.reload();
      return;
    }

    boardLogic = new BoardLogic(10, 10);
    boardDraw = new BoardDraw (boardLogic);

    boardLogic.createLogicBoard();
    boardDraw.drawBoard();
    document.getElementById('easy-start-button').innerHTML = 'Refresh 😎';

  })
});