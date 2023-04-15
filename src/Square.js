import React from 'react';

import wknight from './media/white/Knight.png';
import bknight from './media/black/Knight.png';
import wking from './media/white/King.png';
import bking from './media/black/King.png';
import wqueen from './media/white/Queen.png';
import bqueen from './media/black/Queen.png';
import wrook from './media/white/Rook.png';
import brook from './media/black/Rook.png';
import wpawn from './media/white/Pawn.png';
import bpawn from './media/black/Pawn.png';
import wbishop from './media/white/Bishop.png';
import bbishop from './media/black/Bishop.png';

var BOARD_WIDTH = 8;
var WHITE = "white";
var OTHER = "brown";

const Color = Object.freeze({
    White: 0,
    Black: 1
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

export default class Square extends React.Component {

    getImg() {
	let state = this.props.state;
	if (state !== undefined) {
	    let color = state.color;
	    switch (state.piece) {
	    case Piece.Knight:
		return this.getImgBySrc(color === Color.White ? wknight : bknight);
	    case Piece.King:
		return this.getImgBySrc(color === Color.White ? wking : bking);
	    case Piece.Rook:
		return this.getImgBySrc(color === Color.White ? wrook : brook);
	    case Piece.Bishop:
		return this.getImgBySrc(color === Color.White ? wbishop : bbishop);
	    case Piece.Queen:
		return this.getImgBySrc(color === Color.White ? wqueen : bqueen);
	    case Piece.Pawn:
		return this.getImgBySrc(color === Color.White ? wpawn : bpawn);
	    default:
	    }
	}
    }

    getImgBySrc(source) {
	return (
	    <img className="piece" src={source} alt="chess piece" />
	);
    }

    getColor() {
	let index = this.props.id;
	let row = Math.floor(index / BOARD_WIDTH);
	if (row % 2 !== 0) {
	    return index % 2 === 0 ? OTHER : WHITE;
	} else {
	    return index % 2 === 0 ? WHITE : OTHER;
	}
    }

    setColor(color) {
	if(color === 0) {
	    return "transparent";
	} else if(color  === 1){
	    return "green";
	} else {
	    return "red";
	}
    }

    render() {
	return (
	    <button
		className="square"
		style={{ 
		    backgroundColor: this.getColor(),
		    borderColor: this.setColor(this.props.highlight),
		}}
		onClick={() => this.props.handleClick()}
	    >
		{this.getImg()}
	    </button>
	);
    }
}
