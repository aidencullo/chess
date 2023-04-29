import React from 'react';

import { Color } from '@/types/Color';
import wrook from '@/media/white/Rook.png';
import brook from '@/media/black/Rook.png';

export default class Rook extends React.Component {

    render() {
	return (
	    <>
		{
		    this.props.state.color === Color.White ?
			<img className="piece" src={ wrook } alt="white rook chess piece" /> :
		    <img className="piece" src={ brook } alt="black rook chess piece" />
		}
	    </>
	);
    }
}
