/* 
 * Square on chessboard
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

type SquarePiece = Piece | null;

export class Square {
    private _piece: SquarePiece;

    constructor(piece : SquarePiece) {
	this._piece = piece;
    }

    setEmpty() : void {
	this.setPiece(null);
    }

    getPiece() : SquarePiece {
	return this._piece;
    }

    setPiece(piece : SquarePiece) : void {
	this._piece = piece;
    }

    hasPiece() : boolean {
	return !!this._piece;
    }
}
