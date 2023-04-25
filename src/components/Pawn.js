import React from 'react';

import { Color } from '../data';
import wpawn from '../media/white/Pawn.png';
import bpawn from '../media/black/Pawn.png';

export default class Pawn extends React.Component {

    render() {
	return (
	    <>
		<img className="piece" src={this.props.state.color === Color.White ? wpawn : bpawn} alt="chess piece" />
	    </>
	);
    }
}
