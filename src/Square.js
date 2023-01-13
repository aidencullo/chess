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

export default class Square extends React.Component {

    getImg() {
	let state = this.props.getPieceInfo();
	if (state !== undefined) {
	    let color = state.color;
	    switch (state.name) {
	    case "kn":
		return this.getImgBySrc(color ? wknight : bknight);
	    case "k":
		return this.getImgBySrc(color ? wking : bking);
	    case "r":
		return this.getImgBySrc(color ? wrook : brook);
	    case "b":
		return this.getImgBySrc(color ? wbishop : bbishop);
	    case "q":
		return this.getImgBySrc(color ? wqueen : bqueen);
	    case "p":
		return this.getImgBySrc(color ? wpawn : bpawn);
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
	if(color  === 1){
	    return "green";
	} else if (color === 2) {
	    return "red";
	} else {
	    return "transparent";
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
		onClick={() => this.props.checkMoves()}
	    >
		{this.getImg()}
	    </button>
	);
    }
}
