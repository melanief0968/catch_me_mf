class Cell {
  constructor(col, row, parent) {
    this.parent = parent;
    this.col = col;
    this.row = row;

    this.elem = document.createElement("div");

    this.reset();
    this.app = null;

    this.parent.appendChild(this.elem);

    // this.elem.style = this.col * this.size;
    // this.elem.style = this.row * this.size;
    this.elem.style.setProperty("--row", this.row);
    this.elem.style.setProperty("--col", this.col);

    //this.elem.addEventListener('click', this.buildWall.bind(this));
    this.elem.addEventListener("click", () => {
      // this.toggleWall(); // active  desactive le mur
      this.buildWall();
    });
  }

  //   update() {

  //   }
  toggleWall() {
    this.elem.classList.toggle("wall");
    this.app.refreshPlayersPos();
  }

  buildWall() {
    this.elem.classList.add("wall");
    this.app.refreshPlayersPos();
  }

  removeWall() {
    this.elem.classList.remove("wall");
    this.app.refreshPlayersPos();
  }

  reset() {
    this.elem.setAttribute("class", "");
    this.elem.classList.add("position");
    this.elem.classList.add("gridElement");
  }
}
