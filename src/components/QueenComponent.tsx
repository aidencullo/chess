// external
import React from 'react';

// internal
import { Piece } from '@models/composite/Piece';
import wqueen from '@/media/white/Queen.png';
import bqueen from '@/media/black/Queen.png';

/* 
 * QueenComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type Props = {
    piece : Piece | null;
}

export default class QueenComponent extends React.Component<Props> {

    constructor(props : Props){
	super(props);
    }
    
    render() {
	return (
	    <>
		{
		    this.props.piece?.isWhite() ? <img className="piece" src={ wqueen } alt="white queen" /> :
			<img className="piece" src={ bqueen } alt="black queen" />
		}
	    </>
	);
    }    
}
