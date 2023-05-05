import { Piece } from '@models/Piece';

type SquarePiece = Piece | null;

export class Square {
    private _piece: SquarePiece;

    constructor(piece : SquarePiece) {
	this._piece = piece;
    }

    setEmpty() {
	this._piece = null;
    }

    getPiece() : SquarePiece {
	return this._piece;
    }

    hasPiece() : boolean {
	return !!this._piece ;
    }
}
