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
import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';

type Props = {
    index : number;
    highlight : Highlight;
    square : Square;
    handleClick: () => void;
}

type State = {
    index : number;
    highlight : Highlight;
    square : Square;
    handleClick: () => void;
}

export default class SquareComponent extends React.Component<Props, State> {

    constructor(props : Props) {
	super(props);
	this.state = {
	    highlight : this.props.highlight,
	    index : this.props.index,
	    square : this.props.square,
	    handleClick: this.props.handleClick,
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

    renderSwitch() {
	if (this.state.square.getPiece()?.isPawn()) {
	    return <PawnComponent
	    piece={ this.state.square.getPiece() }
		/>;
	}
	if (this.state.square.getPiece()?.isKnight()) {
	    return <KnightComponent
	    piece={ this.state.square.getPiece() }
		/>;
	}
	if (this.state.square.getPiece()?.isBishop()) {
	    return <BishopComponent
	    piece={ this.state.square.getPiece() }
		/>;
	}
	if (this.state.square.getPiece()?.isRook()) {
	    return <RookComponent
	    piece={ this.state.square.getPiece() }
		/>;
	}
	if (this.state.square.getPiece()?.isQueen()) {
	    return <QueenComponent
	    piece={ this.state.square.getPiece() }
		/>;
	}
	if (this.state.square.getPiece()?.isKing()) {
	    return <KingComponent
	    piece={ this.state.square.getPiece() }
		/>;
	}
	return (
	    <></>
	);
    }

    render() {
	return (
	    <button
	    className="square"
	    style={{ 
		backgroundColor: this.getColor(),
		borderColor: this.getHighlight(),
	    }}
	    onClick={this.state.handleClick}
		>

		{
		    this.renderSwitch()
		}

	    </button>
	);
    }
    
}
