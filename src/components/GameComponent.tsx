// external
import React from 'react';

// internal
import SquareComponent from '@components/SquareComponent';
import { Board } from '@models/composite/Board';
import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';
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
    index: number;
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
	    squares: Board.createStandardBoard(),
	    highlights: HighlightBoard.createClosedBoard(),
	    active: false,
	    index: 0,
	};
	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index : number) {

	this.setState({
	    squares: Board.createEmptyBoard(),
	})
    // 	if (this.state.active) {
    // 	    const highlights = 	HighlightBoard.createClosedBoard();
    // 	    this.setState({
    // 		highlights: highlights,
    // 		active: !this.state.active,
    // 	    })
    // 	} else {
    // 	    const highlights = 	HighlightBoard.createOpenBoard();
    // 	    this.setState({
    // 		highlights: highlights,
    // 		active: !this.state.active,
    // 	    })
    // 	}
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
