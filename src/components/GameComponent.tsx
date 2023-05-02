// external
import React from 'react';

// internal
import SquareComponent from '@components/SquareComponent';
import { row, column, distance } from '@/auxiliary/geometry';
import { BOARD_WIDTH, BOARD_SIZE, OPEN, ATTACK, ENPASSANT, EMPTY_SQUARE } from '@/constants/board';
import { Piece } from '@models/Piece';
import { PieceType } from '@models/PieceType';
import { Color } from '@models/Color';
import { Square } from '@models/Square';
import { arrayRange } from '@/auxiliary/array';

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
	    squares: new Array(64).fill(new Square(new Piece(new Color("black"), new PieceType("pawn")))),
	    highlights: new Array(64).fill(0),
	    active: null,
	    turn: null,
	    lastMove: null,
	};

	this.setHighlights = this.setHighlights.bind(this);
    }

    /*
     * SETUP
     *
     * initialization, setting, resetting pieces and board.
     */

    /************************************************************************/

    /**
     * Generic chessboard setup.
     * @function
     */
    initializeBoard() {
	this.setStandardBoard();
    }

    /**
     * Standard chessboard setup.
     * @function
     */
    setStandardBoard() {
	const squares = this.state.squares.slice();

	// empty
	this.setPieces(squares, arrayRange(0, 63, 1));

	this.setState({
	    squares: squares,
	})
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

    setPiece(squares, index, piece) {
	squares[index] = new Square();
    }

    setPieces(squares, indexArray, piece : Piece) {
	indexArray.forEach((index) => {
	    squares[index] = new Square(piece)
	});
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
	return this.state.squares[index].piece !== Piece.NoPiece;
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

    // highlightMoves(index) {
    // 	const square = this.state.squares[index];
	
    // 	switch (square.piece) {
    // 	case Piece.Pawn:
    // 	    this.highlightPawn(index);
    // 	    break;
    // 	case Piece.Knight:
    // 	    this.highlightKnight(index);
    // 	    break;
    // 	case Piece.Bishop:
    // 	    this.highlightBishop(index);
    // 	    break;
    // 	case Piece.Rook:
    // 	    this.highlightRook(index);
    // 	    break;
    // 	case Piece.Queen:
    // 	    this.highlightQueen(index);
    // 	    break;
    // 	case Piece.King:
    // 	    this.highlightKing(index);
    // 	    break;
    // 	default:
    // 	}
    // 	this.setState({
    // 	    active: true,
    // 	    selected: index
    // 	});
    // }

    // highlightBishop(index) {
    // 	const highlights = this.state.highlights.slice();
    // 	//northeast
    // 	for (let position = index - (BOARD_WIDTH - 1); position >= 0 && column(position) !== 0; position -= (BOARD_WIDTH - 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//southeast
    // 	for (let position = index + (BOARD_WIDTH + 1); position < BOARD_SIZE && column(position) !== 0; position += (BOARD_WIDTH + 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//southwest
    // 	for (let position = index + (BOARD_WIDTH - 1); position < BOARD_SIZE && column(position) !== BOARD_WIDTH - 1; position += (BOARD_WIDTH - 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//northwest
    // 	for (let position = index - (BOARD_WIDTH + 1); position >= 0 && column(position) !== BOARD_WIDTH - 1; position -= (BOARD_WIDTH + 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})
    // 	return highlights;

    // }


    // highlightKnight(index) {
    // 	const highlights = this.state.highlights.slice();
    // 	// north
    // 	// up 2, right 1
    // 	this.highlightKnightSquare(index, index - 2 * BOARD_WIDTH + 1, highlights);
    // 	// up 2, left 1
    // 	this.highlightKnightSquare(index, index - 2 * BOARD_WIDTH - 1, highlights);
    // 	// right
    // 	// right 2, up 1
    // 	this.highlightKnightSquare(index, index + 2 + 1 * BOARD_WIDTH, highlights);
    // 	// right 2, down 1
    // 	this.highlightKnightSquare(index, index + 2 - 1 * BOARD_WIDTH, highlights);
    // 	// south
    // 	// south 2, right 1
    // 	this.highlightKnightSquare(index, index + 2 * BOARD_WIDTH + 1, highlights);
    // 	// south 2, left 1
    // 	this.highlightKnightSquare(index, index + 2 * BOARD_WIDTH - 1, highlights);
    // 	// left
    // 	// left 2, up 1
    // 	this.highlightKnightSquare(index, index - 2 + 1 * BOARD_WIDTH, highlights);
    // 	// left 2, down 1
    // 	this.highlightKnightSquare(index, index - 2 - 1 * BOARD_WIDTH, highlights);

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})

    // }

    // highlightKnightSquare(index, newIndex, highlights) {
    // 	if (distance(index, newIndex) > 3) {
    // 	    return;
    // 	}
    // 	if(this.isOnBoard(newIndex)){
    // 	    this.highlightFriendOrFoeOrOpen(index, newIndex, highlights);
    // 	}
    // }

    
    // highlightRook(index) {
    // 	const highlights = this.state.highlights.slice();
    // 	//north
    // 	for (let position = index - BOARD_WIDTH; position > 0; position -= BOARD_WIDTH) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//south
    // 	for (let position = index + BOARD_WIDTH; position < BOARD_SIZE; position += BOARD_WIDTH) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//east
    // 	for (let position = index + 1; column(position) !== 0; position++) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//west
    // 	for (let position = index - 1; column(position) !== BOARD_WIDTH - 1; position--) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})
    // 	return highlights;
    // }


    // // make this fuction more efficient
    // // going to pass highlights by ref in the future
    // highlightQueen(index) {
    // 	let rookHighlights = this.highlightRook(index);
    // 	let bishopHighlights = this.highlightBishop(index);
    // 	let queenHighlights = rookHighlights.map(function (num, idx) {
    // 	    return num + bishopHighlights[idx];
    // 	});
    // 	this.setState({
    // 	    highlights: queenHighlights,
    // 	});
    // }

    // highlightKing(index) {
    // 	const highlights = this.state.highlights.slice();
    // 	//north
    // 	if(this.isOnBoard(index - 1 * BOARD_WIDTH)){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH, highlights);
    // 	}
    // 	//northeast
    // 	if(this.isOnBoard(index - 1 * BOARD_WIDTH + 1) && column(index - 1 * BOARD_WIDTH + 1) !== 0){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH + 1, highlights);
    // 	}
    // 	//east
    // 	if(column(index + 1) !== 0){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1, highlights);
    // 	}
    // 	//southeast
    // 	if(this.isOnBoard(index + 1 * BOARD_WIDTH + 1) && column(index + 1 * BOARD_WIDTH + 1) !== 0){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH + 1, highlights);
    // 	}
    // 	//south
    // 	if(this.isOnBoard(index + 1 * BOARD_WIDTH)){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH, highlights);
    // 	}
    // 	//southwest
    // 	if(this.isOnBoard(index + 1 * BOARD_WIDTH - 1) && column(index + 1 * BOARD_WIDTH - 1) !== BOARD_WIDTH - 1){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH - 1, highlights);
    // 	}
    // 	//west
    // 	if(column(index - 1) !== BOARD_WIDTH - 1){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1, highlights);
    // 	}
    // 	//northwest
    // 	if(this.isOnBoard(index - 1 * BOARD_WIDTH - 1) && column(index - 1 * BOARD_WIDTH - 1) !== BOARD_WIDTH - 1){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH - 1, highlights);
    // 	}

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})

    // }

    // highlightFriendOrFoeOrOpen(index, newIndex, highlights) {
    // 	if (!this.hasPiece(newIndex)) {
    // 	    this.tryHighlight(newIndex, highlights, OPEN);
    // 	    return true;
    // 	} else if (this.hasFoePiece(index, newIndex)) {
    // 	    this.tryHighlight(newIndex, highlights, ATTACK);
    // 	    return false;
    // 	} else {
    // 	    return false;
    // 	}
    // }

    // tryHighlight(index, highlights, state) {
    // 	if(index <= 0 || index >= BOARD_SIZE) {
    // 	    return;
    // 	}
    // 	highlights[index] = state;
    // }

    deselectPiece() {
	this.setState({
	    active: false,
	    selected: -1
	});
	this.clearHighlights();
    }


    /**
     * Update board highlights
     * @function
     * @param {Array<number>} highlights - updated array of highlighted squares
     */
    setHighlights(highlights) {
	this.setState({
	    highlights: highlights
	})
    }
    
    /*
     * Handlers
     *
     * respond to user actions
     */

    /************************************************************************/
    
    handleClick(index) {
	console.log("square clicked")
	
	// if (this.state.active) {
	//     if (this.state.highlights[index] > 0) {
	// 	this.move(index);
	// 	this.nextTurn();
	//     }
	//     this.deselectPiece();
	// } else {
	//     if (this.isValidTurn(index)) {
	// 	this.highlightMoves(index);
	//     }
	// }
    }

    /************************************************************************/

    /*
     * MOVEMENTS
     *
     * moving pieces
     */

    /************************************************************************/

    move(index) {
	const squares = this.state.squares.slice();
	
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
	
	this.setState({
	    lastMove: lastMove,
	    squares: squares
	});
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
			<SquareComponent
			    key={index}
			    id={index}
			    state={this.state.squares[index]}
			    handleClick={() => this.handleClick(index)}
			    highlight={this.state.highlights[index]}
			    highlights={this.state.highlights}
			    setHighlights={this.setHighlights}
			    squares={this.state.squares}
			    turn={this.state.turn}
			    lastMove={this.state.lastMove}
			/>
		    ))}
		</div>
		<button onClick={() => this.initializeBoard()}>Restart</button>
		<button onClick={() => console.log(this.state.squares)}>log squares</button>
	    </div>
	);
    }
}
