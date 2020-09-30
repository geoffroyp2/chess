let board;
let resetButton;
let pieceIcons60px, pieceIconsHD = {};

function preload() {
    pieceIcons60px = {
        BB: loadImage(IMGDATA60px.BB),
        WB: loadImage(IMGDATA60px.WB),
        BK: loadImage(IMGDATA60px.BK),
        WK: loadImage(IMGDATA60px.WK),
        BN: loadImage(IMGDATA60px.BN),
        WN: loadImage(IMGDATA60px.WN),
        BP: loadImage(IMGDATA60px.BP),
        WP: loadImage(IMGDATA60px.WP),
        BQ: loadImage(IMGDATA60px.BQ),
        WQ: loadImage(IMGDATA60px.WQ),
        BR: loadImage(IMGDATA60px.BR),
        WR: loadImage(IMGDATA60px.WR)
    }

    loadImage(IMGDATAHD, loadHD);
    function loadHD(image) {
        pieceIconsHD.WK = image.get(0 * 333, 0, 333, 333);
        pieceIconsHD.WQ = image.get(1 * 333, 0, 333, 333);
        pieceIconsHD.WB = image.get(2 * 333, 0, 333, 333);
        pieceIconsHD.WN = image.get(3 * 333, 0, 333, 333);
        pieceIconsHD.WR = image.get(4 * 333, 0, 333, 333);
        pieceIconsHD.WP = image.get(5 * 333, 0, 333, 333);
        pieceIconsHD.BK = image.get(0 * 333, 333, 333, 333);
        pieceIconsHD.BQ = image.get(1 * 333, 333, 333, 333);
        pieceIconsHD.BB = image.get(2 * 333, 333, 333, 333);
        pieceIconsHD.BN = image.get(3 * 333, 333, 333, 333);
        pieceIconsHD.BR = image.get(4 * 333, 333, 333, 333);
        pieceIconsHD.BP = image.get(5 * 333, 333, 333, 333);
    }
};


function setup() {
    angleMode(DEGREES);
    colorMode(RGB);
    rectMode(CORNER);
    textAlign(LEFT);


    createCanvas(1200, 800);
    background(40, 40, 40);
    frameRate(0);

    board = new Board();

    createButtons();
}

function draw() {
}

function mouseClicked(event) {
    if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 800) {
        board.click(mouseX, mouseY);
    }
}

function keyPressed(event) {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown") {
        board.keyPress(event.key);
    }
}

function createButtons() {
    resetButton = createButton("reset");
    resetButton.position(850, 50);
    resetButton
    resetButton.mousePressed(() => board.reset());
}