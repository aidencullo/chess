/* 
 * Chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Pawn extends Piece {    
    private _direction : number;
    
    constructor(color : string) {
	super("pawn", color);
	this._direction = this.isWhite() ? 1 : -1;
    }

    getDirection() : number {
	return this._direction;
    }
}
