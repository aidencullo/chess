// external
import React from 'react';

// internal
import { Color } from 'data';
import wpawn from 'media/white/Pawn.png';
import bpawn from 'media/black/Pawn.png';

/* 
 * Pawn chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */
export default class Pawn extends React.Component {

    /************************************************************************/

    /*
     * HIGHLIGHTING
     *
     * highlight possible moves
     */
    
    /************************************************************************/

    /**
     * Highlight possible pawn moves
     * @function
     * @param {number} index - index in chessboard
     */
    highlight() {
	console.log("highlight");
	// const highlights = this.state.highlights.slice();
	// highlights[0] = 1;
//	this.highlightPawnMoves(index, highlights);
//	this.highlightPawnAttacks(index, highlights);
	
	// set highlights
    }

    highlightPawnMoves(index, highlights) {
	// let pawn = this.state.squares[index];
	// let direction = this.getDirection(pawn.color);
	// let position = index + direction * BOARD_WIDTH;
	
	// if (this.isValidPawnMoveSquare(position)) {
	//     this.tryHighlight(position, highlights, OPEN);
	//     position = position + direction * BOARD_WIDTH;
	//     if (this.atStartingPawnPosition(index)) {
	// 	if (this.isValidPawnMoveSquare(position)) {
	// 	    this.tryHighlight(position, highlights, OPEN);
	// 	}
	//     }
	// }
    }

    // highlightPawnAttacks(index, highlights) {
    // 	let pawn = this.state.squares[index];
    // 	let direction = this.getDirection(pawn.color);
    // 	let position = index + (direction * BOARD_WIDTH) + 1;
	
    // 	if (column(position) !== 0 && this.hasPiece(position)) {
    // 	    this.tryHighlight(position, highlights, ATTACK);
    // 	}
    // 	position = index + (direction * BOARD_WIDTH) - 1;
    // 	if (column(position) !== BOARD_WIDTH - 1 && this.hasPiece(position)) {
    // 	    this.tryHighlight(position, highlights, ATTACK);
    // 	}
    // 	this.highlightEnPassant(index, highlights);
    // }

    // highlightEnPassant(index, highlights) {
    // 	let pawn = this.state.squares[index];
    // 	let direction = this.getDirection(pawn.color);
	
    // 	let targetMoveRight = {
    // 	    start: index + (direction * 2 * BOARD_WIDTH) + 1,
    // 	    end: index + 1,
    // 	    piece: {
    // 		color: Number(!pawn.color),
    // 		piece: Piece.Pawn
    // 	    }
    // 	};

    // 	let targetMoveLeft = {
    // 	    start: index + (direction * 2 * BOARD_WIDTH) - 1,
    // 	    end: index - 1,
    // 	    piece: {
    // 		color: Number(!pawn.color),
    // 		piece: Piece.Pawn
    // 	    }
    // 	};

    // 	if (isEqualObject(this.state.lastMove, targetMoveRight)) {
    // 	    this.tryHighlight(index + (direction * BOARD_WIDTH) + 1, highlights, ENPASSANT);
    // 	} else if (isEqualObject(this.state.lastMove, targetMoveLeft)) {
    // 	    this.tryHighlight(index + (direction * BOARD_WIDTH) - 1, highlights, ENPASSANT);
    // 	}
    // }
    
    render() {
	return (
	    <>
		{this.props.state.color === Color.White ? <img className="piece" src={wpawn} alt="white pawn chess piece"/> :
		 <img className="piece" src={bpawn} alt="black pawn chess piece" onClick={this.highlight}/>}
	    </>
	);
    }
}
