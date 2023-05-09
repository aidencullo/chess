import React from 'react';

import { Piece } from '@/models/composite/Piece';
import wking from '@/media/white/King.png';
import bking from '@/media/black/King.png';

type Props = {
    piece : Piece;
}

export default class King extends React.Component<Props> {

    render() {
	return (
	    <>
		{
		    this.props.piece.isWhite() ?
			<img className="piece" src={ wking } alt="white king chess piece" /> :
		    <img className="piece" src={ bking } alt="black king chess piece" />
		}
	    </>
	);
    }
}
