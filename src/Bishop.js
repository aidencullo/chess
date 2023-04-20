import React from 'react';

import { Color } from './data';
import wbishop from './media/white/Bishop.png';
import bbishop from './media/black/Bishop.png';

export default class Bishop extends React.Component {

    render() {
	return (
	    <>
		<img className="piece" src={this.props.state.color === Color.White ? wbishop : bbishop} alt="chess piece" />
	    </>
	);
    }
}
