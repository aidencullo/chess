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

export default class SquareComponent extends React.Component<Props> {

    constructor(props : Props) {
	super(props);
    }
    
    getColor() {
	const index = this.props.index;
	const row = Math.floor(index / BOARD_WIDTH);
	if (row % 2 !== 0) {
	    return index % 2 === 0 ? "brown" : "white";
	} else {
	    return index % 2 === 0 ? "white" : "brown";
	}
    }

    getHighlight() {
	const highlight = this.props.highlight;
	if (highlight.isOpen() || highlight.isEnPassant()) {
	    return "green";
	} else if (highlight.isAttack()) {
	    return "red";
	} else {
	    return "transparent";
	}
    }

    renderSwitch() {
	if (this.props.square.getPiece()?.isPawn()) {
	    return <PawnComponent
	    piece={ this.props.square.getPiece() }
		/>;
	}
	if (this.props.square.getPiece()?.isKnight()) {
	    return <KnightComponent
	    piece={ this.props.square.getPiece() }
		/>;
	}
	if (this.props.square.getPiece()?.isBishop()) {
	    return <BishopComponent
	    piece={ this.props.square.getPiece() }
		/>;
	}
	if (this.props.square.getPiece()?.isRook()) {
	    return <RookComponent
	    piece={ this.props.square.getPiece() }
		/>;
	}
	if (this.props.square.getPiece()?.isQueen()) {
	    return <QueenComponent
	    piece={ this.props.square.getPiece() }
		/>;
	}
	if (this.props.square.getPiece()?.isKing()) {
	    return <KingComponent
	    piece={ this.props.square.getPiece() }
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
	    onClick={this.props.handleClick}
		>
		{
		    this.renderSwitch()
		}

	    </button>
	);
    }
    
}
