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
var ENEMY = 2;
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
	    lastMove: undefined
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
	this.alternateBoard(squares);
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
	    }
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
	case "kn":
	    this.highlightKnight(index);
	    break;
	case "k":
	    this.highlightKing(index);
	    break;
	case "r":
	    this.highlightRook(index);
	    break;
	case "b":
	    this.highlightBishop(index);
	    break;
	case "q":
	    this.highlightQueen(index);
	    break;
	case "p":
	    this.highlightPawn(index);
	    break;
	default:
	}
	this.setState({
	    active: true,
	    selected: index
	});
    }

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

    highlightPawnMovements(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = pawn.color ? -1 : 1;
	if(!this.hasPiece(index + direction * BOARD_WIDTH)) {
	    this.highlight(index + direction * BOARD_WIDTH, highlights, 0, pawn.color);
	    if(!this.hasPiece(index + direction * 2 * BOARD_WIDTH) && Math.floor(index/BOARD_WIDTH) === (BOARD_WIDTH - 1 + direction) % (BOARD_WIDTH - 1)) {
		this.highlight(index + direction * 2 * BOARD_WIDTH, highlights, 0, pawn.color);
	    }
	}
    }

    highlightPawnAttacks(index, highlights) {
	let pawn = this.state.squares[index];
	let direction = pawn.color ? -1 : 1;
	if(this.hasPiece(index + (direction * BOARD_WIDTH) + 1)) {
	    this.highlight(index + (direction * BOARD_WIDTH) + 1, highlights, 0, pawn.color);
	}
	if(this.hasPiece(index + (direction * BOARD_WIDTH) - 1)) {
	    this.highlight(index + (direction * BOARD_WIDTH) - 1, highlights, 0, pawn.color);
	}
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
	    highlights[index + (direction * BOARD_WIDTH) + 1] = ENPASSANT;
	} else if(this.isEqualObject(this.state.lastMove, targetMoveLeft)) {
	    highlights[index + (direction * BOARD_WIDTH) - 1] = ENPASSANT;
	}
    }
    
    highlightPawn(index){
	const highlights = this.state.highlights.slice();
	this.highlightPawnMovements(index,highlights);
	this.highlightPawnAttacks(index, highlights);
	this.highlightEnPassant(index, highlights);
	this.setState({
	    highlights:highlights,
	});
    }
    
    highlightBishop(index)  {
	const highlights = this.state.highlights.slice();
	//northeast
	for(let pos = index - (BOARD_WIDTH - 1); pos >= 0; pos -= (BOARD_WIDTH - 1)) {
	    if(!this.highlight(pos, highlights, RIGHT, this.state.squares[index].color)){
		break;
	    }
	}
	//southwest
	for(let pos = index + (BOARD_WIDTH - 1); pos < NUM_SQUARES; pos += (BOARD_WIDTH - 1)) {
	    if(!this.highlight(pos, highlights, LEFT, this.state.squares[index].color)){
		break;
	    }
	}
	//northwest
	for(let pos = index - (BOARD_WIDTH + 1); pos >= 0; pos -= (BOARD_WIDTH + 1)) {
	    if(!this.highlight(pos, highlights, LEFT, this.state.squares[index].color)){
		break;
	    }
	}
	//southeast
	for(let pos = index + (BOARD_WIDTH + 1); pos < NUM_SQUARES; pos += (BOARD_WIDTH + 1)) {
	    if(!this.highlight(pos, highlights, RIGHT, this.state.squares[index].color)){
		break;
	    }
	}
	
	this.setState({
	    highlights: highlights,
	})
	return highlights;
	
    }
    
    highlightKing(index) {
	const highlights = this.state.highlights.slice();
	//north
	this.highlight(index - 1 * BOARD_WIDTH, highlights, 0, this.state.squares[index].color);
	//northeast
	this.highlight(index - 1 * BOARD_WIDTH + 1, highlights, RIGHT, this.state.squares[index].color);
	//east
	this.highlight(index + 1, highlights, RIGHT, this.state.squares[index].color);
	//southeast
	this.highlight(index + 1 * BOARD_WIDTH + 1, highlights, RIGHT, this.state.squares[index].color);
	//south
	this.highlight(index + 1 * BOARD_WIDTH, highlights, 0, this.state.squares[index].color);
	//southwest
	this.highlight(index + 1 * BOARD_WIDTH - 1, highlights, LEFT, this.state.squares[index].color);
	//west
	this.highlight(index - 1, highlights, LEFT, this.state.squares[index].color);
	//northwest
	this.highlight(index - 1 * BOARD_WIDTH - 1, highlights, LEFT, this.state.squares[index].color);

	this.setState({
	    highlights: highlights,
	})

    }

    highlightRook(index) {
	const highlights = this.state.highlights.slice();
	//north
	for(let pos = index - BOARD_WIDTH; pos > 0; pos -= BOARD_WIDTH) {
	    if(!this.highlight(pos, highlights, 0, this.state.squares[index].color)) {
		break;
	    }
	}
	//south
	for(let pos = index + BOARD_WIDTH; pos < NUM_SQUARES; pos += BOARD_WIDTH) {
	    if(!this.highlight(pos, highlights, 0, this.state.squares[index].color)) {
		break;
	    }
	}
	//east
	for(let pos = index + 1;; pos++) {
	    if(!this.highlight(pos, highlights, RIGHT, this.state.squares[index].color)) {
		break;
	    }
	}
	//west
	for(let pos = index - 1;; pos--) {
	    if(!this.highlight(pos, highlights, LEFT, this.state.squares[index].color)) {
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
	this.highlight(index - 2 * BOARD_WIDTH + 1, highlights, RIGHT, this.state.squares[index].color);
	// up 2, left 1
	this.highlight(index - 2 * BOARD_WIDTH - 1, highlights, LEFT, this.state.squares[index].color);
	// right
	if((index + 2 + 1 * BOARD_WIDTH) % BOARD_WIDTH > index % BOARD_WIDTH) {
	    // right 2, up 1
	    this.highlight(index + 2 + 1 * BOARD_WIDTH, highlights, RIGHT, this.state.squares[index].color);
	    // right 2, down 1
	    this.highlight(index + 2 - 1 * BOARD_WIDTH, highlights, RIGHT, this.state.squares[index].color);
	}
	// south
	// south 2, right 1
	this.highlight(index + 2 * BOARD_WIDTH + 1, highlights, RIGHT, this.state.squares[index].color);
	// south 2, left 1
	this.highlight(index + 2 * BOARD_WIDTH - 1, highlights, LEFT, this.state.squares[index].color);
	// left
	if((index - 2 + 1 * BOARD_WIDTH) % BOARD_WIDTH < index % BOARD_WIDTH) {
	    // left 2, up 1
	    this.highlight(index - 2 + 1 * BOARD_WIDTH, highlights, LEFT, this.state.squares[index].color);
	    // left 2, down 1
	    this.highlight(index - 2 - 1 * BOARD_WIDTH, highlights, LEFT, this.state.squares[index].color);
	}

	this.setState({
	    highlights: highlights,
	})

    }

    highlight(index, highlights, dir, color) {
	//go off the right side of the board
	if(dir === RIGHT && index % BOARD_WIDTH === 0) {
	    return false;
	}
	// or off the left side
	if(dir === LEFT && index % BOARD_WIDTH === (BOARD_WIDTH - 1)) {
	    return false;
	}
	if(index >= NUM_SQUARES) {
	    return false;
	}
	if(index < 0) {
	    return false;
	}
	if(this.hasPiece(index)) {
	    if(this.state.squares[index].color !== color) {
		highlights[index] = ENEMY;
	    }
	    return false;
	}
	highlights[index] = OPEN;
	return true;
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

    makeMove(index) {
	const squares = this.state.squares.slice();
	let lastMove = {
	    start: this.state.selected,
	    end: index,
	    piece: this.state.squares[this.state.selected]
	}   
	if(this.state.highlights[index] === OPEN) {
	    this.switchPieces(index, squares);
	} else if(this.state.highlights[index] === ENEMY) {
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
