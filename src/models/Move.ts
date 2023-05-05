import { Piece } from '@/models/Piece';
import _ from 'lodash';

export class Move {    
    _start: number;
    _end: number;
    _piece: Piece;
    
    constructor(start : number, end: number, piece : Piece ) {
	this._start = start;
	this._end = end;
	this._piece = piece;
    }
   
    //getters and setters
    
    get piece(): Piece {
	return this._piece;
    }

    set piece(piece: Piece) {
	this._piece = piece;
    }
    
    get start(): number {
	return this._start;
    }

    set start(start: number) {
	this._start = start;
    }
    
    get end(): number {
	return this._end;
    }

    set end(end: number) {
	this._end = end;
    }

    //comparisons

    isEqualTo(move : Move) : boolean {
	return _.isEqual(this, move);
    }
    
}

