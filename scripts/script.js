document.addEventListener('DOMContentLoaded', () => {
  let boardDraw;
  let boardLogic;
  let timer;


  //EASY LEVEL

  //event for button to generate board
  document.getElementById('easy-start-button').addEventListener('click', function (e) {
    document.getElementById('stats-section').style.visibility = 'visible';
    document.getElementById('stats-section').style.height = '65px';
    document.getElementById('stats-section').style.width = '433px';


    //change "choose level" element visibility
    let elem = document.getElementById('choose-level-section');
    if (elem != null) {
      elem.parentNode.removeChild(elem);
    }

    //reload page after clicking "Refresh" button;
    if (boardLogic != undefined) {
      document.location.reload();
      return;
    }

    //Easy board;
    boardLogic = new BoardLogic(10, 10);
    boardDraw = new BoardDraw(boardLogic, '430px', '430px', '40px', '3em');

    boardLogic.createLogicBoard();
    boardDraw.drawBoard();
    document.getElementById('easy-start-button').innerHTML = 'Refresh';

  })
    //MEDIUM LEVEL

    //event for button to generate board
    document.getElementById('medium-start-button').addEventListener('click', function (e) {
      document.getElementById('stats-section').style.visibility = 'visible';
      document.getElementById('stats-section').style.height = '65px';
      document.getElementById('stats-section').style.width = '528px';


      //change "choose level" element visibility
      let elem = document.getElementById('choose-level-section');
      if (elem != null) {
        elem.parentNode.removeChild(elem);
      }

      //reload page after clicking "Refresh" button;
      if (boardLogic != undefined) {
        document.location.reload();
        return;
      }

      //Medium board;
      boardLogic = new BoardLogic(40, 16);
      boardDraw = new BoardDraw(boardLogic, '528px', '528px', '30px', '2.5em');

      boardLogic.createLogicBoard();
      boardDraw.drawBoard();
      document.getElementById('medium-start-button').innerHTML = 'Refresh';

    })

    //HARD LEVEL

    //event for button to generate board
    document.getElementById('hard-start-button').addEventListener('click', function (e) {
      document.getElementById('stats-section').style.visibility = 'visible';
      document.getElementById('stats-section').style.height = '65px';
      document.getElementById('stats-section').style.width = '690px';


      //change "choose level" element visibility
      let elem = document.getElementById('choose-level-section');
      if (elem != null) {
        elem.parentNode.removeChild(elem);
      }

      //reload page after clicking "Refresh" button;
      if (boardLogic != undefined) {
        document.location.reload();
        return;
      }

      //Hard board;
      boardLogic = new BoardLogic(99, 30);
      boardDraw = new BoardDraw(boardLogic, '690px', '690px', '20px', '1.5em');

      boardLogic.createLogicBoard();
      boardDraw.drawBoard();
      document.getElementById('hard-start-button').innerHTML = 'Refresh';
  
    })
  

  document.getElementById('stats-section').style.visibility = 'hidden';
  document.getElementById('stats-section').style.height = '0px';

});


