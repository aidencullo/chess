import React from 'react';

import { Piece } from '@/models/composite/Piece';
import wqueen from '@/media/white/QueenComponent.png';
import bqueen from '@/media/black/QueenComponent.png';

type Props = {
    piece : Piece;
}

export default class QueenComponent extends React.Component<Props> {

    render() {
	return (
	    <>
		{
		    this.props.piece.isWhite() ?
			<img className="piece" src={ wqueen } alt="white queen chess piece" /> :
		    <img className="piece" src={ bqueen } alt="black queen chess piece" />
		}
	    </>
	);
    }
}
