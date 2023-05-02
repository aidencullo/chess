import React from 'react';

import { Color } from '@/models/Color';
import wknight from '@/media/white/Knight.png';
import bknight from '@/media/black/Knight.png';

export default class Knight extends React.Component {

    render() {
	return (
	    <>
		{ this.props.state.color === Color.White ? <img className="piece" src={ wknight} alt="white knight chess piece" /> :
		  <img className="piece" src={ bknight} alt="black knight chess piece" /> }
	    </>
	);
    }
}
