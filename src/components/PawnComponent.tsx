// external
import React from 'react';

// internal
import { Pawn } from '@models/composite/pieces/Pawn';
import wpawn from '@/media/white/Pawn.png';
import bpawn from '@/media/black/Pawn.png';

/* 
 * PawnComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type Props = {
    pawn : Pawn;
}

type State = {
    pawn : Pawn;
}

export default class PawnComponent extends React.Component<Props, State> {

    constructor(props : Props){
	super(props);
	if (!this.props.pawn) {
	    throw new Error("no piece provided to pawn component")
	}

	this.state = {
	    pawn: this.props.pawn,
	};	
    }
    
    render() {
	return (
	    <>
		{
		    this.props.pawn?.isWhite() ? <img className="piece" src={ wpawn } alt="white pawn" /> :
			<img className="piece" src={ bpawn } alt="black pawn" />
		}
	    </>
	);
    }    
}
