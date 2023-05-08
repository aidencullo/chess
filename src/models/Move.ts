/* 
 * Movement of piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@/models/Piece';
import _ from 'lodash';

export class Move {    
    readonly _start: number;
    readonly _end: number;
    readonly _piece: Piece;
    
    constructor(start : number, end: number, piece : Piece | null) {
	if (piece === null) {
	    throw new Error("trying to construct move object with null piece object")
	}

	this._start = start;
	this._end = end;
	this._piece = piece;
    }
}

export function isEqualMove(m1 : Move, m2 : Move) : boolean {
    return _.isEqual(m1, m2);
}
