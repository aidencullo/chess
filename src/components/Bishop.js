import React from 'react';

import { Color } from 'types/Color';
import wbishop from 'media/white/Bishop.png';
import bbishop from 'media/black/Bishop.png';

export default class Bishop extends React.Component {

    render() {
	return (
	    <>
		{
		    this.props.state.color === Color.White ?
			<img className="piece" src={ wbishop } alt="white bishop chess piece" /> :
		    <img className="piece" src={ bbishop} alt="black bishop chess piece" />
		}
	    </>
	);
    }
}
