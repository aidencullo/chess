import React from 'react';

import Square from './Square.js';

// Global vars
var BOARD_WIDTH = 8;
var BLACK_SIDE = 15;
var WHITE_SIDE = 49;
var WHITE = 1;
var BLACK = 0;
var NUM_SQUARES = 64;
var RIGHT = 1;
var LEFT = -1;
var OPEN = 1;
var ATTACK = 2;
var FOE = 1;
var FRIEND = 0;
var ENPASSANT = 3;
var EMPTY_SQUARE = {
    color:-1,
    name: ""
};

export default class Game extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    squares: new Array(64).fill({
		color: undefined,
		name: undefined,
	    }),
	    highlights: new Array(64).fill(0),
	    active: undefined,
	    selected: undefined,
	    nextTurn: undefined,
	    lastMove: undefined,
	    check: undefined
	};
    }

    componentDidMount() {
	this.initializeBoard();
    }

    /*
      SETUP

      initialization, setting, resetting pieces and board.

    */

    alternateBoard(squares){
	this.setBoardToEmpty(squares);
	this.setPawnCustom(32, squares, WHITE);
	this.setPawnCustom(17, squares, BLACK);	
    }

    standardBoard(squares) {
	for (let index = 0; index < this.state.squares.length; index++) {
	    let row = Math.floor(index / BOARD_WIDTH);
	    switch (row) {
	    case 0:
	    case 7:
		this.setMainPiece(index, squares);
		break;
	    case 1:
	    case 6:
		this.setPawn(index, squares);
		break;
	    default:
		this.setEmptySquare(index, squares);
	    }
	}
    }	
    
    initializeBoard() {
	const squares = this.state.squares.slice();
	this.standardBoard(squares);
	this.initializeVars(squares);
    }

    initializeVars(squares) {
	this.setState({
	    squares: squares,
	    active: false,
	    selected:-1,
	    nextTurn: BLACK,
	    lastMove: {
		start: -1,
		end: -1,
		piece: undefined
	    },
	    check: false
	});
    }

    /*
      GETTERS
    */


    getPawn(index) {
	if (index > BLACK_SIDE) {
		return {
		color: WHITE,
		name: "p"
	    };
	} else {
		return {
		color: BLACK,
		name: "p"
	    };
	}
    }
	
    getEmptySquare() {
	return {
	    color: -1,
	    name: ""
	};
    }
    
    /*
      SETTERS
    */

    setBoardToEmpty(squares) {
	for(const i in squares) {
	    this.setEmptySquare(i, squares);
	}
    }
    
    setNextTurn(){
	this.setState({
	    nextTurn: this.state.nextTurn ? 0 : 1
	});
    }
    
    setEmptySquare(index, squares) {
	squares[index] = {
	    color: -1,
	    name: ""
	};
    }


    setMainPiece(index, squares) {
	let color;
	if (index <= BLACK_SIDE) {
	    color = BLACK;
	} else {
	    color = WHITE;
	}
	switch (index % BOARD_WIDTH) {
	case 0:
	    squares[index] = {
		color: color,
		name: "r"
	    };
	    break;
	case 1:
	    squares[index] = {
		color: color,
		name: "kn"
	    };
	    break;
	case 2:
	    squares[index] = {
		color: color,
		name: "b"
	    };
	    break;
	case 3:
	    squares[index] = {
		color: color,
		name: "q"
	    };
	    break;
	case 4:
	    squares[index] = {
		color: color,
		name: "k"
	    };
	    break;
	case 5:
	    squares[index] = {
		color: color,
		name: "b"
	    };
	    break;
	case 6:
	    squares[index] = {
		color: color,
		name: "kn"
	    };
	    break;
	case 7:
	    squares[index] = {
		color: color,
		name: "r"
	    };
	    break;
	default:
	    console.log("rowIndex invalid value");
	    return;
	}
    }

    setPawn(index, squares) {
	if (index > BLACK_SIDE) {
	    squares[index] = {
		color: WHITE,
		name: "p"
	    };
	} else {
	    squares[index] = {
		color: BLACK,
		name: "p"
	    };
	}
    }

    setPawnCustom(index, squares, color) {
	squares[index] = {
	    color: color,
	    name: "p"
	};
    }


    restart(){
	this.initializeBoard();
	this.clearHighlights();
    }
    

    /*
      HIGHLIGHTING

      functions for highlighting and un-highlighting based on user selection, piece, position, etc.

    */
    
    clearHighlights() {
	this.setState({
	    highlights: new Array(64).fill(0),
	});
    }

    checkMoves(index) {
	if (this.state.nextTurn !== this.state.squares[index].color) {
	    return;
	}
	const square = this.state.squares[index];
	switch (square.name) {
	case "p":
	    this.highlightPawn(index);
	    break;
	case "kn":
	    this.highlightKnight(index);
	    break;
	case "b":
	    this.highlightBishop(index);
	    break;
	case "r":
	    this.highlightRook(index);
	    break;
	case "q":
	    this.highlightQueen(index);
	    break;
	case "k":
	    this.highlightKing(index);
	    break;
	default:
	}
	this.setState({
	    active: true,
	    selected: index
	});
    }

    highlightPawn(index){
	const highlights = this.state.highlights.slice();
	this.highlightPawnMovements(index,highlights);
	this.highlightPawnAttacks(index, highlights);
	this.setState({
	    highlights: highlights,
	});
    }

    highlightPawnMovements(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = pawn.color ? -1 : 1;
	let position = index + direction * BOARD_WIDTH;
	if(!this.hasPiece(position)) {
	    this.highlight(position, highlights);
	    position = position + BOARD_WIDTH;
	    if(!this.hasPiece(position) && this.atStartingPosition(index)) {
		this.highlight(position, highlights);
	    }
	}
    }

    highlightPawnAttacks(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = pawn.color ? -1 : 1;
	let position = index + (direction * BOARD_WIDTH) + 1;
	if(this.hasPiece(position)) {
	    this.tryHighlight(position, highlights, FOE);
	}
	position = index + (direction * BOARD_WIDTH) - 1;
	if(this.hasPiece(position)) {
	    this.highlight(position, highlights, FOE);
	}
	this.highlightEnPassant(index, highlights);
    }

    highlightEnPassant(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = pawn.color ? -1 : 1;
	let targetMoveRight = {
	    start: index + (direction * 2 * BOARD_WIDTH) + 1,
	    end: index + 1,
	    piece: {
		color: Number(!pawn.color),
		name: "p"
	    }
	};
	let targetMoveLeft = {
	    start: index + (direction * 2 * BOARD_WIDTH) - 1,
	    end: index - 1,
	    piece: {
		color: Number(!pawn.color),
		name: "p"
	    }
	};
	if(this.isEqualObject(this.state.lastMove, targetMoveRight)) {
	    this.tryHighlight(index + (direction * BOARD_WIDTH) + 1, highlights, ENPASSANT);
	} else if(this.isEqualObject(this.state.lastMove, targetMoveLeft)) {
	    this.tryHighlight(index + (direction * BOARD_WIDTH) - 1, highlights, ENPASSANT);
	}
    }

    highlightBishop(index)  {
	const highlights = this.state.highlights.slice();
	const bishop = this.state.square[index];
	const color = bishop.color;
	//northeast
	for(let position = index - (BOARD_WIDTH - 1); position >= 0 && this.column(position) !== 0 && !this.hasFriendPiece(position); position -= (BOARD_WIDTH - 1)) {
	    this.highlightSquare(index, position, highlights);
	}
	//southwest
	for(let position = index + (BOARD_WIDTH - 1); position < NUM_SQUARES && this.column(position) !== BOARD_WIDTH - 1 && !this.hasFriendPiece(position); position += (BOARD_WIDTH - 1)) {
	    this.highlightSquare(index, position, highlights);
	}
	//northwest
	for(let position = index - (BOARD_WIDTH + 1); position >= 0 && this.column(position) !== BOARD_WIDTH - 1 && !this.hasFriendPiece(position); position -= (BOARD_WIDTH + 1)) {
	    this.highlightSquare(index, position, highlights);
	}
	//southeast
	for(let position = index + (BOARD_WIDTH + 1); position < NUM_SQUARES && this.column(position) !== 0 && !this.hasFriendPiece(position); position += (BOARD_WIDTH + 1)) {
	    this.highlightSquare(index, position, highlights);
	}
	
	this.setState({
	    highlights: highlights,
	})
	return highlights;
	
    }

    highlightKnightSquare(index, newIndex, highlights) {
	if(this.distance(index, newIndex) > 3) {
	    return;
	} else {
	    this.highlightSquare(index, newIndex, highlights);
	}
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
    
    highlightRook(index) {
	const highlights = this.state.highlights.slice();
	//north
	for(let position = index - BOARD_WIDTH; position > 0 && !this.hasFriendPiece(position); position -= BOARD_WIDTH) {
	    this.highlightSquare(index, position, highlights);
	}
	//south
	for(let position = index + BOARD_WIDTH; position < NUM_SQUARES && !this.hasFriendPiece(position); position += BOARD_WIDTH) {
	    this.highlightSquare(index, position, highlights);
	}
	//east
	for(let position = index + 1; this.column(position) !== 0 && !this.hasFriendPiece(position); position++) {
	    this.highlightSquare(index, position, highlights);
	}
	//west
	for(let position = index - 1; this.column(position) !== BOARD_WIDTH - 1 && !this.hasFriendPiece(position); position--) {
	    this.highlightSquare(index, position, highlights);
	}

	this.setState({
	    highlights: highlights,
	})
	return highlights;
    }

    
    // make this fuction more efficient
    // going to pass highlights by ref in the future
    highlightQueen(index){
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
	this.highlightSquare(index, index - 1 * BOARD_WIDTH, highlights);
	//northeast
	this.highlightSquare(index, index - 1 * BOARD_WIDTH + 1, highlights);
	//east
	this.highlightSquare(index, index + 1, highlights);
	//southeast
	this.highlightSquare(index, index + 1 * BOARD_WIDTH + 1, highlights);
	//south
	this.highlightSquare(index, index + 1 * BOARD_WIDTH, highlights);
	//southwest
	this.highlightSquare(index, index + 1 * BOARD_WIDTH - 1, highlights);
	//west
	this.highlightSquare(index, index - 1, highlights);
	//northwest
	this.highlightSquare(index, index - 1 * BOARD_WIDTH - 1, highlights);

	this.setState({
	    highlights: highlights,
	})

    }

    highlightSquare(index, newIndex, highlights) {
	if(!this.hasPiece(index, newIndex)) {
	    this.highlightOpen(newIndex, highlights);
	} else if(this.hasFoePiece(index, newIndex)) {
	    this.highlightFoe(newIndex, highlights);
	}
    }

    highlightOpen(index, highlights) {
	this.tryHighlight(index, highlights, OPEN);
    }

    highlightFoe(index, highlights) {
	this.tryHighlight(index, highlights, ATTACK);
    }



    tryHighlight(index, highlights, state) {

	/*
	  if(this.inCheck(index)) {
	    return;
	}
	*/
	
	// potentially more checks
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
      RETRIEVAL

      getters, checking certain square, board, piece properties

    */
    
    getPieceInfo(index) {
	if (this.state.squares[index].color !== undefined) {
	    return this.state.squares[index];
	}
    }

    hasFoePiece(index, otherIndex) {
	return this.hasPiece(index) && this.state.squares[index].color === this.state.squares[otherIndex].color;
    }

    hasFriendPiece(index, otherIndex) {
	return this.hasPiece(index) && this.state.squares[index].color === this.state.squares[otherIndex].color;
    }
    
    hasPiece(index) {
	return this.state.squares[index].name !== "";
    }

    getGame(){
	return this.state.squares.map((square, index) => (
	    <Square
		key={index}
		id={index}
		getPieceInfo={() => this.getPieceInfo(index)}
		handleClick={() => this.handleClick(index)}
		checkMoves={() => this.checkMoves(index)}
		highlight={this.state.highlights[index]}
	    />
	));
    }

    // untested
    atStartingPosition(index){
	let piece = this.state.squares[index];
	let direction = piece.color ? -1 : 1;
	switch (piece.name) {
	case "p":
	    return Math.floor(index/BOARD_WIDTH) === (BOARD_WIDTH - 1 + direction) % (BOARD_WIDTH - 1);
	case "kn":
	    return false;
	case "b":
	    return false;
	case "r":
	    return false;
	case "q":
	    return false;
	case "k":
	    return false;
	default:
	}
	this.setState({
	    active: true,
	    selected: index
	});

    }

    inCheck(index) {
	return false;
//	Array(8).fill(0).map((_, i) => this.inCheckDirection(index, i));
//	this.inCheckKnight(index);
    }

    inCheckDirection(index, i) {}

    inCheckKnight(index) {}
	
    /*
      EVENT HANDLERS

    */

    handleClick(index) {
	if(this.state.active) {
	    if(this.state.highlights[index] > 0) {
		this.makeMove(index);
		this.setNextTurn()
	    }	    
	    this.deselectPiece();
	} else {
	    this.checkMoves(index);
	}
    }

    /*
      MOVEMENTS
    */

    // review this function
    makeMove(index) {
	const squares = this.state.squares.slice();
	let lastMove = {
	    start: this.state.selected,
	    end: index,
	    piece: this.state.squares[this.state.selected]
	}   
	if(this.state.highlights[index] === OPEN) {
	    this.switchPieces(index, squares);
	} else if(this.state.highlights[index] === ATTACK) {
	    this.takePiece(index, squares);
	} else if(this.state.highlights[index] === ENPASSANT) {
	    this.switchPieces(index, squares);
	    if(lastMove.start > lastMove.end) {
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

    /*
      AUXILIARY FUNCTIONS
    */

    distance(p1, p2) {

	const rd = Math.abs(this.row(p1) - this.row(p2));
	const cd = Math.abs(this.column(p1) - this.column(p2));
	return Math.sqrt(rd*rd + cd*cd);
	
    }

    isEqualObject(object1, object2) {
	console.log("isequal");
	console.log("ob1:", object1);
	console.log("ob2:", object2);
	if(Object.keys(object1).length !== Object.keys(object2).length) {
	    return false;
	}
	for (const [key, value] of Object.entries(object1)) {
	    console.log(`${typeof value}`);
	    if(typeof value === "object") {
		if (object2[key] === undefined) {
		    return false;
		} else if (!this.isEqualObject(value, object2[key])){
		    return false;
		}
	    } else if(value !== object2[key]) {
		console.log(`${value} !== ${object2[key]}`);
		return false;
	    }
	}
	console.log("true is equal");
	return true;
    }

    row(index) {
	return Math.floor(index / BOARD_WIDTH);
    }

    column(index) {
	return index % BOARD_WIDTH;
    }

    /*
      RENDER
    */

    render() {
	return (
	    <div>
		<div className="board">
		    {this.getGame()}
		</div>
		<button onClick={() => this.restart()}>Restart</button>
	    </div> 
	);
    }
}
