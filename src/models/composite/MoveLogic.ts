/* 
 * Chess piece move logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';
import { up, down, isWestEdge, isEastEdge, onBoard } from '@auxiliary/geometry';
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
	const highlights = new Array(64).fill({}).map(() => new Highlight("closed"))
	this.getMovesPawnOpen(index, highlights)
	this.getMovesPawnAttack(index, highlights)
	return highlights;
    }

    
    getMovesPawnOpen(index : number, highlights : Highlight[]) {
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

    }
        
    getMovesPawnAttack(index : number, highlights : Highlight[]) {
	if (this._squares[index].getPiece()?.isWhite()) {
	    if (!isWestEdge(index)) {
		const eastTarget = up(index +  1, 1);
		if (this.hasEnemyPiece(index, eastTarget)) {
		    highlights[eastTarget].setAttack();
		}
	    }
	    if (!isEastEdge(index)) {
		const westTarget = up(index -  1, 1);
		if (this.hasEnemyPiece(index, westTarget)) {
		    highlights[westTarget].setAttack();
		}
	    }
	}	
    }

    /** CHECKS */

    isValidMove(index : number) {
	return onBoard(index) && !this.hasPiece(index);
    }    	

    hasPiece(index : number) {
	return this._squares[index].getPiece() !== null;
    }    

    hasEnemyPiece(index : number, enemyIndex : number) {
	if (!this.hasPiece(enemyIndex)) {
	    return false;
	}
	return this._squares[index].getPiece()?.getColor() !== this._squares[enemyIndex].getPiece()?.getColor();
    }    

    /** PAWN CHECKS */

    hasMovedPawn(index : number) {
	if (this._squares[index].getPiece()?.isWhite()) {
	    return Math.floor(index / BOARD_WIDTH) !== 6;
	}
	return Math.floor(index / BOARD_WIDTH) !== 1;
    }

}
