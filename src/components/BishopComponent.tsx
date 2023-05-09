// external
import React from 'react';

// internal
import { Piece } from '@models/composite/Piece';
import wbishop from '@/media/white/Bishop.png';
import bbishop from '@/media/black/Bishop.png';

/* 
 * BishopComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type Props = {
    piece : Piece | null;
}

export default class BishopComponent extends React.Component<Props> {

    constructor(props : Props){
	super(props);
    }
    
    render() {
	return (
	    <>
		{
		    this.props.piece?.isWhite() ? <img className="piece" src={ wbishop } alt="white bishop" /> :
			<img className="piece" src={ bbishop } alt="black bishop" />
		}
	    </>
	);
    }    
}
