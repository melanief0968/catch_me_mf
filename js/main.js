const GRID = {};
const N_COLS = 9;
const N_ROWS = 9;
const GRID_SIZE = 80;

let PLAYER_1;
let PLAYER_1_2;
let PLAYER_1_3;
let PLAYER_2;
let GAME;


//IDENTIFICATION DU JOUEUR
// const urlParams = new URLSearchParams(window.location.search);
// this.ID = urlParams.get("player");

window.addEventListener("load", function () {
  initGrid();
  initPlayer();
  GAME = new App(PLAYER_1, PLAYER_1_2, PLAYER_1_3, PLAYER_2 );
  initCellsApp(); 
});

function setup(){
  this.appHasStarted = false;
    DATABASE.ref("catch_me/essai").on(
      "value",
      this.onValueChanged.bind(this)
    );
}

function initPlayer() {
  PLAYER_1 = new Player(2,0, document.querySelector("#gridContainer .players"), GRID);
  PLAYER_1_2 = new Player(4,0, document.querySelector("#gridContainer .players"), GRID);
  PLAYER_1_3 = new Player(6,0, document.querySelector("#gridContainer .players"), GRID);
  PLAYER_2 = new Player(4,8, document.querySelector("#gridContainer .players"), GRID);
  
}

window.addEventListener('click', (evt) => {
  // console.log(evt.pageX, evt.pageY, evt.target);
  if(evt.target === PLAYER_1.elem) {
    // PLAYER_1.move(1, 0);
  }
  
});

function initGrid() {

  let parent = document.querySelector("#gridContainer .cells");
  let domParams = document.documentElement.style;
  domParams.setProperty('--n-rows', N_ROWS);
  domParams.setProperty('--n-cols', N_COLS);
  domParams.setProperty('--size', GRID_SIZE + 'px');

  // Construire la grille
  for (let col = 0; col < N_COLS; col++) {
    for (let row = 0; row < N_ROWS; row++) {
      const coords = `${col},${row}`; //"0,0";
      GRID[coords] = new Cell(col, row, parent); //!\ Objet Cell à construire
    }
  }
//   Cibler la cellule en haut à gauche de la grille
//   GRID["0,0"];

}

//"0,0" "buildWall"

// Trouver une cellule
function getCellByCoords(row, col) {
  const coords = `${col},${row}`; //"x, y"
  return GRID[coords];
}

function initCellsApp() {
  for (let col = 0; col < N_COLS; col++) {
    for (let row = 0; row < N_ROWS; row++) {
      const coords = `${col},${row}`; //"0,0";
      GRID[coords].app = GAME; //!\ Objet Cell à construire
    }
  }
}

// function player(x,y){
// let parent = document.querySelector("#pawn");
// x = pawn.style.left;
// y = pawn.style.top;
// }
