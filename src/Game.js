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
	    gameState: undefined
	};
    }

    componentDidMount() {
	this.initializeBoard();
    }

    /*
      SETUP

      initialization, setting, resetting pieces and board.

    */
    
    initializeBoard() {
	const squares = this.state.squares.slice();
	for (let index = 0; index < this.state.squares.length; index++) {
	    let row = Math.floor(index / BOARD_WIDTH);
	    switch (row) {
	    case 0:
	    case 7:
		squares[index] = this.setMainPiece(index);
		break;
	    case 1:
	    case 6:
		squares[index] = this.setPawn(index);
		break;
	    default:
		squares[index] = this.setEmptySquare();
	    }
	}

	this.initializeVars(squares);

    }

    initializeVars(squares) {
	this.setState({
	    squares: squares,
	    active: false,
	    selected:-1,
	    gameState:1
	});
    }

    setEmptySquare() {
	return {
	    color: -1,
	    name: ""
	};
    }

    setMainPiece(index) {
	let color;
	if (index <= BLACK_SIDE) {
	    color = BLACK;
	} else {
	    color = WHITE;
	}
	switch (index % BOARD_WIDTH) {
	case 0:
	    return {
		color: color,
		name: "r"
	    };
	case 1:
	    return {
		color: color,
		name: "kn"
	    };
	case 2:
	    return {
		color: color,
		name: "b"
	    };
	case 3:
	    return {
		color: color,
		name: "q"
	    };
	case 4:
	    return {
		color: color,
		name: "k"
	    };
	case 5:
	    return {
		color: color,
		name: "b"
	    };
	case 6:
	    return {
		color: color,
		name: "kn"
	    };
	case 7:
	    return {
		color: color,
		name: "r"
	    };
	default:
	    console.log("rowIndex invalid value");
	    return;
	}
    }

    setPawn(index) {
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

    //incomplete
    // use ref instead of return
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

    highlightPawn(index){
	const highlights = this.state.highlights.slice();
	let pawnColor = this.state.squares[index].color;
	
	if(pawnColor === BLACK){
	    this.highlight(index + BOARD_WIDTH, highlights, 0, this.state.squares[index].color);
	    if(index < BLACK_SIDE) {
		this.highlight(index + 2 * BOARD_WIDTH, highlights, 0, this.state.squares[index].color);
	    }		
	}
	if(pawnColor === WHITE){
	    this.highlight(index - BOARD_WIDTH, highlights, 0, this.state.squares[index].color);
	    if(index > WHITE_SIDE) {
		this.highlight(index - 2 * BOARD_WIDTH, highlights, 0, this.state.squares[index].color);
	    }		
	}
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
		highlights[index] = 2;
	    }
	    return false;
	}
	highlights[index] = 1;
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
	    if(this.state.highlights[index] === OPEN) {
		try {
		    this.switchPieces(index);
		} catch (e) {
		    console.error(e);
		}
	    } else if(this.state.highlights[index] === ENEMY) {
		try {
		    this.takePiece(index);
		} catch (e) {
		    console.error(e);
		}
	    }
	    // no matter what we deselect at this point
	    this.deselectPiece();
	} else {
	    this.checkMoves(index);
	}
    }

    /*
      MOVEMENTS
    */
    
    switchPieces(index) {
	if(this.state.selected === -1) {
	    throw new Error('Piece not selected');
	}

	const squares = this.state.squares.slice();
	let selected = squares[this.state.selected];
	squares[this.state.selected] = squares[index];
	squares[index] = selected;
	this.setState({
	    squares: squares,
	});
    }

    takePiece(index) {
	if(this.state.selected === -1) {
	    throw new Error('Piece not selected');
	}

	const squares = this.state.squares.slice();
	squares[index] = squares[this.state.selected];
	squares[this.state.selected] = EMPTY_SQUARE;
	this.setState({
	    squares: squares,
	});
    }

    /*
      RENDER
    */

    render() {
	return (
	    <div>
		{this.getGame()}
	    </div>
	);
    }
}
