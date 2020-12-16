const GRID = {};
const N_COLS = 9;
const N_ROWS = 9;
const GRID_SIZE = 80;

let PAWNS = [];

let OPPONENT_PAWNS = [];

let GAME;

let CELLS = [];
let PLAYER = {pawns: []};
let PLAYER_ID = "player1";
let OPPONENT_ID = "player2";
let CELLS_ID = "cells";


//IDENTIFICATION DU JOUEUR
// const urlParams = new URLSearchParams(window.location.search);
// this.ID = urlParams.get("player");

let prefilledOpponent;

window.addEventListener("load", function () {
  initGrid();
  initPlayer();
  listenToDatabase();

  SEND_MESSAGE(PLAYER);

  GAME = new App(PAWNS);
  initCellsApp();
});


function listenToDatabase() {

   prefilledOpponent = {pawns: [{col: 0, row: 0}, {col: 1, row: 2}], cells: []};

  SEND_MESSAGE(prefilledOpponent, OPPONENT_ID)

  DATABASE.ref(OPPONENT_ID).once("value", (snapshot) => {
    let vals = snapshot.val();

    for (let pawn of vals.pawns) {

      let col = pawn.col
      let row = pawn.row

      OPPONENT_PAWNS.push(new Player(col, row, document.querySelector("#gridContainer .players"), GRID, true))
    }
    
  });

  //self debugging
  DATABASE.ref(OPPONENT_ID).on("value", (snapshot) => {
    console.log(snapshot.val());
  });
}

function initPlayer() {
  let params = [
    { col: 2, row: 0, color: null },
    { col: 4, row: 0, color: null },
    { col: 6, row: 0, color: null },
    { col: 4, row: 8, color: null },
  ];

  for (let { col, row } of params) {
    //object destructuring
    PAWNS.push(
      new Player(
        col,
        row,
        document.querySelector("#gridContainer .players"),
        GRID
      )
    );
  }
}

window.addEventListener("click", (evt) => {
  // console.log(evt.pageX, evt.pageY, evt.target);
  // if (evt.target === PLAYER_1.elem) {
  //   // PLAYER_1.move(1, 0);
  // }
});

function initGrid() {
  let parent = document.querySelector("#gridContainer .cells");
  let domParams = document.documentElement.style;
  domParams.setProperty("--n-rows", N_ROWS);
  domParams.setProperty("--n-cols", N_COLS);
  domParams.setProperty("--size", GRID_SIZE + "px");

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
