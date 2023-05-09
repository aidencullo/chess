// external
import React from 'react';

// internal
import { Piece } from '@models/composite/Piece';
import wking from '@/media/white/King.png';
import bking from '@/media/black/King.png';

/* 
 * KingComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type Props = {
    piece : Piece | null;
}

export default class KingComponent extends React.Component<Props> {

    constructor(props : Props){
	super(props);
    }
    
    render() {
	return (
	    <>
		{
		    this.props.piece?.isWhite() ? <img className="piece" src={ wking } alt="white king" /> :
			<img className="piece" src={ bking } alt="black king" />
		}
	    </>
	);
    }    
}
