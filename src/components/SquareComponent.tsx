// external
import React from 'react';

// internal
import PawnComponent from '@components/PawnComponent';
import KnightComponent from '@components/KnightComponent';
import BishopComponent from '@components/BishopComponent';
import RookComponent from '@components/RookComponent';
import QueenComponent from '@components/QueenComponent';
import KingComponent from '@components/KingComponent';
import { BOARD_WIDTH } from '@constants/board';
import { Piece } from '@models/Piece';

var WHITE = "white";
var OTHER = "brown";

export default class SquareComponent extends React.Component {

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
	if(color === 1){
	    return "green";
	} else if (color === 2) {
	    return "red";
	} else {
	    return "transparent";
	}
    }

    // render() {
    // 	return (
    // 	    <button
    // 		className="square"
    // 		style={{ 
    // 		    backgroundColor: this.getColor(),
    // 		    borderColor: this.setColor(this.props.highlight),
    // 		}}
    // 		onClick={() => this.props.handleClick()}
    // 	    >
    // 		{(() => {
    // 		    switch (this.props.state.piece) {
    // 		    case Piece.Pawn:
    // 			return <Pawn
    // 				   state={this.props.state}
    // 				   highlights={this.props.highlights}
    // 				   setHighlights={this.props.setHighlights}
    // 				   index={this.props.id}
    // 				   squares={this.props.squares}				   
    // 				   turn={this.props.turn}
    // 				   lastMove={this.props.lastMove}
    // 			       />;
    // 		    case Piece.Knight:
    // 			return <Knight
    // 				   state={this.props.state}
    // 			       />;
    // 		    case Piece.BishopComponent:
    // 			return <BishopComponent
    // 				   state={this.props.state}
    // 			       />;
    // 		    case Piece.Rook:
    // 			return <Rook
    // 				   state={this.props.state}
    // 			       />;
    // 		    case Piece.Queen:
    // 			return <Queen
    // 				   state={this.props.state}
    // 			       />;
    // 		    case Piece.KingComponent:
    // 			return <KingComponent
    // 				   state={this.props.state}
    // 			       />;
    // 		    default:
    // 		    }
    // 		})()}		
    // 	    </button>
    // 	);
    // }

    render() {
		console.log(this.props.state)
	return (
	    <button
	    className="square"
	    style={{ 
		backgroundColor: this.getColor(),
		borderColor: this.setColor(this.props.highlight),
	    }}
	    onClick={() => this.props.handleClick()}
		>
		<PawnComponent
	    state={this.props.state}
	    // highlights={this.props.highlights}
	    // setHighlights={this.props.setHighlights}
	    // index={this.props.id}
	    // squares={this.props.squares}				   
	    // turn={this.props.turn}
	    // lastMove={this.props.lastMove}
		/>
	    </button>
	);
    }
    
}
