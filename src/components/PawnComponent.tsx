// external
import React from 'react';

// internal
import { BOARD_WIDTH, BOARD_SIZE, OPEN, ATTACK, ENPASSANT, EMPTY_SQUARE } from '@/constants/board';
import { Piece } from '@/models/Piece';
import { Color } from '@/models/Color';
import { Move } from '@/models/Move';
import { isOnBoard } from '@/auxiliary/board';
import { getDirection } from '@/auxiliary/direction';
import { row, column, distance } from '@/auxiliary/geometry';
import wpawn from '@/media/white/Pawn.png';
import bpawn from '@/media/black/Pawn.png';

/* 
 * PawnComponent chess movement logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */
export default class PawnComponent extends React.Component {

  constructor(props){
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }
    
  //   /************************************************************************/

  //   /*
  //    * HIGHLIGHTING
  //    *
  //    * highlight possible moves
  //    */
    
  //   /************************************************************************/

  //   handleClick() {
  // 	if (this.props.state.color === this.props.turn) {
  // 	    this.highlight();
  // 	}
  //   }

  //   highlight() {
  // 	const highlights = this.props.highlights.slice();
  // 	this.highlightMoves(this.props.index, highlights);
  // 	this.highlightAttacks(this.props.index, highlights);
  // 	this.highlightEnPassant(this.props.index, highlights);
	
  // 	this.props.setHighlights(highlights);
  //   }

  //   highlightMoves(index, highlights) {
  // 	let pawn = this.props.squares[index];
  // 	let direction = getDirection(pawn.color);
  // 	let position = index + direction * BOARD_WIDTH;
	
  // 	if (this.isValidMove(position)) {
  // 	    highlights[position] = 1;
  // 	    position = position + direction * BOARD_WIDTH;
  // 	    if (this.hasMoved(index)) {
  // 		return;
  // 	    }
  // 	    if (this.isValidMove(position)) {
  // 		    highlights[position] = 1;
  // 	    }
  // 	}
  //   }

  //   isValidMove(index) {
  // 	return isOnBoard(index) && !this.hasPiece(index);
  //   }    

  //   onWestEdge(index) {
  // 	return column(index) === 0;
  //   }    

  //   onEastEdge(index) {
  // 	return column(index) === BOARD_WIDTH - 1;
  //   }    

  //   hasMoved(index) {
  // 	if (this.props.squares[index].color === Color.White) {
  // 	    return Math.floor(index/BOARD_WIDTH) !== 6;
  // 	}
  // 	return Math.floor(index/BOARD_WIDTH) !== 1;
  //   }

  //   hasPiece(index) {
  // 	return this.props.squares[index].piece.isNoPiece();
  //   }    
	
  //   highlightAttacks(currentIndex, highlights) {
  // 	let pawn = this.props.squares[currentIndex];
  // 	let direction = getDirection(pawn.color);
  // 	let targetIndex = currentIndex + (direction * BOARD_WIDTH) + 1;

  // 	if (!this.onEastEdge(currentIndex)) {
  // 	    highlights[targetIndex] = Number(this.hasPiece(targetIndex) * 2);	    
  // 	}

  // 	targetIndex = currentIndex + (direction * BOARD_WIDTH) - 1;
	
  // 	if (!this.onWestEdge(currentIndex)) {
  // 	    highlights[targetIndex] = Number(this.hasPiece(targetIndex) * 2);	    
  // 	}

  //   }

  //   highlightEnPassant(index, highlights) {
  // 	let pawn = this.props.squares[index];
  // 	let direction = getDirection(pawn.color);
	
  // 	// let targetMoveEast : MoveI = {
  // 	//     start: index + (direction * 2 * BOARD_WIDTH) + 1,
  // 	//     end: index + 1,
  // 	//     piece: {
  // 	// 	color: pawn.color === Color.White ? Color.Black : Color.White,
  // 	// 	piece: Piece.PawnComponent
  // 	//     } as Piece
  // 	// };

  // 	// let targetMoveWest : MoveI = {
  // 	//     start: index + (direction * 2 * BOARD_WIDTH) - 1,
  // 	//     end: index - 1,
  // 	//     piece: {
  // 	// 	color: pawn.color === Color.White ? Color.Black : Color.White,
  // 	// 	piece: Piece.PawnComponent
  // 	//     } as Piece
  // 	// };

  // 	let targetMoveEast : MoveI = {};

  // 	let targetMoveWest : MoveI = {};

  // 	if (this.props.lastMove.isEqual(targetMoveEast)) {
  // 	    let position = index + (direction * BOARD_WIDTH) + 1;
  // 	    highlights[position] = 2;
  // 	    return;
  // 	}
  // 	if (this.props.lastMove.isEqual(targetMoveWest)) {
  // 	    let position = index + (direction * BOARD_WIDTH) - 1;
  // 	    highlights[position] = 2;
  // 	}
  //   }
    
    render() {
	return (
	    <>
		{
		    this.props.state.isWhite() ? <img className="piece" src={ wpawn } alt="white pawn chess piece" onClick={this.handleClick}/> :
			<img className="piece" src={ bpawn } alt="black pawn chess piece" onClick={this.handleClick}/>
		}
	    </>
	);
    }    
}
