/*
 * React component for a bishop piece
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import React from 'react';

import { Piece } from '@/models/composite/Piece';
import wbishop from '@/media/white/Bishop.png';
import bbishop from '@/media/black/Bishop.png';

type Props = {
    piece : Piece;
}

export default class Bishop extends React.Component <Props> {

    render() {
	return (
	    <>
		{
		    this.props.piece.isWhite() ?
			<img className="piece" src={ wbishop } alt="white bishop chess piece" /> :
		    <img className="piece" src={ bbishop} alt="black bishop chess piece" />
		}
	    </>
	);
    }
}
