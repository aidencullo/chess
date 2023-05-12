/* 
 * Chessboard
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Rook } from '@models/composite/pieces/Rook';
import { Knight } from '@models/composite/pieces/Knight';
import { Bishop } from '@models/composite/pieces/Bishop';
import { Queen } from '@models/composite/pieces/Queen';
import { King } from '@models/composite/pieces/King';
import { Pawn } from '@models/composite/pieces/Pawn';

export class Board {

    static handleClick(index : number) : void {
	console.log(`${index} click handled`)
	// this._state.highlights = new Array(64).fill(null).map(() => new Highlight("open"));
	// if (this._state.active) {
	//     this.closeAllHighlights();
	// } else {
	//     this.openAllHighlights();
	//     // this.showMoves(index);
	// }
    }

    static createStandardBoard() {
	const squares = new Array(64).fill(null).map(() => new Square(null));
	squares[0].setPiece(new Rook("black"));
	squares[1].setPiece(new Knight("black"));
	squares[2].setPiece(new Bishop("black"));
	squares[3].setPiece(new Queen("black"));
	squares[4].setPiece(new King("black"));
	squares[5].setPiece(new Bishop("black"));
	squares[6].setPiece(new Knight("black"));
	squares[7].setPiece(new Rook("black"));
	squares[8].setPiece(new Pawn("black"));
	squares[9].setPiece(new Pawn("black"));
	squares[10].setPiece(new Pawn("black"));
	squares[11].setPiece(new Pawn("black"));
	squares[12].setPiece(new Pawn("black"));
	squares[13].setPiece(new Pawn("black"));
	squares[14].setPiece(new Pawn("black"));
	squares[15].setPiece(new Pawn("black"));
	squares[56].setPiece(new Rook("white"));
	squares[57].setPiece(new Knight("white"));
	squares[58].setPiece(new Bishop("white"));
	squares[59].setPiece(new Queen("white"));
	squares[60].setPiece(new King("white"));
	squares[61].setPiece(new Bishop("white"));
	squares[62].setPiece(new Knight("white"));
	squares[63].setPiece(new Rook("white"));
	squares[48].setPiece(new Pawn("white"));
	squares[49].setPiece(new Pawn("white"));
	squares[50].setPiece(new Pawn("white"));
	squares[51].setPiece(new Pawn("white"));
	squares[52].setPiece(new Pawn("white"));
	squares[53].setPiece(new Pawn("white"));
	squares[54].setPiece(new Pawn("white"));
	squares[55].setPiece(new Pawn("white"));
	return squares;
    }

    static createEmptyBoard() {
	return new Array(64).fill(null).map(() => new Square(null));
    }

    static createPawnAttackBoard() {
	const squares = new Array(64).fill(null).map(() => new Square(null));
	squares[0].setPiece(new Pawn("black"));
	squares[9].setPiece(new Pawn("white"));
	return squares;
    }
    
}
