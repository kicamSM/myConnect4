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
    console.log('board:', board);
  }
}
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  const top = document.createElement("tr"); 

  top.setAttribute("id", "column-top"); 
  top.addEventListener("click", handleClick);
  
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); 
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); 

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      // console.log('cell:', cell)
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1;  y >= 0; y--) {
    console.log('HEIGHT[y]:', HEIGHT[y])
  if(!board[y][x]) {
    console.log('y:', y)
    return y; 
  }
  }
  return null; 
  // FOR THIS FUNCTION WE HAVE TO ITERATE THROUGH THE SPOTS THAT Y COULD FILL UNTIL WE FIND THE LOWEST ONE THAT IS NOT FILLED 
  // return 0;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  //this line you looked at the code for
  // piece.style.top = -50 * (y + 2);
  //NO IDEA WHAT THIS PEICE OF CODE IS
  const placement = document.getElementById(`${y}-${x}`); 
  placement.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  alert('You have finished the game!')
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  const x = +evt.target.id;
  // console.log('x:', x)
  const y = findSpotForCol(x);
  // console.log('y:', y)
  if (y === null) {
    return;
  } 

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  console.log('board:', board)
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame 
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
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
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
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
