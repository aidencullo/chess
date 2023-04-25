import React from 'react';

import { Color } from 'data';
import wrook from 'media/white/Rook.png';
import brook from 'media/black/Rook.png';

export default class Rook extends React.Component {

    render() {
	return (
	    <>
		<img className="piece" src={this.props.state.color === Color.White ? wrook : brook} alt="chess piece" />
	    </>
	);
    }
}
