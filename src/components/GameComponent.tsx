// external
import React from 'react';

// internal
import SquareComponent from '@components/SquareComponent';
import { Board } from '@models/composite/Board';
import { Square } from '@models/composite/Square';

/* 
 * Chess board and logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type State = {
    board: Board;
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
	    board: new Board("standard"),
	};
	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index : number) {
	console.log("handling click")
	// const board = Object.create(this.state.board);
	// board.showMoves(index);
	// this.setState({
	//     board: board,
	// })
    }
    
    render() {
	return (
	    <div>
		<div className="board">
		{
		    this.state.board.getSquares().map((square : Square, index : number) => (
			<SquareComponent
			id={"square-"+index}
			key={index}
			index={index}
			highlight={this.state.board.getHighlight(index)}
			square={square}
			handleClick={() => this.handleClick(index)}
			    />
		    ))
		}
		</div>
		<button onClick={() => console.log("this.initializeBoard()")}>Restart</button>
	    </div>
	);
    }
    
}
