import React from 'react';

import { Color } from './data';
import wknight from './media/white/Knight.png';
import bknight from './media/black/Knight.png';

export default class Knight extends React.Component {

    render() {
	return (
	    <>
		<img className="piece" src={this.props.state.color === Color.White ? wknight : bknight} alt="chess piece" />
	    </>
	);
    }
}
