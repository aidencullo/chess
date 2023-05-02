import React from 'react';

import { Color } from '@/models/Color';
import wrook from '@/media/white/RookComponent.png';
import brook from '@/media/black/RookComponent.png';

export default class RookComponent extends React.Component {

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
