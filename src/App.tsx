// external
import React from 'react';

// internal
import Game from '@components/GameComponent';
import './index.css'

/*
 * Homepage
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */
export default class Screen extends React.Component {

    render() {
	return (
	    <div className="game">
		<Game/>
	    </div>
	);
    }

}
