// geometrics
const BOARD_WIDTH = 8;
const BOARD_SIZE = 64;

// highlighting
const OPEN = 1;
const ATTACK = 2;
const ENPASSANT = 3;

const Color = Object.freeze({
    White: 0,
    Black: 1,
    NoColor: 2
})

const Direction = Object.freeze({
    North: -1,
    South: 1
})

const Piece = Object.freeze({
    Pawn: 0,
    Knight: 1,
    Bishop: 2,
    Rook: 3,
    Queen: 4,
    King: 5,
    NoPiece: 6
})

const EMPTY_SQUARE = {
    color : null,
    piece : Piece.NoPiece
}

export { BOARD_WIDTH, BOARD_SIZE, OPEN, ATTACK, ENPASSANT, Color, Direction, Piece, EMPTY_SQUARE };
