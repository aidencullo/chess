// external
import React from 'react';

// internal
import SquareComponent from '@components/SquareComponent';
import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';
import { MoveLogic } from '@models/composite/MoveLogic';

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
	    squares: new Array(64).fill({}).map(() => new Square(null)),
	    highlights: new Array(64).fill({}).map(() => new Highlight("closed")),
	    active: false,
	};
	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index : number) {
	if (this.state.active) {
	    console.log("active state!")
	} else {
	    console.log("nonactive state!")
	    const moveLogic = new MoveLogic(this.state.squares);
	    const moves = moveLogic.getMoves(index);
	    this.setState({
		highlights: moves,
		active: !this.state.active,
	    })
	}
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
