// external
import React from 'react';

// internal
import Game from '@/Game';

/* 
 * Homepage
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */
export default class Screen extends React.Component {

    constructor(props) {
	super(props);
	this.state = {};
    }

    render() {
	return (
	    <div className="game">
		<Game/>
	    </div>
	);
    }

}
