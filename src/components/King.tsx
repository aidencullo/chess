import React from 'react';

import { Color } from '@/types/Color';
import wking from '@/media/white/King.png';
import bking from '@/media/black/King.png';

export default class King extends React.Component {

    render() {
	return (
	    <>
		{
		    this.props.state.color === Color.White ?
			<img className="piece" src={ wking } alt="white king chess piece" /> :
		    <img className="piece" src={ bking } alt="black king chess piece" />
		}
	    </>
	);
    }
}
