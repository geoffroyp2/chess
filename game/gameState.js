class GameState {
    constructor(playerTurn) {
        this.pieces = new PieceSet();

        this.playerTurn = playerTurn;
        this.historyMode = false;
        this.pSelected = null;
        this.waitingForPromotion = false;

        this.promotionMove = null;
        this.promotionArea = [];
    }

    newGame() {
        this.pieces.newGame("STANDARD");
    }

    calculateMoves() {
        this.pieces.calculateMoves(this.playerTurn);
        if (this.pieces.isCheckMate) {
            this.checkMate();
        }
    }

    checkMate() {
        print("Checkmate");
    }

    click(squareId) {
        let pieceMoved = false;
        let pieceClicked = this.pieces.find(squareId);

        if (this.pSelected) {
            let moveSelected = this.pSelected.validMoves.find(squareId);
            if (moveSelected) {
                if (moveSelected.type == "P" || moveSelected.type == "PX") {
                    this.promotionMove = moveSelected;
                } else {
                    moveSelected.executeMove();
                    this.nextPlayer();
                    pieceMoved = true;
                    this.promotionMove = null;
                    this.promotionArea = [];
                }
            }
            this.pSelected = null;
        } else {
            this.promotionMove = null;
            this.promotionArea = [];
            if (pieceClicked) {
                if (pieceClicked.team == this.playerTurn) {
                    this.pSelected = pieceClicked;
                }
            }
        }

        return pieceMoved;
    }

    isAValidMove(squareId) {
        if (this.pSelected) {
            return this.pSelected.validMoves.includes(squareId);
        }
        return false;
    }

    nextPlayer() {
        if (this.playerTurn == "W")
            this.playerTurn = "B";
        else if (this.playerTurn == "B")
            this.playerTurn = "W";
    }

    draw() {
        this.pieces.draw(this.pSelected);
    }

    promotion(x, y) {
        let pieceMoved = false;;
        let promoteTo = null;
        if (x >= this.promotionArea.x && x <= this.promotionArea.x + 80) {
            if (y >= this.promotionArea.y && y <= this.promotionArea.y + 80)
                promoteTo = "Q";
            else if (y >= this.promotionArea.y + 80 && y <= this.promotionArea.y + 160)
                promoteTo = "R";
            else if (y >= this.promotionArea.y + 160 && y <= this.promotionArea.y + 240)
                promoteTo = "N";
            else if (y >= this.promotionArea.y + 240 && y <= this.promotionArea.y + 320)
                promoteTo = "B";
        }

        if (promoteTo) {
            this.promotionMove.executeMove(false);
            let piece = this.pieces.splice(this.promotionMove.piece.id);

            switch (promoteTo) {
                case "Q":
                    this.pieces.pieces.push(new Queen(...piece.getInfos()));
                    break;
                case "R":
                    this.pieces.pieces.push(new Rook(...piece.getInfos()));
                    break;
                case "N":
                    this.pieces.pieces.push(new Knight(...piece.getInfos()));
                    break;
                case "B":
                    this.pieces.pieces.push(new Bishop(...piece.getInfos()));
                    break;
            }

            pieceMoved = true;
            this.nextPlayer();
        }

        this.promotionMove = null;
        this.promotionArea = [];

        return pieceMoved;
    }

    drawPromotion() {
        if (this.promotionMove) {
            let x = this.promotionMove.piece.coordinates.x,
                y = this.promotionMove.piece.coordinates.y,
                team = this.promotionMove.piece.team == "W" ? true : false;

            this.promotionArea = { x: x * 100 + 75, y: 25 };

            stroke(10, 10, 10, 200);
            fill(250, 250, 250, 200);
            for (let i = 0; i < 4; i++) {
                square(x * 100 + 75, y + 80 * i + 25, 80);
            }

            tint(255, 200);
            image(pieceIconsHD[team ? "WQ" : "BQ"], x * 100 + 80, 30, 70, 70);
            image(pieceIconsHD[team ? "WR" : "BR"], x * 100 + 80, 30 + 80, 70, 70);
            image(pieceIconsHD[team ? "WN" : "BN"], x * 100 + 80, 30 + 160, 70, 70);
            image(pieceIconsHD[team ? "WB" : "BB"], x * 100 + 80, 30 + 240, 70, 70);
            tint(255, 255);
        }
    }
};