class Player {
  constructor(col, row, parent, grid) {
    this.parent = parent;

    this.col = col;
    this.row = row;

    this.grid = grid;

    this.elem = document.querySelector("#template .player").cloneNode(true);
    this.parent.appendChild(this.elem);
    this.selected = false;

    // this.elem.style = this.col * this.size;
    // this.elem.style = this.row * this.size;
    //this.elem.addEventListener('click', this.buildWall.bind(this));

    this.updateCSS();
    this.navigationSystem = this.elem.querySelector(".navigation-system");
    this.arrows = this.navigationSystem.children;
    for (let arrow of this.arrows) {
      arrow.addEventListener("click", (e) => {
        this.arrowClick(e.target);
      });
    }
  }

  refreshPos() {
    const coordsUp = `${this.col},${this.row - 1}`; //"x, y"
    const coordsLeft = `${this.col - 1},${this.row}`; //"x, y"
    const coordsRight = `${this.col + 1},${this.row}`; //"x, y"
    const coordsDown = `${this.col},${this.row + 1}`; //"x, y"

    if (this.grid[coordsUp] != null) {
      if (this.grid[coordsUp].elem.classList.contains("wall")) {
        console.log("CEsT UN MUR");
        this.arrows[0].classList.add("hidden");
      } else {
        this.arrows[0].classList.remove("hidden");
      }
    } else {
      this.arrows[0].classList.add("hidden");
    }

    if (this.grid[coordsLeft] != null) {
      if (this.grid[coordsLeft].elem.classList.contains("wall")) {
        this.arrows[1].classList.add("hidden");
      } else {
        this.arrows[1].classList.remove("hidden");
      }
    } else {
      this.arrows[1].classList.add("hidden");
    }

    if (this.grid[coordsRight] != null) {
      if (this.grid[coordsRight].elem.classList.contains("wall")) {
        this.arrows[2].classList.add("hidden");
      } else {
        this.arrows[2].classList.remove("hidden");
      }
    } else {
      this.arrows[2].classList.add("hidden");
    }

    if (this.grid[coordsDown] != null) {
      if (this.grid[coordsDown].elem.classList.contains("wall")) {
        this.arrows[3].classList.add("hidden");
      } else {
        this.arrows[3].classList.remove("hidden");
      }
    } else {
      this.arrows[3].classList.add("hidden");
    }

    // if (this.col == 0){
    //   this.arrows[1].classList.add("hidden");
    // }else {
    //   this.arrows[1].classList.remove("hidden");
    // }
    // if (this.col == 8){
    //   this.arrows[2].classList.add("hidden");
    // }else {
    //   this.arrows[2].classList.remove("hidden");
    // }
    // if (this.row == 0){
    //   this.arrows[0].classList.add("hidden");
    // }else {
    //   this.arrows[0].classList.remove("hidden");
    // }
    // if (this.row == 8){
    //   this.arrows[3].classList.add("hidden");
    // }else {
    //   this.arrows[3].classList.remove("hidden");
    // }
  }

  arrowClick(target) {
    if (this.selected) {
      let way = target.dataset.way;
      let movementX = 0,
        movementY = 0;

      if (way === "up") {
        movementY = -1;
        console.log("up");
      } else if (way === "down") {
        movementY = 1;
      } else if (way === "left") {
        movementX = -1;
      } else if (way === "right") {
        movementX = 1;
      }

      this.move(movementX, movementY);
    }
  }

  move(movementX, movementY) {
    let positionX = movementX + this.col;
    let positionY = movementY + this.row;

    if (positionX >= 0 && positionY >= 0 && positionX <= 8 && positionY <= 8) {
      this.col += movementX;
      this.row += movementY;
      this.updateCSS();
      this.refreshPos();
    }
  }

  select(sel) {
    this.selected = sel;
    if (this.selected) {
      this.navigationSystem.setAttribute("class", "navigation-system");
      // this.activateNavigationSystem(true);
      console.log("selected");
    } else {
      this.navigationSystem.setAttribute("class", "hidden");
      // this.activateNavigationSystem(false);
      console.log("deselected");
    }
  }

  updateCSS() {
    this.elem.style.setProperty("--row", this.row);
    this.elem.style.setProperty("--col", this.col);
  }

  // SEND_MESSAGE("catch_me/essai", data);
}
