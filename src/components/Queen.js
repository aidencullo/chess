import React from 'react';

import { Color } from 'data';
import wqueen from 'media/white/Queen.png';
import bqueen from 'media/black/Queen.png';

export default class Queen extends React.Component {

    render() {
	return (
	    <>
		<img className="piece" src={this.props.state.color === Color.White ? wqueen : bqueen} alt="chess piece" />
	    </>
	);
    }
}
