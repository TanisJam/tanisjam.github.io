"use strict";

function calcWidth (vw) {

    if (vw > 1000) {return 25}
    else if (vw > 600) {return 18}
    else {return 12}
}


const width = calcWidth(window.innerWidth);
const height = 16;
const treeColor = '#75972C';


let trees = [];
let div = document.getElementById("board");
let treesCount = document.getElementById("total-trees");
let btnStop = document.getElementById("btn-stop");
let btnStart = document.getElementById("btn-start");
let btnClear = document.getElementById("btn-clear");

let inputName = document.getElementById("input-name");
let loop;

let showTotalTrees = function () {
    treesCount.innerHTML = "Total trees: " + board.population;
}

let cliked = function (algo) {
    let exp = /[0-9]+/g;
    let cell = (!exp.test(algo.path[0].id)) ? algo.path[1].id : algo.path[0].id;
    board.plant(cell);
    showTotalTrees();
    //console.log(board.planted);
}

//create board, a matrix with all the divs
let board = new Board(width, height, div, cliked);

btnStop.addEventListener('click', function () {
    //board.clean();
    //showTotalTrees();
    clearInterval(loop);
});
btnStart.addEventListener('click', function () {
    /*let data = {
        name: inputName.value,
        field: board.planted
    }
    ref.push(data);
   inputName.value = "";*/
    loop = setInterval(gameLoop, 1000);
});
btnClear.addEventListener('click', function () {
    board.clean();
    showTotalTrees();
    clearInterval(loop);
});



let gameLoop = function () {
    let forPlant = [];

    //If a dead cell has exactly three live neighbours, it comes to life
    for (let x = 0; x < board.field.length; x++) {
        for (let y = 0; y < board.field[x].length; y++) {
            if ((getContext(board.field, x, y) == 3) && !board.field[x][y].hasChildNodes()) {
                forPlant.push(board.field[x][y].id);
            }
        }
    }

    //If a live cell has less than two live neighbours, it dies
    for (let x = 0; x < board.field.length; x++) {
        for (let y = 0; y < board.field[x].length; y++) {
            if ((getContext(board.field, x, y) < 2) && board.field[x][y].hasChildNodes()) {
                forPlant.push(board.field[x][y].id);
            }
        }
    }

    //If a live cell has more than three live neighbours, it dies
    for (let x = 0; x < board.field.length; x++) {
        for (let y = 0; y < board.field[x].length; y++) {
            if ((getContext(board.field, x, y) > 3) && board.field[x][y].hasChildNodes()) {
                forPlant.push(board.field[x][y].id);
            }
        }
    }



    forPlant.forEach(element => board.plant(element));
    showTotalTrees();
}

let getContext = function (field, x, y) {
    let count = 0;

    let upL = (x >= 1 && y >= 1) ? field[x - 1][y - 1] : "";
    let up = x >= 1 ? field[x - 1][y] : "";
    let upR = (x >= 1 && y < field[x].length) ? field[x - 1][y + 1] : "";
    let downL = (x < field.length - 1 && y >= 1) ? field[x + 1][y - 1] : "";
    let down = x < field.length - 1 ? field[x + 1][y] : "";
    let downR = (x < field.length - 1 && y < field[x].length) ? field[x + 1][y + 1] : "";
    let left = y >= 1 ? field[x][y - 1] : "";
    let rigth = y < field[x].length ? field[x][y + 1] : "";

    if (upL) { if (upL.hasChildNodes()) { count++ } }
    if (up) { if (up.hasChildNodes()) { count++ } }
    if (upR) { if (upR.hasChildNodes()) { count++ } }
    if (downL) { if (downL.hasChildNodes()) { count++ } }
    if (down) { if (down.hasChildNodes()) { count++ } }
    if (downR) { if (downR.hasChildNodes()) { count++ } }
    if (left) { if (left.hasChildNodes()) { count++ } }
    if (rigth) { if (rigth.hasChildNodes()) { count++ } }

    //console.log(field[x][y],count);
    return count;
}

function populate() {
    for (let i = 0; i <= width * height; i++) {
        if (Math.floor(Math.random() * 100) > 86) {
            board.plant(i);
        }
    }
    showTotalTrees();
}
window.onload = populate;