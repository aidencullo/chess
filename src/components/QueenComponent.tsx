import React from 'react';

import { Color } from '@/models/Color';
import wqueen from '@/media/white/QueenComponent.png';
import bqueen from '@/media/black/QueenComponent.png';

export default class QueenComponent extends React.Component {

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
