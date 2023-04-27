// external
import React from 'react';

// internal
import Square from 'components/Square.js';
import { row, column, distance, arrayRange, isEqualObject } from 'helpers';
import { BOARD_WIDTH, BOARD_SIZE, OPEN, ATTACK, ENPASSANT, Color, Direction, Piece, EMPTY_SQUARE } from 'data';

/* 
 * Chess board and logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */
export default class Game extends React.Component {

    /**
     * Initialize all state variables to null.
     * @constructor
     */
    constructor(props) {
	super(props);
	this.state = {
	    squares: new Array(64).fill({
		color: null,
		piece: null,
	    }),
	    highlights: new Array(64).fill(0),
	    active: null,
	    selected: null,
	    turn: null,
	    lastMove: null,
	    check: null,
	    kingWhite: null,
	    kingBlack: null
	};
    }

    componentDidMount() {
	this.initializeBoard();
    }

    /*
     * SETUP
     *
     * initialization, setting, resetting pieces and board.
     */

    /************************************************************************/

    /**
     * Non-standard chessboard setup.
     * @function
     */
    setCustomBoard() {
	const squares = this.state.squares.slice();
	// empty
	this.setPieces(arrayRange(0, 63, 1), Piece.NoPiece, Color.NoColor, squares);
	
	// custom pieces
	this.setPiece(48, Piece.Pawn, Color.Black, squares);

	this.setState({
	    squares: squares,
	})
    }

    /**
     * Standard chessboard setup.
     * @function
     */
    setStandardBoard() {
	const squares = this.state.squares.slice();
	//black
	this.setPiece(0, Piece.Rook, Color.Black, squares);
	this.setPiece(1, Piece.Knight, Color.Black, squares);
	this.setPiece(2, Piece.Bishop, Color.Black, squares);
	this.setPiece(3, Piece.Queen, Color.Black, squares);
	this.setPiece(4, Piece.King, Color.Black, squares);
	this.setPiece(5, Piece.Bishop, Color.Black, squares);
	this.setPiece(6, Piece.Knight, Color.Black, squares);
	this.setPiece(7, Piece.Rook, Color.Black, squares);
	this.setPieces(arrayRange(8, 15, 1), Piece.Pawn, Color.Black, squares);

	// empty
	this.setPieces(arrayRange(16, 46, 1), Piece.NoPiece, Color.NoColor, squares);

	// white
	this.setPieces(arrayRange(48, 55, 1), Piece.Pawn, Color.White, squares);
	this.setPiece(56, Piece.Rook, Color.White, squares);
	this.setPiece(57, Piece.Knight, Color.White, squares);
	this.setPiece(58, Piece.Bishop, Color.White, squares);
	this.setPiece(59, Piece.Queen, Color.White, squares);
	this.setPiece(60, Piece.King, Color.White, squares);
	this.setPiece(61, Piece.Bishop, Color.White, squares);
	this.setPiece(62, Piece.Knight, Color.White, squares);
	this.setPiece(63, Piece.Rook, Color.White, squares);

	this.setState({
	    squares: squares,
	})
    }

    /**
     * Generic chessboard setup.
     * @function
     */
    initializeBoard() {
	this.setStandardBoard();
	this.initializeVars();
    }

    /**
     * Initialize state with non-null values.
     * @function
     */
    initializeVars(squares) {
	this.setState({
	    active: false,
	    selected: -1,
	    turn: Color.Black,
	    lastMove: {
		start: -1,
		end: -1,
		piece: null
	    },
	    check: false,
	    kingWhite: 60,
	    kingBlack: 4
	});
    }
    /*
     * GETTERS
     *
     * Retrieving abstract objects
     */

    /************************************************************************/

    getDirection(color) {
	return color === Color.White ? Direction.North : Direction.South;
    }
    
    /*
     * SETTERS
     *
     * Manipulating board squares
     */

    /************************************************************************/

    nextTurn() {
	this.setState({
	    turn: this.state.turn === Color.White ? Color.Black : Color.White,
	});
    }

    setPiece(index, piece, color, squares) {
	squares[index] = {
	    color: color,
	    piece: piece
	};
    }

    setPieces(indexArray, piece, color, squares) {
	indexArray.forEach((index) => {
	    squares[index] = {
		color: color,
		piece: piece
	    };
	});
    }
    
    restart() {
	this.initializeBoard();
	this.clearHighlights();
    }

    /*
     * CHECKING
     *
     * check if squares are available for moves/attacks
     */

    /************************************************************************/
    
    /**
     * Check if it is user's turn
     * @function
     * @param {number} index - index in chessboard
     */
    isValidTurn(index) {
	if(this.state.turn !== this.state.squares[index].color) {
	    return false;
	}
	return true;
    }    
    
    /**
     * Check if a pawn could advance to a square
     * @function
     * @param {number} index - index of square on chessboard
     */
    isValidPawnMoveSquare(index) {
	return this.isOnBoard(index) && !this.hasPiece(index)
    }
    
    /**
     * Check if move is pawn promotion
     * @function
     * @param {number} index - index of square on chessboard
     */
    isPromotion(index) {
	if (this.state.squares[this.state.selected].piece !== Piece.Pawn) {
	    return false;
	}
	if (!this.isEndOfBoard(index)) {
	    return false;
	}
	return true;
    }
        
    /**
     * Check if square on row 0 or 8
     * @function
     * @param {number} index - index of square on chessboard
     */
    isEndOfBoard(index) {
	return row(index) === 0 || row(index) === 7;
    }

    isOnBoard(index) {
	return index >= 0 && index < BOARD_SIZE;
    }

    isRook(index) {
	return this.state.squares[index].piece === Piece.Rook;
    }

    isQueen(index) {
	return this.state.squares[index].piece === Piece.Queen;
    }
    
    hasFoePiece(index, otherIndex) {
	return this.state.squares[index].color !== this.state.squares[otherIndex].color;
    }

    hasFriendPiece(index, otherIndex) {
	return this.state.squares[index].color === this.state.squares[otherIndex].color;
    }

    hasPiece(index) {
	if (this.state.squares[index].piece === null || this.state.squares[index].piece === undefined) {
	    throw new Error(`chessboard improperly initialized: piece at square ${index} is null or undefined`)
	}
	return this.state.squares[index].piece !== Piece.NoPiece;
    }

    atStartingPawnPosition(index) {
	if (this.state.squares[index].color === Color.White) {
	    return Math.floor(index/BOARD_WIDTH) === 6;
	}
	return Math.floor(index/BOARD_WIDTH) === 1;
    }

    /*
     * HIGHLIGHTING
     *
     * highlighting potential moves
     */

    /************************************************************************/
    clearHighlights() {
	this.setState({
	    highlights: new Array(64).fill(0),
	});
    }

    highlightMoves(index) {
	const square = this.state.squares[index];
	
	switch (square.piece) {
	case Piece.Pawn:
	    this.highlightPawn(index);
	    break;
	case Piece.Knight:
	    this.highlightKnight(index);
	    break;
	case Piece.Bishop:
	    this.highlightBishop(index);
	    break;
	case Piece.Rook:
	    this.highlightRook(index);
	    break;
	case Piece.Queen:
	    this.highlightQueen(index);
	    break;
	case Piece.King:
	    this.highlightKing(index);
	    break;
	default:
	}
	this.setState({
	    active: true,
	    selected: index
	});
    }

    highlightPawn(index) {
	const highlights = this.state.highlights.slice();
	
	this.highlightPawnMoves(index, highlights);
	this.highlightPawnAttacks(index, highlights);
	
	this.setState({
	    highlights: highlights,
	});
    }

    highlightPawnMoves(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = this.getDirection(pawn.color);
	let position = index + direction * BOARD_WIDTH;
	
	if (this.isValidPawnMoveSquare(position)) {
	    this.tryHighlight(position, highlights, OPEN);
	    position = position + direction * BOARD_WIDTH;
	    if (this.atStartingPawnPosition(index)) {
		if (this.isValidPawnMoveSquare(position)) {
		    this.tryHighlight(position, highlights, OPEN);
		}
	    }
	}
    }

    highlightPawnAttacks(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = this.getDirection(pawn.color);
	let position = index + (direction * BOARD_WIDTH) + 1;
	
	if (column(position) !== 0 && this.hasPiece(position)) {
	    this.tryHighlight(position, highlights, ATTACK);
	}
	position = index + (direction * BOARD_WIDTH) - 1;
	if (column(position) !== BOARD_WIDTH - 1 && this.hasPiece(position)) {
	    this.tryHighlight(position, highlights, ATTACK);
	}
	this.highlightEnPassant(index, highlights);
    }

    highlightEnPassant(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = this.getDirection(pawn.color);
	
	let targetMoveRight = {
	    start: index + (direction * 2 * BOARD_WIDTH) + 1,
	    end: index + 1,
	    piece: {
		color: Number(!pawn.color),
		piece: Piece.Pawn
	    }
	};

	let targetMoveLeft = {
	    start: index + (direction * 2 * BOARD_WIDTH) - 1,
	    end: index - 1,
	    piece: {
		color: Number(!pawn.color),
		piece: Piece.Pawn
	    }
	};

	if (isEqualObject(this.state.lastMove, targetMoveRight)) {
	    this.tryHighlight(index + (direction * BOARD_WIDTH) + 1, highlights, ENPASSANT);
	} else if (isEqualObject(this.state.lastMove, targetMoveLeft)) {
	    this.tryHighlight(index + (direction * BOARD_WIDTH) - 1, highlights, ENPASSANT);
	}
    }

    highlightBishop(index) {
	const highlights = this.state.highlights.slice();
	//northeast
	for (let position = index - (BOARD_WIDTH - 1); position >= 0 && column(position) !== 0; position -= (BOARD_WIDTH - 1)) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}
	//southeast
	for (let position = index + (BOARD_WIDTH + 1); position < BOARD_SIZE && column(position) !== 0; position += (BOARD_WIDTH + 1)) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}
	//southwest
	for (let position = index + (BOARD_WIDTH - 1); position < BOARD_SIZE && column(position) !== BOARD_WIDTH - 1; position += (BOARD_WIDTH - 1)) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}
	//northwest
	for (let position = index - (BOARD_WIDTH + 1); position >= 0 && column(position) !== BOARD_WIDTH - 1; position -= (BOARD_WIDTH + 1)) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}

	this.setState({
	    highlights: highlights,
	})
	return highlights;

    }


    highlightKnight(index) {
	const highlights = this.state.highlights.slice();
	// north
	// up 2, right 1
	this.highlightKnightSquare(index, index - 2 * BOARD_WIDTH + 1, highlights);
	// up 2, left 1
	this.highlightKnightSquare(index, index - 2 * BOARD_WIDTH - 1, highlights);
	// right
	// right 2, up 1
	this.highlightKnightSquare(index, index + 2 + 1 * BOARD_WIDTH, highlights);
	// right 2, down 1
	this.highlightKnightSquare(index, index + 2 - 1 * BOARD_WIDTH, highlights);
	// south
	// south 2, right 1
	this.highlightKnightSquare(index, index + 2 * BOARD_WIDTH + 1, highlights);
	// south 2, left 1
	this.highlightKnightSquare(index, index + 2 * BOARD_WIDTH - 1, highlights);
	// left
	// left 2, up 1
	this.highlightKnightSquare(index, index - 2 + 1 * BOARD_WIDTH, highlights);
	// left 2, down 1
	this.highlightKnightSquare(index, index - 2 - 1 * BOARD_WIDTH, highlights);

	this.setState({
	    highlights: highlights,
	})

    }

    highlightKnightSquare(index, newIndex, highlights) {
	if (distance(index, newIndex) > 3) {
	    return;
	}
	if(this.isOnBoard(newIndex)){
	    this.highlightFriendOrFoeOrOpen(index, newIndex, highlights);
	}
    }

    
    highlightRook(index) {
	const highlights = this.state.highlights.slice();
	//north
	for (let position = index - BOARD_WIDTH; position > 0; position -= BOARD_WIDTH) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}
	//south
	for (let position = index + BOARD_WIDTH; position < BOARD_SIZE; position += BOARD_WIDTH) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}
	//east
	for (let position = index + 1; column(position) !== 0; position++) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}
	//west
	for (let position = index - 1; column(position) !== BOARD_WIDTH - 1; position--) {
	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
		break;
	    }
	}

	this.setState({
	    highlights: highlights,
	})
	return highlights;
    }


    // make this fuction more efficient
    // going to pass highlights by ref in the future
    highlightQueen(index) {
	let rookHighlights = this.highlightRook(index);
	let bishopHighlights = this.highlightBishop(index);
	let queenHighlights = rookHighlights.map(function (num, idx) {
	    return num + bishopHighlights[idx];
	});
	this.setState({
	    highlights: queenHighlights,
	});
    }

    highlightKing(index) {
	const highlights = this.state.highlights.slice();
	//north
	if(this.isOnBoard(index - 1 * BOARD_WIDTH)){
	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH, highlights);
	}
	//northeast
	if(this.isOnBoard(index - 1 * BOARD_WIDTH + 1) && column(index - 1 * BOARD_WIDTH + 1) !== 0){
	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH + 1, highlights);
	}
	//east
	if(column(index + 1) !== 0){
	    this.highlightFriendOrFoeOrOpen(index, index + 1, highlights);
	}
	//southeast
	if(this.isOnBoard(index + 1 * BOARD_WIDTH + 1) && column(index + 1 * BOARD_WIDTH + 1) !== 0){
	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH + 1, highlights);
	}
	//south
	if(this.isOnBoard(index + 1 * BOARD_WIDTH)){
	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH, highlights);
	}
	//southwest
	if(this.isOnBoard(index + 1 * BOARD_WIDTH - 1) && column(index + 1 * BOARD_WIDTH - 1) !== BOARD_WIDTH - 1){
	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH - 1, highlights);
	}
	//west
	if(column(index - 1) !== BOARD_WIDTH - 1){
	    this.highlightFriendOrFoeOrOpen(index, index - 1, highlights);
	}
	//northwest
	if(this.isOnBoard(index - 1 * BOARD_WIDTH - 1) && column(index - 1 * BOARD_WIDTH - 1) !== BOARD_WIDTH - 1){
	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH - 1, highlights);
	}

	this.setState({
	    highlights: highlights,
	})

    }

    highlightFriendOrFoeOrOpen(index, newIndex, highlights) {
	if (!this.hasPiece(newIndex)) {
	    this.tryHighlight(newIndex, highlights, OPEN);
	    return true;
	} else if (this.hasFoePiece(index, newIndex)) {
	    this.tryHighlight(newIndex, highlights, ATTACK);
	    return false;
	} else {
	    return false;
	}
    }

    tryHighlight(index, highlights, state) {
	if(index <= 0 || index >= BOARD_SIZE) {
	    return;
	}
	highlights[index] = state;
    }

    deselectPiece() {
	this.setState({
	    active: false,
	    selected: -1
	});
	this.clearHighlights();
    }

    /*
     * Handlers
     *
     * respond to user actions
     */

    /************************************************************************/
    
    handleClick(index) {
	const piece = this.state.squares[this.state.selected]
	if (this.state.active) {
	    if (this.state.highlights[index] > 0) {
		if (this.isPromotion(index)) {
		    const squares = this.state.squares.slice();
		    this.deletePiece(this.state.selected, squares)
		    this.setPiece(index, Piece.Queen, piece.color, squares);
		    this.setState({
			squares: squares
		    })
		} else {
		    this.move(index);
		    this.nextTurn();
		}
	    }
	    this.deselectPiece();
	} else {
	    if (this.isValidTurn(index)) {
		this.highlightMoves(index);
	    }
	}
    }

    /*
     * MOVEMENTS
     *
     * moving pieces
     */

    /************************************************************************/

    move(index, altSquares = 0, newSquares = null) {
	let squares;
	if(!altSquares) {
	    squares = this.state.squares.slice();
	    if(this.selected === this.kingWhite) {
		this.setState({
		    kingWhite: index
		})
	    }
	    if(this.selected === this.kingBlack) {
		this.setState({
		    kingBlack: index
		})
	    }
	} else {
	    squares = newSquares;
	}
	let lastMove = {
	    start: this.state.selected,
	    end: index,
	    piece: this.state.squares[this.state.selected]
	}
	if (this.state.highlights[index] === OPEN) {
	    this.switchPieces(index, squares);
	} else if (this.state.highlights[index] === ATTACK) {
	    this.takePiece(index, squares);
	} else if (this.state.highlights[index] === ENPASSANT) {
	    this.switchPieces(index, squares);
	    if (lastMove.start > lastMove.end) {
		this.deletePiece(index + BOARD_WIDTH, squares);
	    } else {
		this.deletePiece(index - BOARD_WIDTH, squares);
	    }
	}
	if(!altSquares) {
	    this.setState({
		lastMove: lastMove,
		squares: squares
	    });
	}
    }

    switchPieces(index, squares) {
	let selected = squares[this.state.selected];
	squares[this.state.selected] = squares[index];
	squares[index] = selected;
    }

    takePiece(index, squares) {
	squares[index] = squares[this.state.selected];
	squares[this.state.selected] = EMPTY_SQUARE;
    }

    deletePiece(index, squares) {
	squares[index] = EMPTY_SQUARE;
    }

    render() {
	return (
	    <div>
		<div className="board">
		    {this.state.squares.map((_, index) => (
			<Square
			    key={index}
			    id={index}
			    state={this.state.squares[index]}
			    handleClick={() => this.handleClick(index)}
			    highlight={this.state.highlights[index]}
			/>
		    ))}
		</div>
		<button onClick={() => this.restart()}>Restart</button>
	    </div>
	);
    }
}
