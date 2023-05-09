// external
import React from 'react';

// internal
import { Piece } from '@models/composite/Piece';
import wpawn from '@/media/white/Pawn.png';
import bpawn from '@/media/black/Pawn.png';

/* 
 * PawnComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */


type Props = {
    piece : Piece | null;
}

export default class PawnComponent extends React.Component<Props> {

    constructor(props : Props){
	super(props);
    }
    
    render() {
	return (
	    <>
		{
		    this.props.piece?.isWhite() ? <img className="piece" src={ wpawn } alt="white pawn" /> :
			<img className="piece" src={ bpawn } alt="black pawn" />
		}
	    </>
	);
    }    
}
