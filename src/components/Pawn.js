// external
import React from 'react';

// internal
import { BOARD_WIDTH, BOARD_SIZE, OPEN, ATTACK, ENPASSANT, Color, Piece, EMPTY_SQUARE } from 'data';
import wpawn from 'media/white/Pawn.png';
import bpawn from 'media/black/Pawn.png';
import { getDirection, isOnBoard } from 'auxiliary/helpers';
import { row, column, distance } from 'auxiliary/geometry';

/* 
 * Pawn chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */
export default class Pawn extends React.Component {

  constructor(props){
    super(props);
    this.highlight = this.highlight.bind(this);
  }
    
    /************************************************************************/

    /*
     * HIGHLIGHTING
     *
     * highlight possible moves
     */
    
    /************************************************************************/

    highlight() {
	const highlights = this.props.highlights.slice();
	this.highlightMoves(this.props.index, highlights);
	this.highlightAttacks(this.props.index, highlights);
	
	this.props.setHighlights(highlights);
    }

    highlightMoves(index, highlights) {
	let pawn = this.props.squares[index];
	let direction = getDirection(pawn.color);
	let position = index + direction * BOARD_WIDTH;
	
	if (this.isValidMove(position)) {
	    highlights[position] = 1;
	    position = position + direction * BOARD_WIDTH;
	    if (this.hasMoved(index)) {
		return;
	    }
	    if (this.isValidMove(position)) {
		    highlights[position] = 1;
	    }
	}
    }

    isValidMove(index) {
	return isOnBoard(index) && !this.hasPiece(index);
    }    

    onWestEdge(index) {
	return column(index) === 0;
    }    

    onEastEdge(index) {
	return column(index) === BOARD_WIDTH - 1;
    }    

    hasMoved(index) {
	if (this.props.squares[index].color === Color.White) {
	    return Math.floor(index/BOARD_WIDTH) !== 6;
	}
	return Math.floor(index/BOARD_WIDTH) !== 1;
    }

    hasPiece(index) {
	return this.props.squares[index].piece !== Piece.NoPiece;
    }    
	
    highlightAttacks(currentIndex, highlights) {
	let pawn = this.props.squares[currentIndex];
	let direction = getDirection(pawn.color);
	let targetIndex = currentIndex + (direction * BOARD_WIDTH) + 1;

	if (!this.onEastEdge(currentIndex)) {
	    highlights[targetIndex] = Number(this.hasPiece(targetIndex) * 2);	    
	}

	targetIndex = currentIndex + (direction * BOARD_WIDTH) - 1;
	
	if (!this.onWestEdge(currentIndex)) {
	    highlights[targetIndex] = Number(this.hasPiece(targetIndex) * 2);	    
	}

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
    }
    
    render() {
	return (
	    <>
		{this.props.state.color === Color.White ? <img className="piece" src={wpawn} alt="white pawn chess piece" onClick={this.highlight}/> :
		 <img className="piece" src={bpawn} alt="black pawn chess piece" onClick={this.highlight}/>}
	    </>
	);
    }
}
