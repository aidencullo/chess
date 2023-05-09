import React from 'react';

import { Piece } from '@/models/composite/Piece';
import wrook from '@/media/white/RookComponent.png';
import brook from '@/media/black/RookComponent.png';


type Props = {
    piece : Piece;
}

export default class RookComponent extends React.Component<Props> {

    render() {
	return (
	    <>
		{
		    this.props.piece.isWhite() ?
			<img className="piece" src={ wrook } alt="white rook chess piece" /> :
		    <img className="piece" src={ brook } alt="black rook chess piece" />
		}
	    </>
	);
    }
}
