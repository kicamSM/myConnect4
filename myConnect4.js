/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7; //this is the number of columns
const HEIGHT = 6; // this is the number of rows 

let currPlayer = 1; // active player: 1 or 2
// note this is changed to let because the currPlayer will alternate between 1 and 2

let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
    // we are pushing into the array board the arrays made from the width which is essentially going to give the board array 
  }
}
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  const top = document.createElement("tr"); 
  //creating a table row element on the top of the board
  top.setAttribute("id", "column-top"); 
  //setting an id to that table row
  top.addEventListener("click", handleClick);
  //adding event listener click which will allow us to place a piece 
  
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); 
    //creating individual cells name table data on the table row 
    headCell.setAttribute("id", x);
    //giving the cells the id of x 
    top.append(headCell);
    //appending those cells 
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); 
    //creating table row 

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      // creating celll whuch is the table data 
      row.append(cell);
      //appending cell to row 
    }
    htmlBoard.append(row);
    //appending this to the htmlBard 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1;  y >= 0; y--) {
    //here we are looping through the y values from the bottom of the board up
  if(!board[y][x]) {
    // this line initially confused me. This line is saying if the board does not yet have a value assigned to it then we are using that space that is undefined or null 
    return y; 
  }
  }
  return null; 
  // if they are all full and have a value then we are returning null 
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  //adding a class of piece 
  piece.classList.add(`p${currPlayer}`);
  //this line we are adding a class of p1 or p2 depending on who the current player is
  const placement = document.getElementById(`${y}-${x}`); 
  // tihs is going to determine the placement of the individual piece by the x, y coordinates 
  placement.append(piece);
  //this is appending that piece onto that placement 

}

let timeout;

/** endGame: announce game end */
function endGameAnnouncement() {
  timeout = setTimeout(endGame, 2000);
}

function endGame(msg) {
  alert('You have finished the game!')
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  const x = +evt.target.id;
  //this function handles the click. this line is determining whic x you clicked on 
  const y = findSpotForCol(x);
  // this is calling the function findSpotForCol which will determine are y 
  if (y === null) {
    return;
  } 

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  //this is giving the value of 1 or 2 to the board if it has been claimed 
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGameAnnouncement(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame 
  if (board.every(row => row.every(cell => cell))) {
    return endGameAnnouncement('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1; 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //this is saying that we have a win with four pieces horizontally in a row which is why we are adding 1 to x in each array. 
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // this is saying that we have a win with four pieces vertically in a row which is why we are adding 1 to y in each array. 
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //this is saying we have a win with four pieces placed diagnolly to the right (right and upward). so we have a starting piece and then we are moving up one and to the right one every time which is why y and x increase by one in each array. 
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //this is saying we have a win with four pieces placed diagnolly to the left (left and upward). so we have a starting piece and then we are moving up one and to the left one every time which is why y increases and x decreases by one in each array

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
        //this is saying if any of these conidtions meet horizontally, verticall, diagonally to the right or to the left then the there is a win (return true)
      }
    }
  }

  const button = document.getElementById('button');
  // const cell = document.querySelectorAll('td')

  function resetGame() {
    board = [];
    makeBoard()
    htmlBoard()
  }


button.addEventListener('click', function(resetGame){
  document.querySelectorAll('.piece').forEach(e => e.remove());
  // document.querySelectorAll('td').value = '';
  board = [];
  makeBoard()
  htmlBoard()

      })
}



makeBoard();
makeHtmlBoard();
