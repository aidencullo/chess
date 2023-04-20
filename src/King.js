import React from 'react';

import { Color } from './data';
import wking from './media/white/King.png';
import bking from './media/black/King.png';

export default class King extends React.Component {

    render() {
	return (
	    <>
		<img className="piece" src={this.props.state.color === Color.White ? wking : bking} alt="chess piece" />
	    </>
	);
    }
}
