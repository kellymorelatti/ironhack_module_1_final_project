document.addEventListener('DOMContentLoaded', () => {
  let boardDraw;
  let boardLogic;
  let timer;

  //event for button to generate board
  document.getElementById('easy-start-button').addEventListener('click', function (e) {
    document.getElementById('stats-section').style.visibility = 'visible';
    document.getElementById('stats-section').style.height = '65px';


    let elem = document.getElementById('choose-level-section');
    if (elem != null) {
      elem.parentNode.removeChild(elem);
    }

    if (boardLogic != undefined) {
      document.location.reload();
      return;
    }

    //easy
    boardLogic = new BoardLogic(10, 10);
    boardDraw = new BoardDraw(boardLogic, '430px', '430px', '40px', '3em');

    // boardLogic = new BoardLogic(20, 20);
    // boardDraw = new BoardDraw(boardLogic, '660px', '660px', '30px', '2em');

    boardLogic.createLogicBoard();
    boardDraw.drawBoard();
    document.getElementById('easy-start-button').innerHTML = 'Refresh';

  })

  document.getElementById('stats-section').style.visibility = 'hidden';
  document.getElementById('stats-section').style.height = '0px';

});


