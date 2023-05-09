/* 
 * Chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';
import { BOARD_WIDTH } from '@constants/board';

export class Pawn extends Piece {    
    private _direction : number;
    
    constructor(color : string, index : number) {
	super("pawn", color, index);
	this._direction = this.isWhite() ? 1 : -1;
    }

    advanceOne() {
    	return this._index + this._direction * BOARD_WIDTH;
    }

    advanceTwo() {
    	return this._index + 2 * this._direction * BOARD_WIDTH;
    }
}
