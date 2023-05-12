// external
import React from 'react';

// internal
import SquareComponent from '@components/SquareComponent';
import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';
import { MoveLogic } from '@models/composite/MoveLogic';
import { Board } from '@models/composite/Board';
import { HighlightBoard } from '@models/composite/HighlightBoard';

/* 
 * Chess board and logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type State = {
    squares: Square[];
    highlights: Highlight[];
    active: boolean;
    selected: number;
    turn: string;
}

type Props = {}

export default class Game extends React.Component<Props, State> {

    /*
     * COMPONENT CREATION
     * 
     * Functions loaded when the component is created
     */

    /************************************************************************/

    /**
     * Initialize all state variables to null.
     * @constructor
     */
    constructor(props : Props) {
	super(props);
	this.state = {
	    squares: Board.createPawnAttackBoard(),
	    highlights: HighlightBoard.createClosedBoard(),
	    active: false,
	    selected: -1,
	    turn: "white",
	};
	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index : number) {
	if (this.state.active) {
	    if (this.state.highlights[index].isClosed()) {
		return;
	    }
	    const squares = this.state.squares.slice()
	    this.makeMove(index, squares);
	    this.setState({
		squares: squares,
		active: !this.state.active,
		selected: -1,
		turn: this.state.turn === "white" ? "black" : "white",
		highlights: HighlightBoard.createClosedBoard(),
	    })
	} else {
	    if (this.state.turn !== this.state.squares[index].getPiece()?.getColor()) {
		return;
	    }
	    const moveLogic = new MoveLogic(this.state.squares);
	    const moves = moveLogic.getMoves(index);
	    this.setState({
		highlights: moves,
		active: !this.state.active,
		selected: index,
	    })
	}
    }

    makeMove(index : number, squares : Square[]) {
	if (this.state.highlights[index].isOpen()) {
	    this.swapPieces(index, this.state.selected, squares)
	} else if (this.state.highlights[index].isAttack()) {
	    this.deletePiece(index, squares)
	    this.swapPieces(index, this.state.selected, squares)
	}
    }

    deletePiece(index : number, squares : Square[]) {
	squares[index].setPiece(null);
    }
    
    swapPieces(index : number, otherIndex : number, squares : Square[]) {
	const piece = squares[index].getPiece();
	this.deletePiece(index, squares);
	squares[index].setPiece(squares[otherIndex].getPiece());
	squares[otherIndex].setPiece(piece);
    }
    
    render() {
	return (
	    <div>
		<div className="board">
		{
		    this.state.squares.map((square : Square, index : number) => (
			<SquareComponent
			key={index}
			index={index}
			highlight={this.state.highlights[index]}
			square={square}
			handleClick={() => this.handleClick(index)}
				    />
		    ))
		}
		</div>
	    </div>
	);
    }
    
}
