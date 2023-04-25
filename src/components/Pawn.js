import React from 'react';

import { Color } from 'data';
import wpawn from 'media/white/Pawn.png';
import bpawn from 'media/black/Pawn.png';

export default class Pawn extends React.Component {

    render() {
	return (
	    <>
		{this.props.state.color === Color.White ? <img className="piece" src={wpawn} alt="white pawn chess piece"/> :
		 <img className="piece" src={bpawn} alt="black pawn chess piece"/>}
	    </>
	);
    }
}
