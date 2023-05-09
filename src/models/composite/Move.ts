/* 
 * Movement of piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';
import _ from 'lodash';

export class Move {    
    readonly _start: number;
    readonly _end: number;
    readonly _piece: Piece;
    
    constructor(start : number, end: number, piece : Piece | null) {
	if (piece === null) {
	    throw new Error("trying to construct move object with null piece object");
	}
	if (start === end) {
	    throw new Error("start square and end square of move equal");
	}	    
	if (start < 0 || start > 63) {
	    throw new Error("start square of move not on board");
	}	    
	if (end < 0 || end > 63) {
	    throw new Error("end square of move not on board");
	}	    

	this._start = start;
	this._end = end;
	this._piece = piece;
    }
}

export function isEqualMove(m1 : Move, m2 : Move) : boolean {
    return _.isEqual(m1, m2);
}
