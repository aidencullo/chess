// external
import React from 'react';

// internal
import { Piece } from '@models/composite/Piece';
import wrook from '@/media/white/Rook.png';
import brook from '@/media/black/Rook.png';

/* 
 * RookComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

type Props = {
    piece : Piece | null;
}

export default class RookComponent extends React.Component<Props> {

    constructor(props : Props){
	super(props);
    }
    
    render() {
	return (
	    <>
		{
		    this.props.piece?.isWhite() ? <img className="piece" src={ wrook } alt="white rook" /> :
			<img className="piece" src={ brook } alt="black rook" />
		}
	    </>
	);
    }    
}
