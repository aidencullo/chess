/* 
 * Chess piece move logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';
import { up, down } from '@auxiliary/geometry';
import { BOARD_WIDTH } from '@constants/board';

export class MoveLogic {
    private _squares : Square[];

    constructor(squares : Square[]) {
	this._squares = squares;
    }

    /** MOVES */
    
    getMoves(index : number) {
	return this.getMovesPawn(index)
    }

    /** PAWN MOVES */

    getMovesPawn(index : number) {
	return this.getMovesPawnOpen(index)
    }

    
    getMovesPawnOpen(index : number) {
	const highlights = new Array(64).fill({}).map(() => new Highlight("closed"))
	const isWhite = this._squares[index].getPiece()?.isWhite();
	const firstPosition = isWhite ? up(index, 1) : down(index, 1);

	if (this.isValidMove(firstPosition)) {
	    highlights[firstPosition].setOpen();
	}
        if (!this.hasMovedPawn(index)) {
	    const secondPosition = isWhite ? up(index, 2) : down(index, 2);	
            if (this.isValidMove(secondPosition)) {
		highlights[secondPosition].setOpen();
            }
	}

	return highlights;

    }
    
    /** CHECKS */

    isValidMove(index : number) {
	return this.isOnBoard(index) && !this.hasPiece(index);
    }    	

    hasPiece(index : number) {
	return this._squares[index].getPiece() !== null;
    }    

    isOnBoard(index : number) {
	return index > 0 && index < 64;
    }

    /** PAWN CHECKS */

    hasMovedPawn(index : number) {
	if (this._squares[index].getPiece()?.isWhite()) {
	    return Math.floor(index / BOARD_WIDTH) !== 6;
	}
	return Math.floor(index / BOARD_WIDTH) !== 1;
    }

}
