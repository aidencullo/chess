// external
import React from 'react';

// internal
import { Pawn } from '@models/composite/pieces/Pawn';
import PawnComponent from '@components/PawnComponent';
import { BOARD_WIDTH } from '@constants/board';
import { Move } from '@models/composite/Move';
import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';

type Props = {
    key : number;
    index : number;
    highlights : Highlight[];
    setHighlights : (h : Highlight[]) => void;
    squares : Square[];
    lastMove : Move | null;
}

export default class SquareComponent extends React.Component<Props> {

    getColor() {
	let index = this.props.index;
	let row = Math.floor(index / BOARD_WIDTH);
	if (row % 2 !== 0) {
	    return index % 2 === 0 ? "brown" : "white";
	} else {
	    return index % 2 === 0 ? "white" : "brown";
	}
    }

    getHighlight(highlight : Highlight) {
	if (highlight.isOpen() || highlight.isEnPassant()) {
	    return "green";
	} else if (highlight.isAttack()) {
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
    // 				   index={this.props.index}
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
	return (
	    <button
	    className="square"
	    style={{ 
		backgroundColor: this.getColor(),
		borderColor: this.getHighlight(this.props.highlights[this.props.index]),
	    }}
		>

		{ 
		    this.props.squares[this.props.index].getPiece() &&
			<PawnComponent
		    pawn={this.props.squares[this.props.index].getPiece() as Pawn}
			/>
		}
	    </button>
	);
    }
    
}
