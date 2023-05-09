// external
import React from 'react';

// internal
import { Piece } from '@models/composite/Piece';
import wknight from '@/media/white/Knight.png';
import bknight from '@/media/black/Knight.png';

/* 
 * KnightComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type Props = {
    piece : Piece | null;
}

export default class KnightComponent extends React.Component<Props> {

    constructor(props : Props){
	super(props);
    }
    
    render() {
	return (
	    <>
		{
		    this.props.piece?.isWhite() ? <img className="piece" src={ wknight } alt="white knight" /> :
			<img className="piece" src={ bknight } alt="black knight" />
		}
	    </>
	);
    }    
}
