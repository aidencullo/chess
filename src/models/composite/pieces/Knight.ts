/* 
 * Knight chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Knight extends Piece {    
    private _index : number;
    
    constructor(color : string, index : number) {
	super("knight", color);
	if (index < 0 || index > 63) {
	    throw new Error("piece instantiated with invalid index");
	}
	this._index = index;
    }

    getIndex() : number {
	// dummy fn
	return this._index;
    }
}
