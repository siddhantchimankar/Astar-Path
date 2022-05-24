
// global variables

var cols = 65;
var rows = 65;
var grid = new Array(rows);
var openSet = [];
var closeSet = [];
var start;
var end;
var w, h;
var path = [];
var noSolution = false;

// heuristic

function heuristic(a, b) {
  
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

// class to represent each cell in he grid

function Spot(i, j) {
  
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.nbrs = [];
  this.parent;
  this.wall = false;

  if(random(1) < 0.5) {
    this.wall = true;
  }

  // show the color of cell

  this.show = function (col) {
    
    fill(col);
    if(this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * h, this.j * w, h - 2, w - 2);
  }

  // check if cell is valid

  this.check = function (i, j, grid) {
    
    if(i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return false;
    return true;
  }

  // add nbrs of cell in nbrs array member

  this.addnbrs = function (grid) {
    
    var i = this.i;
    var j = this.j;
    
    if(this.check(i - 1, j, grid)) this.nbrs.push(grid[i - 1][j]);
    
    if (this.check(i, j + 1, grid)) this.nbrs.push(grid[i][j + 1]);
    
    if (this.check(i + 1, j, grid)) this.nbrs.push(grid[i + 1][j]);
    
    if (this.check(i, j - 1, grid)) this.nbrs.push(grid[i][j - 1]);
    
    if (this.check(i - 1, j + 1, grid)) this.nbrs.push(grid[i - 1][j + 1]);
    
    if (this.check(i + 1, j + 1, grid)) this.nbrs.push(grid[i + 1][j + 1]);
    
    if (this.check(i + 1, j - 1, grid)) this.nbrs.push(grid[i + 1][j - 1]);
    
    if (this.check(i - 1, j - 1, grid)) this.nbrs.push(grid[i - 1][j - 1]);
  }

}

// sort of like a pre-loop, do the initializations, defining stuff here

function setup() {
  
  createCanvas(650, 650);

  w = width / cols;
  h = height / rows;

  // create the grid

  for(var i = 0 ; i < rows ; i++) {
    grid[i] = new Array(cols);
  }
  
  for(var i = 0 ; i < rows ; i++) {
    for(var j = 0 ; j < cols ; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].addnbrs(grid);
    }
  }

  console.log(grid);

  start = grid[0][0];
  end = grid[rows - 1][cols - 1];

  openSet.push(start);

}

// all the action happens here, the game loop, instantaneous changes, everything

function draw() {

  if(openSet.length > 0) {

    var winner = 0;

    // get the best candidate cell

    for(var i = 0 ; i < openSet.length ; i++) {
      if(openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    // check if we have reached the end

    if(openSet[winner] === end) {
      console.log("done");
      noLoop();
    }

    // add best node from openlist to closelist

    var curr = openSet[winner];
    openSet.splice(winner, 1);
    closeSet.push(curr);

    var nbrs = curr.nbrs;

    // add nbrs of the best node to the openlist

    for(var i = 0 ; i < nbrs.length ; i++) {
      
      if(!closeSet.includes(nbrs[i]) && !nbrs[i].wall) {

        var tempG = curr.g + 1;
        var newPath = false;

        if(openSet.includes(nbrs[i])) {
          
          if(tempG < nbrs[i].g) {
            nbrs[i].g = tempG;
            newPath = true;
          }

        }else {

          nbrs[i].g = tempG;
          openSet.push(nbrs[i]);
          newPath = true;

        }

        // apply heuristic and assign final distance

        if(newPath) {
          nbrs[i].h = heuristic(nbrs[i], end);
          nbrs[i].f = nbrs[i].g + nbrs[i].h;
          nbrs[i].parent = curr;
        }
      }
    }

  }else {

    noSolution = true;
    noLoop();

  }

  background(0);
  start.wall = false;
  end.wall = false;

  // show the colors off cells 
  
  for(var i = 0 ; i < rows ; i++) {
    for(var j = 0 ; j < cols ; j++) {
      grid[i][j].show(color(255));
    }
  }

  for(var i = 0 ; i < closeSet.length ; i++) {
    closeSet[i].show(color('#e40017'));
  }

  for(var i = 0 ; i < openSet.length ; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  // find the best path from the end node 

  if(!noSolution) {
    path = [];
    var temp = curr;
    path.push(curr);

    while (temp.parent) {
      path.push(temp.parent);
      temp = temp.parent;
    }
  }

  // show the path in different color

  for(var i = 0 ; i < path.length ; i++) {
    path[i].show(color('#0779e4'));
  }

}
