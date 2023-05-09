import React from 'react';

import { Piece } from '@/models/composite/Piece';
import wknight from '@/media/white/KnightComponent.png';
import bknight from '@/media/black/KnightComponent.png';

type Props = {
    piece : Piece;
}

export default class KnightComponent extends React.Component<Props> {

    render() {
	return (
	    <>
		{ this.props.piece.isWhite() ? <img className="piece" src={ wknight} alt="white knight chess piece" /> :
		  <img className="piece" src={ bknight} alt="black knight chess piece" /> }
	    </>
	);
    }
}
