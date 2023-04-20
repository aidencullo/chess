// external
import React from 'react';

// internal
import Pawn from './Pawn.js';
import Knight from './Knight.js';
import Bishop from './Bishop.js';
import Rook from './Rook.js';
import Queen from './Queen.js';
import King from './King.js';
import { BOARD_WIDTH, Color, Piece } from './data';

var WHITE = "white";
var OTHER = "brown";

export default class Square extends React.Component {

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
	} else if(color === 1){
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
		{(() => {
		    switch (this.props.state.piece) {
		    case Piece.Pawn:
			return <Pawn
				   state={this.props.state}
			       />;
		    case Piece.Knight:
			return <Knight
				   state={this.props.state}
			       />;
		    case Piece.Bishop:
			return <Bishop
				   state={this.props.state}
			       />;
		    case Piece.Rook:
			return <Rook
				   state={this.props.state}
			       />;
		    case Piece.Queen:
			return <Queen
				   state={this.props.state}
			       />;
		    case Piece.King:
			return <King
				   state={this.props.state}
			       />;
		    }
		})()}		
	    </button>
	);
    }
}
