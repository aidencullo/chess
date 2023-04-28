// external
import React from 'react';

// internal
import Pawn from 'components/Pawn.js';
import Knight from 'components/Knight.js';
import Bishop from 'components/Bishop.js';
import Rook from 'components/Rook.js';
import Queen from 'components/Queen.js';
import King from 'components/King.js';
import { BOARD_WIDTH, Piece } from 'data';

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
				   highlights={this.props.highlights}
				   setHighlights={this.props.setHighlights}
				   index={this.props.id}
				   squares={this.props.squares}				   
				   turn={this.props.turn}
				   lastMove={this.props.lastMove}
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
		    default:
		    }
		})()}		
	    </button>
	);
    }
}
