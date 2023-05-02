import React from 'react';

import { Color } from '@/enums/Color';
import wqueen from '@/media/white/Queen.png';
import bqueen from '@/media/black/Queen.png';

export default class Queen extends React.Component {

    render() {
	return (
	    <>
		{
		    this.props.state.color === Color.White ?
			<img className="piece" src={ wqueen } alt="white queen chess piece" /> :
		    <img className="piece" src={ bqueen } alt="black queen chess piece" />
		}
	    </>
	);
    }
}
