import Timer from "./utils/timer";
import FEN from "./utils/fenCreator";
import coordToString from "./utils/coordToString";
import initData from "./utils/initData.json";

export default class GameLogic {
  // ------------------------------
  //        Initialization
  // ------------------------------

  constructor(client) {
    this.client = client;

    // Game tracking
    this.board = initData;
    this.time = new Timer();
    this.history = [];
    this.moveClock = 0; // moves since last capture or pawn moves
    this.moveCount = 0; // total moves

    // UI tracking
    this.pieceSelected = null;
    this.promotionMove = false;
    this.lastMove = null;
  }

  giveUICallback(callback) {
    this.UIUpdate = callback;
  }

  reset() {
    this.board = initData;
    this.history = [];
    this.time = new Timer();
    this.newGame(300, 5);

    this.pieceSelected = null;
    this.promotionMove = false;
    this.lastMove = null;
  }

  // ------------------------------
  //      Handle Calls to API
  // ------------------------------

  newGame(totalTime, increment) {
    const callBack = ({ gameId, time, board }) => {
      this.moveClock = 0;
      this.moveCount = 0;
      this.gameId = gameId;

      this.time.synchronize(time);

      this.board = board;
      this.history.push(this.board);

      console.log("new Game");
      this.UIUpdate();
    };

    this.client.requestNewGame(
      {
        mode: "D",
        totalTime: totalTime,
        increment: increment,
      },
      callBack
    );
  }

  playMove({ move, from }, promotionTarget) {
    const callBack = ({ gameId, time, board, moveClock, moveCount }) => {
      this.history.push(this.board);
      this.board = board;
      this.time.switchPlayer();
      this.time.synchronize(time);
      this.moveClock = moveClock;
      this.moveCount = moveCount;

      // TODO : handle status
      if (this.board.Checkmate) console.log("checkmate");
      else if (this.board.Stalemate) console.log("stalemate");
      else if (this.board.Check) console.log("check");

      this.lastMove = { from: from, to: move.To }; // for highlight
      this.UIUpdate();
    };

    this.client.playMove(
      {
        move: {
          From: from,
          To: move.To,
          Type: move.Type,
        },
        promotion: promotionTarget || null,
        fen: FEN.createFEN(this.board, this.moveClock, this.moveCount + 1),
        board: this.board,
      },
      callBack
    );
  }

  // ------------------------------
  //    Handle User Interaction
  // ------------------------------

  click({ x, y }) {
    //handle clicks coming from the UI

    if (this.promotionMove) {
      this.handlePromotion(x, y);
    } else {
      const pieceClicked = this.board.Pieces.find(
        (p) => p.Coord.x === x && p.Coord.y === y
      );

      if (this.pieceSelected) {
        if (pieceClicked === this.pieceSelected) {
          // TODO : handle mouseUp and mouseDown in slightly different ways
          this.pieceSelected = null;
        } else {
          const moveSelected = this.pieceSelected.Moves.find(
            (m) => m.To.x === x && m.To.y === y
          );
          if (moveSelected) {
            if (moveSelected.Type === "P" || moveSelected.Type === "Q") {
              this.promotionMove = moveSelected;
            } else {
              this.playMove(
                {
                  move: moveSelected,
                  from: this.pieceSelected.Coord,
                },
                null
              );
              this.pieceSelected = null;
            }
          } else if (pieceClicked) {
            if (pieceClicked.Team === this.board.PlayerTurn)
              this.pieceSelected = pieceClicked;
            else {
              this.pieceSelected = null;
            }
          } else {
            this.pieceSelected = null;
          }
        }
      } else {
        if (pieceClicked && pieceClicked.Team === this.board.PlayerTurn)
          this.pieceSelected = pieceClicked;
      }
    }
    // Refresh after each click even if nothing changed to deal with highlights and other changing elements
    this.UIUpdate();
  }

  handlePromotion(x, y) {
    //TODO
    // detect which valid piece has been selected
    if (
      x === this.promotionMove.To.x &&
      y >= (this.pieceSelected.Team ? 0 : 4) &&
      y < (this.pieceSelected.Team ? 4 : 8)
    ) {
      let promotionTarget;
      if (y === 0 || y === 7) promotionTarget = "Q";
      else if (y === 1 || y === 6) promotionTarget = "R";
      else if (y === 2 || y === 5) promotionTarget = "N";
      else if (y === 3 || y === 4) promotionTarget = "B";

      this.playMove(
        {
          move: this.promotionMove,
          from: this.pieceSelected.Coord,
        },
        promotionTarget
      );
    }

    //deselect even if no valid move has been chosen
    this.promotionMove = null;
    this.pieceSelected = null;
  }

  // ------------------------------
  // Data access methods for the UI
  // ------------------------------

  getGameInfos() {
    return {
      pieces: this.getPieces(),
      highlights: this.getHighlights(),
      promotionArea: this.getPromotionArea(),
      playerTurn: this.board.PlayerTurn ? "W" : "B", // TODO: handle as bool
    };
  }

  getTime() {
    // called by the UI timer
    return this.time.getTime();
  }

  getPieces() {
    // format Piece object for the UI
    let formattedPieces = [];
    let i = 0;
    this.board.Pieces.forEach((p) => {
      formattedPieces.push({
        type: p.Type + (p.Team ? "W" : "B"),
        coord: p.Coord,
        id: p.Type + i,
      });
      i++;
    });
    return formattedPieces;
  }

  getHighlights() {
    let highlights = [];

    // If a piece is selected, highlight that piece and it's valid moves
    if (this.pieceSelected) {
      highlights.push({
        type: "HS",
        coord: this.pieceSelected.Coord,
        id: "S",
      });
      this.pieceSelected.Moves.forEach((m) => {
        // Capture overlay
        if (m.Type === "X" || m.Type === "Q")
          highlights.push({
            type: "HX",
            coord: m.To,
            id: this.pieceSelected.Type + m.Type + m.To.x + m.To.y,
          });
        // Move Overlay
        else
          highlights.push({
            type: "HM",
            coord: m.To,
            id: this.pieceSelected.Type + m.Type + m.To.x + m.To.y,
          });
      });
    }

    //Highlight check
    if (this.board.Check) {
      highlights.push({
        type: "HC",
        coord: this.board.Pieces.find(
          (p) => p.Team === this.board.PlayerTurn && p.Type === "K"
        ).Coord,
        id: "CH",
      });
    }

    // Highlight last move played
    if (this.lastMove) {
      highlights.push({ type: "HLM", coord: this.lastMove.from, id: "HLM1" });
      highlights.push({ type: "HLM", coord: this.lastMove.to, id: "HLM2" });
    }

    return highlights;
  }

  getPromotionArea() {
    // if need to display the promotion overlay
    if (this.promotionMove) {
      return {
        coord: this.promotionMove.To,
      };
    } else return null;
  }
}
