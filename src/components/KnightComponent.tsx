import React from 'react';

import { Color } from '@/models/Color';
import wknight from '@/media/white/KnightComponent.png';
import bknight from '@/media/black/KnightComponent.png';

export default class KnightComponent extends React.Component {

    render() {
	return (
	    <>
		{ this.props.state.color === Color.White ? <img className="piece" src={ wknight} alt="white knight chess piece" /> :
		  <img className="piece" src={ bknight} alt="black knight chess piece" /> }
	    </>
	);
    }
}
