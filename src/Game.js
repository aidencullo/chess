import React from 'react';

import Square from './Square.js';

// Global vars
var BOARD_WIDTH = 8;
var BLACK_SIDE = 15;
var WHITE = 1;
var BLACK = 0;
var NUM_SQUARES = 64;
var RIGHT = 1;
var LEFT = -1;

export default class Game extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    squares: new Array(64).fill({
		color: undefined,
		piece: undefined,
	    }),
	    highlights: new Array(64).fill(0),
	    active:false,
	};
    }

    componentDidMount() {
	this.initializeBoard();
    }

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
		squares[index] = {
		    color: -1,
		    piece: "",
		};
	    }
	}

	this.setState({
	    squares: squares,
	});
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
		piece: "r"
	    };
	case 1:
	    return {
		color: color,
		piece: "kn"
	    };
	case 2:
	    return {
		color: color,
		piece: "b"
	    };
	case 3:
	    return {
		color: color,
		piece: "q"
	    };
	case 4:
	    return {
		color: color,
		piece: "k"
	    };
	case 5:
	    return {
		color: color,
		piece: "b"
	    };
	case 6:
	    return {
		color: color,
		piece: "kn"
	    };
	case 7:
	    return {
		color: color,
		piece: "r"
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
		piece: "p"
	    };
	} else {
	    return {
		color: BLACK,
		piece: "p"
	    };
	}
    }

    getPieceInfo(index) {
	if (this.state.squares[index].color !== undefined) {
	    return this.state.squares[index];
	}
    }

    //unfinished
    checkMoves(index) {
	const square = this.state.squares[index];
	switch (square.piece) {
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
	});
    }

    //incomplete
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

    //incomplete
    highlightPawn(index){
	const highlights = this.state.highlights.slice();
	let pawnColor = this.state.squares[index].color;
	
	if(pawnColor === BLACK){
	    this.highlight(index + BOARD_WIDTH, highlights, 0);
	}
	if(pawnColor === WHITE){
	    this.highlight(index - BOARD_WIDTH, highlights, 0);
	}
	this.setState({
	    highlights:highlights,
	});
    }
    
    //incomplete
    highlightBishop(index)  {
	const highlights = this.state.highlights.slice();
	//northeast
	for(let pos = index - (BOARD_WIDTH - 1); pos >= 0; pos -= (BOARD_WIDTH - 1)) {
	    if(!this.highlight(pos, highlights, RIGHT)){
		break;
	    }
	}
	//southwest
	for(let pos = index + (BOARD_WIDTH - 1); pos < NUM_SQUARES; pos += (BOARD_WIDTH - 1)) {
	    if(!this.highlight(pos, highlights, LEFT)){
		break;
	    }
	}
	//northwest
	for(let pos = index - (BOARD_WIDTH + 1); pos >= 0; pos -= (BOARD_WIDTH + 1)) {
	    if(!this.highlight(pos, highlights, LEFT)){
		break;
	    }
	}
	//southeast
	for(let pos = index + (BOARD_WIDTH + 1); pos < NUM_SQUARES; pos += (BOARD_WIDTH + 1)) {
	    if(!this.highlight(pos, highlights, RIGHT)){
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
	this.highlight(index - 1 * BOARD_WIDTH, highlights, 0);
	//northeast
	this.highlight(index - 1 * BOARD_WIDTH + 1, highlights, RIGHT);
	//east
	this.highlight(index + 1, highlights, RIGHT);
	//southeast
	this.highlight(index + 1 * BOARD_WIDTH + 1, highlights, RIGHT);
	//south
	this.highlight(index + 1 * BOARD_WIDTH, highlights, 0);
	//southwest
	this.highlight(index + 1 * BOARD_WIDTH - 1, highlights, LEFT);
	//west
	this.highlight(index - 1, highlights, LEFT);
	//northwest
	this.highlight(index - 1 * BOARD_WIDTH - 1, highlights, LEFT);

	this.setState({
	    highlights: highlights,
	})

    }

    highlightRook(index) {
	const highlights = this.state.highlights.slice();
	//north
	for(let pos = index - BOARD_WIDTH; pos > 0; pos -= BOARD_WIDTH) {
	    if(!this.highlight(pos, highlights, 0)) {
		break;
	    }
	}
	//south
	for(let pos = index + BOARD_WIDTH; pos < NUM_SQUARES; pos += BOARD_WIDTH) {
	    if(!this.highlight(pos, highlights, 0)) {
		break;
	    }
	}
	//east
	for(let pos = index + 1;; pos++) {
	    if(!this.highlight(pos, highlights, RIGHT)) {
		break;
	    }
	}
	//west
	for(let pos = index - 1;; pos--) {
	    if(!this.highlight(pos, highlights, LEFT)) {
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
	this.highlight(index - 2 * BOARD_WIDTH + 1, highlights, RIGHT);
	// up 2, left 1
	this.highlight(index - 2 * BOARD_WIDTH - 1, highlights, LEFT);
	// right
	// right 2, up 1
	this.highlight(index + 2 + 1 * BOARD_WIDTH, highlights, RIGHT);
	// right 2, down 1
	this.highlight(index + 2 - 1 * BOARD_WIDTH, highlights, RIGHT);
	// south
	// south 2, right 1
	this.highlight(index + 2 * BOARD_WIDTH + 1, highlights, RIGHT);
	// south 2, left 1
	this.highlight(index + 2 * BOARD_WIDTH - 1, highlights, LEFT);
	// left
	// left 2, up 1
	this.highlight(index - 2 + 1 * BOARD_WIDTH, highlights, LEFT);
	// left 2, down 1
	this.highlight(index - 2 - 1 * BOARD_WIDTH, highlights, LEFT);

	this.setState({
	    highlights: highlights,
	})

    }

    highlight(index, highlights, dir) {
	//go off the right side of the board
	if(dir === RIGHT && (index % BOARD_WIDTH === 0 || index % BOARD_WIDTH === 1)) {
	    return false;
	}
	// or off the left side
	if(dir === LEFT && (index % BOARD_WIDTH === (BOARD_WIDTH - 1) || index % BOARD_WIDTH === (BOARD_WIDTH - 2))) {
	    return false;
	}
	if(index >= NUM_SQUARES) {
	    return false;
	}
	if(index < 0) {
	    return false;
	}
	if(this.hasPiece(index)) {
	    return false;
	}
	highlights[index] = 1;
	console.log("valid");
	return true;
    }

    hasPiece(index) {
	return this.state.squares[index].piece !== "";
    }

    render() {
	return (
	    <div>
		{this.state.squares.map((square, index) => (
		    <Square
			key={index}
			id={index}
			getPieceInfo={() => this.getPieceInfo(index)}
			checkMoves={() => this.checkMoves(index)}
			highlight={this.state.highlights[index]}
		    />
		))}
	    </div>
	);
    }

}
