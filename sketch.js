let board;
let resetButton;

function setup() {
    angleMode(DEGREES);
    colorMode(RGB);
    rectMode(CORNER);
    textAlign(CENTER);


    createCanvas(800, 800);
    background(10, 10, 10);
    frameRate(1);

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