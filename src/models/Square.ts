import { Piece } from '@models/Piece';

export class Square {
    private _piece: Piece;

    constructor(piece : Piece | null) {
	this._piece = piece;
    }

    setEmpty() {
	this._piece = null;
    }

    getPiece() {
	return this._piece;
    }
}
