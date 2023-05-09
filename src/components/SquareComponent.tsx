// external
import React from 'react';

// internal
import { Pawn } from '@models/composite/pieces/Pawn';
import PawnComponent from '@components/PawnComponent';
import { BOARD_WIDTH } from '@constants/board';
import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';

type Props = {
    index : number;
    highlight : Highlight;
    square : Square;
}

type State = {
    index : number;
    highlight : Highlight;
    square : Square;
}

export default class SquareComponent extends React.Component<Props, State> {

    constructor(props : Props) {
	super(props);
	this.state = {
	    highlight : this.props.highlight,
	    index : this.props.index,
	    square : this.props.square,
	}
    }
    
    getColor() {
	const index = this.state.index;
	const row = Math.floor(index / BOARD_WIDTH);
	if (row % 2 !== 0) {
	    return index % 2 === 0 ? "brown" : "white";
	} else {
	    return index % 2 === 0 ? "white" : "brown";
	}
    }

    getHighlight() {
	const highlight = this.state.highlight;
	if (highlight.isOpen() || highlight.isEnPassant()) {
	    return "green";
	} else if (highlight.isAttack()) {
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
		borderColor: this.getHighlight(),
	    }}>

		{ 
		    this.state.square.getPiece() &&
			<PawnComponent
		    pawn={this.state.square.getPiece() as Pawn}
			/>
		}

	    </button>
	);
    }
    
}
