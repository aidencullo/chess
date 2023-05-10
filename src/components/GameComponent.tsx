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
	    board: new Board("standard"),
	};
    }

    handleClick() {
	console.log("click handled");
    }
    
    render() {
	return (
	    <div>
		<div className="board">
		{
		    this.state.board.getSquares().map((square : Square, index : number) => (
			<SquareComponent
			key={index}
			index={index}
			highlight={new Highlight("closed")}
			square={square}
			handleClick={this.handleClick}
			    />
		    ))
		}
		</div>
		<button onClick={() => console.log("this.initializeBoard()")}>Restart</button>
	    </div>
	);
    }
    
}
