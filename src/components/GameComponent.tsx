// external
import React from 'react';

// internal
import SquareComponent from '@components/SquareComponent';
import { Board } from '@models/composite/Board';
import { Highlight } from '@models/modular/Highlight';
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
	    board: new Board(),
	};
    }

    componentDidMount() {
	this.initializeBoard();
    }

    initializeBoard() {
	this.setStandardBoard();
    }

    setStandardBoard() {
	console.log("setting standard board!");
    }

    render() {
	return (
	    <div>
		<div className="board">
		{this.state.board.getSquares().map((square : Square, index : number) => (
			<SquareComponent
			    key={index}
			highlight={new Highlight("open")}
			square={square}
			/>
		    ))}
		</div>
		<button onClick={() => this.initializeBoard()}>Restart</button>
	    </div>
	);
    }
}
